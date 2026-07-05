import * as React from 'react';
import { Check, Plus } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { KebabMenu } from './kebab-menu';

/**
 * SavedViews — presentational preset/segment tab strip for saved DataTable
 * filter+sort presets ("Unpaid", "Delivering today"). Persistence/state is
 * the app's job; this is pure UI.
 *
 * Flat underline treatment (matches tabs.tsx active style — no shadow): active
 * tab = text-foreground + primary bottom-border; inactive = muted. An
 * always-present pseudo-view ("All") is selected when activeId is
 * undefined/''. Each user view carries a KebabMenu (Rename / Delete) when the
 * matching callback is provided. "+ Save current filter" opens a Popover with an
 * inline Input + Save button. role="tablist" with roving arrow-key navigation.
 */
export interface SavedView {
  id: string;
  name: string;
}

export interface SavedViewsProps {
  views: SavedView[];
  /** id of the active view; undefined/'' selects the "All" pseudo-view. */
  activeId?: string;
  onSelect: (id: string) => void;
  /** Renders the "+ Save" affordance; receives the entered preset name. */
  onSaveNew?: (name: string) => void;
  onRename?: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  /** Label of the always-present "all" pseudo-view. */
  allLabel?: string;
  className?: string;
}

/** Conventional id for the "all" pseudo-view (activeId undefined/'' also matches). */
const ALL_ID = '';

const tabClass = (active: boolean) =>
  cn(
    'inline-flex items-center whitespace-nowrap border-b-2 px-1 pb-2 pt-1 text-sm font-medium transition-colors',
    active
      ? 'border-primary text-foreground'
      : 'border-transparent text-muted-foreground hover:text-foreground',
  );

/** A single user view: tab button + kebab (Rename / Delete). */
const ViewTab = React.forwardRef<
  HTMLButtonElement,
  {
    view: SavedView;
    active: boolean;
    tabIndex: number;
    onSelect: () => void;
    onRename?: (name: string) => void;
    onDelete?: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  }
>(function ViewTab(
  { view, active, tabIndex, onSelect, onRename, onDelete, onKeyDown },
  ref,
) {
  const [renameOpen, setRenameOpen] = React.useState(false);
  const [value, setValue] = React.useState(view.name);

  React.useEffect(() => {
    if (renameOpen) setValue(view.name);
  }, [renameOpen, view.name]);

  const items = [
    onRename && {
      label: 'Rename',
      onSelect: () => setRenameOpen(true),
    },
    onDelete && {
      label: 'Delete',
      destructive: true,
      onSelect: onDelete,
    },
  ].filter(Boolean) as { label: string; onSelect: () => void; destructive?: boolean }[];

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || !onRename) return;
    onRename(trimmed);
    setRenameOpen(false);
  };

  return (
    <div className="flex shrink-0 items-center">
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={active}
        tabIndex={tabIndex}
        onClick={onSelect}
        onKeyDown={onKeyDown}
        className={tabClass(active)}
      >
        {view.name}
      </button>
      {items.length > 0 ? (
        <Popover open={renameOpen} onOpenChange={setRenameOpen}>
          <PopoverTrigger asChild>
            {/* Zero-size anchor so the rename popover positions by the tab. */}
            <span aria-hidden className="block h-0 w-0" />
          </PopoverTrigger>
          <span className="-ml-1">
            <KebabMenu items={items} align="start" />
          </span>
          <PopoverContent align="start" className="w-64">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className="flex flex-col gap-2"
            >
              <label className="text-xs font-medium text-muted-foreground">
                Rename filter
              </label>
              <Input
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-label="Filter name"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setRenameOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={!value.trim()}>
                  Save
                </Button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
});

/** "+ Save current filter" affordance — Popover with Input + Save. */
function SaveNewPopover({ onSaveNew }: { onSaveNew: (name: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if (!open) setValue('');
  }, [open]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSaveNew(trimmed);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex shrink-0 items-center gap-1 whitespace-nowrap border-b-2 border-transparent px-1 pb-2 pt-1 text-sm font-medium text-muted-foreground transition-colors',
            'hover:text-foreground data-[state=open]:text-foreground',
          )}
        >
          <Plus className="size-4" />
          Save current filter
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex flex-col gap-2"
        >
          <label className="text-xs font-medium text-muted-foreground">
            New filter name
          </label>
          <Input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. Unpaid"
            aria-label="New filter name"
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={!value.trim()}>
              <Check className="size-4" />
              Save
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export const SavedViews = React.forwardRef<HTMLDivElement, SavedViewsProps>(
  function SavedViews(
    {
      views,
      activeId,
      onSelect,
      onSaveNew,
      onRename,
      onDelete,
      allLabel = 'All',
      className,
    },
    ref,
  ) {
    const activeAll = !activeId;
    // Roving-tabindex tab list: [all, ...views].
    const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
    const ids = React.useMemo(
      () => [ALL_ID, ...views.map((v) => v.id)],
      [views],
    );
    const activeIndex = activeAll
      ? 0
      : Math.max(0, ids.indexOf(activeId ?? ALL_ID));

    const focusTab = (index: number) => {
      const count = ids.length;
      if (count === 0) return;
      const next = (index + count) % count;
      tabRefs.current[next]?.focus();
      onSelect(ids[next] ?? ALL_ID);
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLButtonElement>,
      index: number,
    ) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          focusTab(index + 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          focusTab(index - 1);
          break;
        case 'Home':
          e.preventDefault();
          focusTab(0);
          break;
        case 'End':
          e.preventDefault();
          focusTab(ids.length - 1);
          break;
        default:
          break;
      }
    };

    return (
      <div
        ref={ref}
        className={cn('border-b border-border', className)}
      >
        <div
          role="tablist"
          aria-label="Saved filters"
          className="flex items-center gap-4 overflow-x-auto"
        >
          <button
            ref={(el) => {
              tabRefs.current[0] = el;
            }}
            type="button"
            role="tab"
            aria-selected={activeAll}
            tabIndex={activeIndex === 0 ? 0 : -1}
            onClick={() => onSelect(ALL_ID)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            className={cn(tabClass(activeAll), 'shrink-0')}
          >
            {allLabel}
          </button>

          {views.map((view, i) => {
            const index = i + 1;
            const active = !activeAll && view.id === activeId;
            return (
              <ViewTab
                key={view.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                view={view}
                active={active}
                tabIndex={activeIndex === index ? 0 : -1}
                onSelect={() => onSelect(view.id)}
                onRename={
                  onRename ? (name) => onRename(view.id, name) : undefined
                }
                onDelete={onDelete ? () => onDelete(view.id) : undefined}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            );
          })}

          {onSaveNew ? (
            <span className="ml-auto shrink-0 pl-2">
              <SaveNewPopover onSaveNew={onSaveNew} />
            </span>
          ) : null}
        </div>
      </div>
    );
  },
);
SavedViews.displayName = 'SavedViews';
