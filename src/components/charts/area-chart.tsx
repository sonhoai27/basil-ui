import * as React from 'react';
import {
  ResponsiveContainer,
  AreaChart as RAreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { cn } from '../../lib/utils';
import {
  AXIS_PROPS,
  ChartGrid,
  ChartTooltip,
  LEGEND_PROPS,
  chartColor,
  defaultValueFormatter,
  type CartesianChartProps,
} from './chart-primitives';

export interface AreaChartProps extends CartesianChartProps {
  /** Stack the series areas instead of overlaying them. */
  stacked?: boolean;
}

/** Stable id so multiple AreaCharts on a page don't share gradient defs. */
let AREA_GRADIENT_SEQ = 0;

/**
 * Flat, token-driven area chart on Recharts. Full-strength stroke over a
 * subtle (~0.15) gradient fill, shared hairline grid and popover tooltip.
 */
export const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  (
    {
      data,
      index,
      categories,
      colors,
      height = 260,
      stacked = false,
      valueFormatter = defaultValueFormatter,
      className,
      showLegend = false,
      showGrid = true,
      ariaLabel,
    },
    ref,
  ) => {
    const gradientBase = React.useMemo(() => `basil-area-${AREA_GRADIENT_SEQ++}`, []);
    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        style={{ height }}
        role="img"
        aria-label={ariaLabel}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RAreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              {categories.map((category, i) => {
                const color = chartColor(i, colors);
                return (
                  <linearGradient
                    key={category}
                    id={`${gradientBase}-${i}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={color} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                );
              })}
            </defs>
            {showGrid ? <ChartGrid /> : null}
            <XAxis dataKey={index} {...AXIS_PROPS} />
            <YAxis {...AXIS_PROPS} tickFormatter={valueFormatter} width={44} />
            <Tooltip
              cursor={{ stroke: 'var(--color-border-strong)', strokeWidth: 1 }}
              content={<ChartTooltip valueFormatter={valueFormatter} />}
            />
            {showLegend ? <Legend {...LEGEND_PROPS} /> : null}
            {categories.map((category, i) => {
              const color = chartColor(i, colors);
              return (
                <Area
                  key={category}
                  type="monotone"
                  dataKey={category}
                  name={category}
                  stackId={stacked ? 'stack' : undefined}
                  stroke={color}
                  strokeWidth={2}
                  fill={`url(#${gradientBase}-${i})`}
                  activeDot={{
                    r: 4,
                    fill: color,
                    stroke: 'var(--color-card)',
                    strokeWidth: 2,
                  }}
                  isAnimationActive={false}
                />
              );
            })}
          </RAreaChart>
        </ResponsiveContainer>
      </div>
    );
  },
);
AreaChart.displayName = 'AreaChart';
