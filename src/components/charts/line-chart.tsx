import * as React from 'react';
import {
  ResponsiveContainer,
  LineChart as RLineChart,
  Line,
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

export type LineChartProps = CartesianChartProps;

/**
 * Flat, token-driven line chart on Recharts. Minimal dots (hidden at rest),
 * emphasized active dot, shared hairline grid and popover tooltip.
 */
export const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      data,
      index,
      categories,
      colors,
      height = 260,
      valueFormatter = defaultValueFormatter,
      className,
      showLegend = false,
      showGrid = true,
      ariaLabel,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        style={{ height }}
        role="img"
        aria-label={ariaLabel}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RLineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
                <Line
                  key={category}
                  type="monotone"
                  dataKey={category}
                  name={category}
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
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
          </RLineChart>
        </ResponsiveContainer>
      </div>
    );
  },
);
LineChart.displayName = 'LineChart';
