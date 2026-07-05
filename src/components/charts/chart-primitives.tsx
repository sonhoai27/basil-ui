import * as React from 'react';
import { CartesianGrid } from 'recharts';

/* ============================================================================
   Basil charts — shared primitives
   Flat, hairline, token-driven. Every colour resolves to a CSS variable from
   Basil's @theme (styles.css). Never hardcode hex here — keep the chart set on
   the same palette as the rest of the kit so it drifts with the theme.
   ============================================================================ */

/**
 * Ordered categorical palette for series/slices. Primary (leaf green) leads,
 * then the semantic hues, then a couple of neutral tints so a 6th/7th series
 * still reads. Consumers can override per-chart via the `colors` prop.
 */
export const CHART_COLORS: string[] = [
  'var(--color-primary)',
  'var(--color-info)',
  'var(--color-warning)',
  'var(--color-success)',
  'var(--color-destructive)',
  'var(--color-primary-hover)',
  'var(--color-muted-foreground)',
  'var(--color-border-strong)',
];

/** Resolve the colour for series index `i`, honouring a caller override list. */
export function chartColor(i: number, colors?: string[]): string {
  const palette = colors && colors.length > 0 ? colors : CHART_COLORS;
  return palette[i % palette.length] ?? 'var(--color-primary)';
}

/** Shared axis styling — muted label, 12px, no heavy axis/tick lines. */
export const AXIS_PROPS = {
  stroke: 'var(--color-border)',
  tick: {
    fill: 'var(--color-muted-foreground)',
    fontSize: 12,
  },
  tickLine: false,
  axisLine: false,
} as const;

/** Subtle dashed grid on the border hairline. Horizontal-only by default. */
export function ChartGrid({
  vertical = false,
  horizontal = true,
}: {
  vertical?: boolean;
  horizontal?: boolean;
}) {
  return (
    <CartesianGrid
      strokeDasharray="3 3"
      stroke="var(--color-border)"
      vertical={vertical}
      horizontal={horizontal}
    />
  );
}

export interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string | number;
    value?: number | string;
    color?: string;
    dataKey?: string | number;
    payload?: Record<string, unknown>;
  }>;
  label?: string | number;
  /** Format the numeric value shown per row. */
  valueFormatter?: (value: number) => string;
  /** Hide the header label row (e.g. for donut/pie single-slice tooltips). */
  hideLabel?: boolean;
}

/**
 * Flat popover-style tooltip matching Basil overlays: rounded-lg, hairline
 * border, popover surface + shadow, tabular values. Pass as Recharts'
 * `content`, e.g. `<Tooltip content={<ChartTooltip valueFormatter={fmt} />} />`.
 */
export const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  ({ active, payload, label, valueFormatter, hideLabel }, ref) => {
    if (!active || !payload || payload.length === 0) return null;

    const fmt = (v: number | string | undefined) => {
      if (v == null) return '';
      if (typeof v === 'number' && valueFormatter) return valueFormatter(v);
      return String(v);
    };

    return (
      <div
        ref={ref}
        className="rounded-lg border border-border bg-popover px-3 py-2 text-popover-foreground shadow-popover"
      >
        {!hideLabel && label != null ? (
          <div className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</div>
        ) : null}
        <div className="flex flex-col gap-1">
          {payload.map((entry, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: entry.color }}
                aria-hidden
              />
              <span className="text-muted-foreground">{entry.name}</span>
              <span className="ml-auto pl-4 font-tabular font-semibold text-foreground">
                {fmt(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
ChartTooltip.displayName = 'ChartTooltip';

/** Shared legend styling helpers — small, muted, tabular-friendly. */
export const LEGEND_PROPS = {
  wrapperStyle: {
    fontSize: 12,
    color: 'var(--color-muted-foreground)',
    paddingTop: 8,
  },
  iconType: 'circle' as const,
  iconSize: 8,
};

/** Base props shared by the cartesian charts (bar / line / area). */
export interface CartesianChartProps {
  /** Row records. Each row has the `index` key plus a value per category. */
  data: Record<string, unknown>[];
  /** Key on each row used for the x-axis (categorical). */
  index: string;
  /** Keys plotted as series. */
  categories: string[];
  /** Per-series colour override; falls back to `CHART_COLORS`. */
  colors?: string[];
  /** Container height in px. */
  height?: number;
  /** Format y-axis ticks and tooltip values. */
  valueFormatter?: (value: number) => string;
  className?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  /** Accessible label for the chart container (role="img"). */
  ariaLabel?: string;
}

/** Sensible default value formatter — compact tabular numbers. */
export const defaultValueFormatter = (value: number): string =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
