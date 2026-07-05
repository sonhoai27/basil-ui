import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export type TimelineVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info'
  | 'muted';

/** Solid dot color per variant (sits on the connector line). */
const DOT_COLOR: Record<TimelineVariant, string> = {
  default:     'bg-border-strong',
  primary:     'bg-primary',
  success:     'bg-success',
  warning:     'bg-warning',
  destructive: 'bg-destructive',
  info:        'bg-info',
  muted:       'bg-muted-foreground',
};

/** Tinted circle for the icon override, borderless status tint. */
const ICON_CHIP: Record<TimelineVariant, string> = {
  default:     'bg-muted text-muted-foreground',
  primary:     'bg-primary-subtle text-primary',
  success:     'bg-success-bg text-success-text',
  warning:     'bg-warning-bg text-warning-text',
  destructive: 'bg-destructive-bg text-destructive-text',
  info:        'bg-info-bg text-info-text',
  muted:       'bg-muted text-muted-foreground',
};

export interface TimelineItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'> {
  /** Primary label of the entry, e.g. "Đã duyệt". */
  title: React.ReactNode;
  /** Muted, tabular timestamp rendered in a <time> element. */
  timestamp?: string;
  /** Optional secondary detail below the title. */
  description?: React.ReactNode;
  /** Rendered as "bởi {actor}". */
  actor?: string;
  /** Dot / icon-chip color. */
  variant?: TimelineVariant;
  /** Override the dot with a lucide icon inside a tinted circle. */
  icon?: LucideIcon;
  /** Last item — hides the connector line below its dot. Also derived via CSS. */
  isLast?: boolean;
}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  (
    {
      title,
      timestamp,
      description,
      actor,
      variant = 'default',
      icon: Icon,
      isLast = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <li
        ref={ref}
        className={cn(
          'group relative flex gap-3 pb-5 last:pb-0',
          isLast && 'is-last',
          className,
        )}
        {...props}
      >
        {/* Left column: connector line + dot/icon marker */}
        <div className="relative flex w-6 shrink-0 flex-col items-center">
          {/* Continuous vertical connector running through the dot column.
              Hidden on the last item (via the `isLast` prop or the CSS
              :last-child of the <ol>) so no line dangles below the final dot. */}
          <span
            aria-hidden
            className="absolute top-0 h-full w-px bg-border group-last:hidden group-[.is-last]:hidden"
          />
          {Icon ? (
            <span
              aria-hidden
              className={cn(
                'relative z-10 flex h-6 w-6 items-center justify-center rounded-full',
                ICON_CHIP[variant],
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
          ) : (
            <span
              aria-hidden
              className={cn(
                'relative z-10 mt-1 h-2.5 w-2.5 rounded-full ring-4 ring-card',
                DOT_COLOR[variant],
              )}
            />
          )}
        </div>

        {/* Right column: title, timestamp, description, actor */}
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm font-semibold text-foreground">{title}</span>
            {timestamp ? (
              <time className="font-tabular text-xs text-muted-foreground tabular-nums">
                {timestamp}
              </time>
            ) : null}
          </div>
          {description ? (
            <div className="mt-1 text-sm text-muted-foreground">{description}</div>
          ) : null}
          {actor ? (
            <div className="mt-1 text-xs text-muted-foreground">
              bởi {actor}
            </div>
          ) : null}
        </div>
      </li>
    );
  },
);
TimelineItem.displayName = 'TimelineItem';

export interface TimelineProps extends React.OlHTMLAttributes<HTMLOListElement> {}

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ol ref={ref} className={cn('flex flex-col', className)} {...props}>
        {children}
      </ol>
    );
  },
);
Timeline.displayName = 'Timeline';
