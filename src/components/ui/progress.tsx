import * as React from 'react';
import { cn } from '../../lib/utils';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'destructive';
export type ProgressSize = 'sm' | 'md';

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Current value, clamped to 0..max. Ignored when `indeterminate`. */
  value?: number;
  /** Upper bound of the scale (default 100). */
  max?: number;
  /** Fill color. `default` = primary green. */
  variant?: ProgressVariant;
  /** Track height. */
  size?: ProgressSize;
  /** Render an animated bar with no known value. */
  indeterminate?: boolean;
  /** Show a "{pct}%" label inline at the end of the row. */
  showValue?: boolean;
  /** Optional label rendered above the bar. */
  label?: React.ReactNode;
  className?: string;
}

const FILL: Record<ProgressVariant, string> = {
  default: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
};

const TRACK_SIZE: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
};

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      variant = 'default',
      size = 'md',
      indeterminate = false,
      showValue = false,
      label,
      className,
      ...props
    },
    ref,
  ) => {
    const safeMax = max > 0 ? max : 100;
    const clamped = Math.min(Math.max(value ?? 0, 0), safeMax);
    const pct = Math.round((clamped / safeMax) * 100);

    const valueText = indeterminate ? 'Processing' : `${pct}%`;

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {label != null || showValue ? (
          <div className="mb-1.5 flex items-center justify-between gap-2">
            {label != null ? (
              <span className="text-sm font-medium text-foreground">{label}</span>
            ) : (
              <span />
            )}
            {showValue ? (
              <span className="font-tabular text-xs font-semibold tabular-nums text-muted-foreground">
                {indeterminate ? '…' : `${pct}%`}
              </span>
            ) : null}
          </div>
        ) : null}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={indeterminate ? undefined : safeMax}
          aria-valuenow={indeterminate ? undefined : clamped}
          aria-valuetext={valueText}
          className={cn(
            'relative w-full overflow-hidden rounded-full bg-muted',
            TRACK_SIZE[size],
          )}
        >
          {indeterminate ? (
            <div
              className={cn(
                'absolute inset-y-0 left-0 w-2/5 animate-pulse rounded-full',
                FILL[variant],
              )}
            />
          ) : (
            <div
              className={cn(
                'h-full rounded-full transition-[width] duration-300 ease-out',
                FILL[variant],
              )}
              style={{ width: `${pct}%` }}
            />
          )}
        </div>
      </div>
    );
  },
);
Progress.displayName = 'Progress';
