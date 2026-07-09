import * as React from 'react';
import { cn } from '../../lib/utils';

export interface DataCardProps {
  /** Leading media — thumbnail, avatar, or icon. */
  leading?: React.ReactNode;
  /** Primary line (grows, truncates). */
  title: React.ReactNode;
  /** Secondary line under the title. */
  subtitle?: React.ReactNode;
  /** Right-aligned block — amount, status pill. */
  trailing?: React.ReactNode;
  /** Full-width secondary row(s) under the header. */
  meta?: React.ReactNode;
  /** Actions row at the bottom. */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Mobile row card used with `DataTable`'s `renderMobileCard`. Intentionally
 * border-less and padding-less — the DataTable `<li>` wrapper supplies padding,
 * hover, divider, and selected state (mirrors the dashboard "recent orders" list).
 */
export function DataCard({ leading, title, subtitle, trailing, meta, footer, className }: DataCardProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-start gap-3">
        {leading ? <div className="shrink-0">{leading}</div> : null}
        <div className="min-w-0 flex-1">
          <div className="text-foreground truncate text-sm font-medium">{title}</div>
          {subtitle ? (
            <div className="text-muted-foreground mt-0.5 truncate text-xs">{subtitle}</div>
          ) : null}
        </div>
        {trailing ? <div className="shrink-0 text-right">{trailing}</div> : null}
      </div>
      {meta ? <div className="text-muted-foreground text-xs">{meta}</div> : null}
      {footer ? <div className="flex items-center gap-2 pt-1">{footer}</div> : null}
    </div>
  );
}
