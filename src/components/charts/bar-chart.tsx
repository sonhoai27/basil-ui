import * as React from 'react';
import {
  ResponsiveContainer,
  BarChart as RBarChart,
  Bar,
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

export interface BarChartProps extends CartesianChartProps {
  /** Stack the series instead of grouping them side-by-side. */
  stacked?: boolean;
}

/**
 * Flat, token-driven bar chart on Recharts. Bars carry a small top radius and
 * the shared hairline grid, muted axes, and popover tooltip.
 */
export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
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
    const single = categories.length <= 1;
    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        style={{ height }}
        role="img"
        aria-label={ariaLabel}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RBarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            {showGrid ? <ChartGrid /> : null}
            <XAxis dataKey={index} {...AXIS_PROPS} />
            <YAxis {...AXIS_PROPS} tickFormatter={valueFormatter} width={44} />
            <Tooltip
              cursor={{ fill: 'var(--color-muted)', opacity: 0.5 }}
              content={<ChartTooltip valueFormatter={valueFormatter} />}
            />
            {showLegend ? <Legend {...LEGEND_PROPS} /> : null}
            {categories.map((category, i) => {
              const isTop = stacked ? i === categories.length - 1 : true;
              const radius: [number, number, number, number] = isTop
                ? [4, 4, 0, 0]
                : [0, 0, 0, 0];
              return (
                <Bar
                  key={category}
                  dataKey={category}
                  name={category}
                  fill={chartColor(i, colors)}
                  stackId={stacked ? 'stack' : undefined}
                  radius={radius}
                  maxBarSize={single ? 48 : 32}
                  isAnimationActive={false}
                />
              );
            })}
          </RBarChart>
        </ResponsiveContainer>
      </div>
    );
  },
);
BarChart.displayName = 'BarChart';
