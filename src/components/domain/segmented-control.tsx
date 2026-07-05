import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * SegmentedControl — single-select toggle (e.g. an order-queue view: All / Pending / Delivered).
 * Track is bg-muted p-1 rounded-lg; the active option gets a flat bg-card + border-border (no shadow).
 * role="radiogroup" + role="radio"; arrow keys move the selection. Relies on the global focus outline.
 */
export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const SIZE: Record<
  NonNullable<SegmentedControlProps['size']>,
  { item: string; icon: string }
> = {
  sm: { item: 'h-8 px-3 text-xs gap-1.5', icon: '[&_svg]:size-3.5' },
  md: { item: 'h-10 px-3.5 text-sm gap-2', icon: '[&_svg]:size-4' },
};

export const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(
  (
    {
      options,
      value,
      onChange,
      size = 'md',
      disabled = false,
      className,
      ariaLabel,
    },
    ref,
  ) => {
    const sz = SIZE[size];
    const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const move = (from: number, dir: 1 | -1) => {
      const count = options.length;
      if (count === 0) return;
      const next = (from + dir + count) % count;
      const opt = options[next];
      if (!opt) return;
      refs.current[next]?.focus();
      onChange(opt.value);
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLButtonElement>,
      index: number,
    ) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          move(index, 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          move(index, -1);
          break;
        case 'Home': {
          e.preventDefault();
          const first = options[0];
          if (first) {
            refs.current[0]?.focus();
            onChange(first.value);
          }
          break;
        }
        case 'End': {
          e.preventDefault();
          const lastIndex = options.length - 1;
          const last = options[lastIndex];
          if (last) {
            refs.current[lastIndex]?.focus();
            onChange(last.value);
          }
          break;
        }
        default:
          break;
      }
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        className={cn(
          'inline-flex items-center gap-1 rounded-lg bg-muted p-1',
          disabled && 'pointer-events-none opacity-50',
          className,
        )}
      >
        {options.map((opt, index) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              disabled={disabled}
              onClick={() => onChange(opt.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent font-medium transition-colors',
                'disabled:pointer-events-none',
                sz.item,
                sz.icon,
                active
                  ? 'border-border bg-card text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {opt.icon ? (
                <span className="shrink-0" aria-hidden>
                  {opt.icon}
                </span>
              ) : null}
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  },
);
SegmentedControl.displayName = 'SegmentedControl';
