import * as React from 'react';
import { cn } from '../../lib/utils';

export type SparklineVariant = 'primary' | 'success' | 'destructive' | 'muted';

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  variant?: SparklineVariant;
  showArea?: boolean;
  showEndpoint?: boolean;
  strokeWidth?: number;
  className?: string;
  ariaLabel?: string;
}

const VARIANT_COLOR: Record<SparklineVariant, string> = {
  primary:     'text-primary',
  success:     'text-success',
  destructive: 'text-destructive',
  muted:       'text-muted-foreground',
};

export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  (
    {
      data,
      width = 100,
      height = 28,
      variant = 'primary',
      showArea = true,
      showEndpoint = true,
      strokeWidth = 1.5,
      className,
      ariaLabel = 'Biểu đồ xu hướng',
    },
    ref,
  ) => {
    // Pad the geometry so the stroke + endpoint dot never clip at the edges.
    const pad = Math.max(strokeWidth, 2);
    const innerW = Math.max(width - pad * 2, 0);
    const innerH = Math.max(height - pad * 2, 0);
    const baseline = height - pad;

    const points = React.useMemo(() => {
      const n = data?.length ?? 0;

      // Guard: 0 or 1 points, or a flat series → draw a flat mid-line.
      if (n < 2) {
        const y = pad + innerH / 2;
        return [
          { x: pad, y },
          { x: pad + innerW, y },
        ];
      }

      const min = Math.min(...data);
      const max = Math.max(...data);
      const span = max - min;
      const stepX = innerW / (n - 1);

      return data.map((v, i) => {
        const x = pad + stepX * i;
        // Flat series (min === max): centre the line vertically.
        const t = span === 0 ? 0.5 : (v - min) / span;
        const y = pad + innerH * (1 - t);
        return { x, y };
      });
    }, [data, innerW, innerH, pad]);

    const linePath = React.useMemo(
      () =>
        points
          .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
          .join(' '),
      [points],
    );

    const areaPath = React.useMemo(() => {
      const first = points[0];
      const last = points[points.length - 1];
      if (!showArea || !first || !last) return null;
      return (
        `M ${first.x.toFixed(2)} ${baseline.toFixed(2)} ` +
        points.map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ') +
        ` L ${last.x.toFixed(2)} ${baseline.toFixed(2)} Z`
      );
    }, [showArea, points, baseline]);

    const end = points[points.length - 1];

    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="none"
        className={cn('overflow-visible', VARIANT_COLOR[variant], className)}
      >
        {areaPath ? (
          <path d={areaPath} fill="currentColor" fillOpacity={0.12} stroke="none" />
        ) : null}
        <path
          d={linePath}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {showEndpoint && end ? (
          <circle cx={end.x} cy={end.y} r={strokeWidth + 1} fill="currentColor" />
        ) : null}
      </svg>
    );
  },
);
Sparkline.displayName = 'Sparkline';
