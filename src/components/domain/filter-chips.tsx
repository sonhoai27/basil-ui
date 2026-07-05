import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface FilterChip {
  /** Unique key used for removal. */
  id: string;
  /** Criterion label, e.g. "Status". */
  label: string;
  /** The active filter value, e.g. "Pending payment". */
  value?: string;
}

export interface FilterChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: FilterChip[];
  onRemove: (id: string) => void;
  /** Shows "Clear all" when there are ≥ 2 chips (default). */
  onClearAll?: () => void;
  /** Total number of results after filtering (renders "· N results"). */
  resultCount?: number;
}

/**
 * A row of applied filter chips — each chip is removable, with a "Clear all".
 * Place it just below the toolbar/search so filters stay visible (no hidden filtering).
 */
export const FilterChips = React.forwardRef<HTMLDivElement, FilterChipsProps>(
  ({ filters, onRemove, onClearAll, resultCount, className, ...props }, ref) => {
    if (filters.length === 0) return null;
    return (
      <div
        ref={ref}
        className={cn('flex flex-wrap items-center gap-2', className)}
        {...props}
      >
        <span className="text-xs font-medium text-muted-foreground">Filtering:</span>
        {filters.map((f) => (
          <span
            key={f.id}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card py-1 pl-2.5 pr-1 text-xs"
          >
            <span className="text-muted-foreground">{f.label}:</span>
            <span className="font-medium text-foreground">{f.value}</span>
            <button
              type="button"
              onClick={() => onRemove(f.id)}
              aria-label={`Remove ${f.label} filter`}
              className="inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X size={12} aria-hidden />
            </button>
          </span>
        ))}
        {onClearAll && filters.length >= 2 ? (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Clear all
          </button>
        ) : null}
        {resultCount !== undefined ? (
          <span className="font-tabular text-xs text-muted-foreground">· {resultCount} results</span>
        ) : null}
      </div>
    );
  },
);
FilterChips.displayName = 'FilterChips';
