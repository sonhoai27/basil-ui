import * as React from 'react';
import { Pencil } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

/** Format an integer with vi-VN thousands grouping (dot separator): 1250000 → "1.250.000". */
function formatGrouped(n: number): string {
  return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(n);
}

/** Keep only ASCII digits from a string. */
function digitsOnly(s: string): string {
  return s.replace(/\D+/g, '');
}

export interface EditableCellProps {
  /** Current value shown in read mode and seeded into the editor. */
  value: string | number;
  /** Commit handler — receives the raw value (integer for number/currency, string otherwise). */
  onSave: (value: string | number) => void;
  /** Editor flavour. Defaults to plain text. */
  type?: 'text' | 'number' | 'currency' | 'select';
  /** Options for the 'select' editor. */
  options?: { label: string; value: string }[];
  /** Read-mode alignment. Numbers/currency default to right. */
  align?: 'left' | 'right';
  placeholder?: string;
  disabled?: boolean;
  /** Custom read-mode formatter. Default: currency → grouped + ₫; others → raw value. */
  display?: (v: string | number) => React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Inline-editable table cell (edit quantity/price/notes right in the table). Lives inside a
 * clickable DataTable row, so every interaction stops propagation to keep the
 * row-click from firing.
 *
 * Read mode is a keyboard-operable affordance (role="button", Enter/Space);
 * hovering reveals a faint pencil. Enter/click swaps to an editor that commits
 * on Enter or blur and reverts on Escape. Disabled renders plain read-only text.
 */
const EditableCell = React.forwardRef<HTMLDivElement, EditableCellProps>(
  (
    {
      value,
      onSave,
      type = 'text',
      options,
      align,
      placeholder,
      disabled,
      display,
      className,
      ariaLabel,
    },
    ref
  ) => {
    const isNumeric = type === 'number' || type === 'currency';
    const resolvedAlign = align ?? (isNumeric ? 'right' : 'left');

    const [editing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Seed the draft from `value` whenever we enter edit mode.
    const startEdit = React.useCallback(() => {
      if (disabled) return;
      setDraft(value === '' || value === undefined ? '' : String(value));
      setEditing(true);
    }, [disabled, value]);

    // Focus + select the input once it mounts.
    React.useEffect(() => {
      if (editing && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [editing]);

    const stop = (e: React.SyntheticEvent) => {
      e.stopPropagation();
    };

    const cancel = () => {
      setEditing(false);
    };

    const commit = () => {
      setEditing(false);
      if (isNumeric) {
        const raw = digitsOnly(draft);
        onSave(raw === '' ? 0 : Number(raw));
      } else {
        onSave(draft);
      }
    };

    const commitSelect = (next: string) => {
      setEditing(false);
      onSave(next);
    };

    // Read-mode content.
    const readContent = display
      ? display(value)
      : type === 'currency'
        ? value === '' || value === undefined
          ? ''
          : `${formatGrouped(Number(value))} ₫`
        : type === 'select'
          ? (options?.find((o) => o.value === String(value))?.label ?? value)
          : value;

    // ---- Disabled: plain read-only text ----
    if (disabled) {
      return (
        <div
          ref={ref}
          className={cn(
            'px-1 py-0.5 text-sm text-muted-foreground',
            resolvedAlign === 'right' && 'text-right tabular-nums',
            className
          )}
        >
          {readContent === '' || readContent === undefined ? (
            <span className="text-muted-foreground">{placeholder ?? '—'}</span>
          ) : (
            readContent
          )}
        </div>
      );
    }

    // ---- Edit mode: select ----
    if (editing && type === 'select') {
      return (
        <div ref={ref} className={cn('w-full', className)} onClick={stop}>
          <Select
            defaultValue={String(value)}
            open
            onValueChange={commitSelect}
            onOpenChange={(o) => {
              if (!o) cancel();
            }}
          >
            <SelectTrigger
              className="h-8"
              aria-label={ariaLabel}
              onClick={stop}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent onClick={stop}>
              {options?.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    // ---- Edit mode: text / number / currency ----
    if (editing) {
      return (
        <div ref={ref} className={cn('w-full', className)} onClick={stop}>
          <Input
            ref={inputRef}
            value={draft}
            aria-label={ariaLabel}
            placeholder={placeholder}
            inputMode={isNumeric ? 'numeric' : undefined}
            onClick={stop}
            onKeyDown={(e) => {
              stop(e);
              if (e.key === 'Enter') {
                e.preventDefault();
                commit();
              } else if (e.key === 'Escape') {
                e.preventDefault();
                cancel();
              }
            }}
            onChange={(e) => {
              setDraft(isNumeric ? digitsOnly(e.target.value) : e.target.value);
            }}
            onBlur={commit}
            className={cn(
              'h-8',
              resolvedAlign === 'right' && 'text-right tabular-nums'
            )}
          />
        </div>
      );
    }

    // ---- Read mode: keyboard-operable affordance ----
    const isEmpty = readContent === '' || readContent === undefined;
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        onClick={(e) => {
          stop(e);
          startEdit();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            stop(e);
            startEdit();
          }
        }}
        className={cn(
          'group inline-flex w-full min-w-0 cursor-text items-center gap-1 rounded-md px-1 py-0.5 text-sm',
          'transition-colors hover:bg-muted/60',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          resolvedAlign === 'right' && 'justify-end text-right tabular-nums',
          className
        )}
      >
        <span className={cn('min-w-0 truncate', isEmpty && 'text-muted-foreground')}>
          {isEmpty ? (placeholder ?? '—') : readContent}
        </span>
        <Pencil
          aria-hidden="true"
          className="size-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>
    );
  }
);
EditableCell.displayName = 'EditableCell';

export { EditableCell };
