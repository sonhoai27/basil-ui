import * as React from 'react';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Sparkline, type SparklineVariant } from './sparkline';
import { cn } from '../../lib/utils';

export type KpiTone = 'warning' | 'success' | 'primary' | 'muted';

export interface KpiCardProps {
  label: string;
  value: string | number;
  hint?: string;
  trend?: { value: number; positive?: boolean };
  icon?: React.ReactNode;
  tone?: KpiTone;
  featured?: boolean;
  loading?: boolean;
  sparkline?: number[];
  sparklineVariant?: SparklineVariant;
  className?: string;
}

const ICON_CHIP: Record<KpiTone, string> = {
  warning: 'bg-warning-bg text-warning-text',
  success: 'bg-success-bg text-success-text',
  primary: 'bg-primary text-primary-foreground',
  muted:   'bg-muted text-muted-foreground',
};

export const KpiCard = React.forwardRef<HTMLDivElement, KpiCardProps>(
  (
    {
      label,
      value,
      hint,
      trend,
      icon,
      tone,
      featured,
      loading,
      sparkline,
      sparklineVariant,
      className,
    },
    ref,
  ) => {
    const chip = tone ? ICON_CHIP[tone] : ICON_CHIP.muted;

    // Derive the trend direction from the sign of `value` unless `positive`
    // is explicitly passed (avoids a green up-arrow on a negative delta).
    const isPositive = trend
      ? trend.positive ?? trend.value >= 0
      : false;

    // Default the sparkline colour from the trend direction when the caller
    // doesn't pin a variant: positive → success, negative → destructive.
    const sparkColor: SparklineVariant =
      sparklineVariant ?? (trend ? (isPositive ? 'success' : 'destructive') : 'primary');

    if (loading) {
      return (
        <Card
          ref={ref}
          className={cn('rounded-lg p-5', featured ? 'bg-primary-subtle' : 'bg-card', className)}
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="mt-5 h-9 w-32" />
          <Skeleton className="mt-3 h-3 w-20" />
        </Card>
      );
    }

    return (
      <Card
        ref={ref}
        className={cn(
          'rounded-lg p-5 transition-colors',
          featured ? 'border-primary bg-primary-subtle' : 'bg-card',
          className,
        )}
      >
        <div className="flex items-center gap-3">
          {icon ? (
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                chip,
              )}
              aria-hidden
            >
              {icon}
            </span>
          ) : null}
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </div>
        <div className="mt-5 flex items-baseline gap-2">
          <div
            className={cn(
              'font-tabular text-[34px] font-bold leading-none tracking-tight',
              featured ? 'text-primary' : 'text-foreground',
            )}
          >
            {value}
          </div>
          {trend ? (
            <span
              className={cn(
                'inline-flex items-center rounded-full px-1.5 py-0.5 font-tabular text-[11px] font-semibold',
                isPositive
                  ? 'bg-success-bg text-success-text'
                  : 'bg-destructive-bg text-destructive-text',
              )}
            >
              {isPositive ? '↑' : '↓'}
              {Math.abs(trend.value)}%
            </span>
          ) : null}
        </div>
        {hint ? <div className="mt-2 text-xs text-muted-foreground">{hint}</div> : null}
        {sparkline && sparkline.length > 0 ? (
          <Sparkline
            data={sparkline}
            variant={sparkColor}
            width={220}
            height={32}
            className="mt-3 w-full"
          />
        ) : null}
      </Card>
    );
  },
);
KpiCard.displayName = 'KpiCard';
