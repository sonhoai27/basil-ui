import * as React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { cn } from '../../lib/utils';
import {
  ChartTooltip,
  LEGEND_PROPS,
  chartColor,
  defaultValueFormatter,
} from './chart-primitives';

export interface DonutChartDatum {
  name: string;
  value: number;
}

export interface DonutChartProps {
  data: DonutChartDatum[];
  /** Per-slice colour override; falls back to `CHART_COLORS`. */
  colors?: string[];
  /** Container height in px. */
  height?: number;
  /** Format tooltip / legend values. */
  valueFormatter?: (value: number) => string;
  /** Inner radius (donut hole). Number = px, string = percent (e.g. '60%'). */
  innerRadius?: number | string;
  /** Outer radius. Number = px, string = percent (e.g. '80%'). */
  outerRadius?: number | string;
  showLegend?: boolean;
  className?: string;
  /** Accessible label for the chart container (role="img"). */
  ariaLabel?: string;
}

/**
 * Flat, token-driven donut chart on Recharts. Slices pull from `CHART_COLORS`,
 * thin card-coloured seams between slices, shared popover tooltip.
 */
export const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      data,
      colors,
      height = 260,
      valueFormatter = defaultValueFormatter,
      innerRadius = '60%',
      outerRadius = '80%',
      showLegend = false,
      className,
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
          <PieChart>
            <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} hideLabel />} />
            {showLegend ? <Legend {...LEGEND_PROPS} /> : null}
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={1}
              stroke="var(--color-card)"
              strokeWidth={2}
              isAnimationActive={false}
            >
              {data.map((entry, i) => (
                <Cell key={entry.name ?? i} fill={chartColor(i, colors)} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  },
);
DonutChart.displayName = 'DonutChart';
