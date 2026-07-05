import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Stepper — progress indicator cho luồng nhiều bước (order-create:
 * "Chọn khách → Thêm sản phẩm → Giao hàng → Xác nhận").
 * completed = bg-primary + Check; current = viền primary + số; upcoming = viền border + số.
 * Connector giữa các node: primary nếu ranh giới đã hoàn tất, else border-border.
 * Không nhầm với QuantityStepper (number input).
 */
export interface StepperStep {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepperStep[];
  /** Index bước đang active (0-based). */
  current: number;
  orientation?: 'horizontal' | 'vertical';
  /** Khi truyền, các bước ĐÃ HOÀN TẤT trở thành <button> để điều hướng ngược. */
  onStepClick?: (index: number) => void;
  className?: string;
}

type StepState = 'completed' | 'current' | 'upcoming';

const CIRCLE_BASE =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-tabular text-sm font-semibold transition-colors';

const CIRCLE_STATE: Record<StepState, string> = {
  completed: 'bg-primary text-primary-foreground',
  current: 'border-2 border-primary bg-card text-primary',
  upcoming: 'border border-border bg-card text-muted-foreground',
};

export const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  ({ steps, current, orientation = 'horizontal', onStepClick, className }, ref) => {
    const isVertical = orientation === 'vertical';

    const stateOf = (index: number): StepState =>
      index < current ? 'completed' : index === current ? 'current' : 'upcoming';

    return (
      <ol
        ref={ref}
        className={cn(
          isVertical ? 'flex flex-col' : 'flex items-start',
          className,
        )}
      >
        {steps.map((step, index) => {
          const state = stateOf(index);
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;
          // Ranh giới trước node đã hoàn tất khi node trước đó đã xong (index <= current).
          const beforeDone = index <= current;
          // Ranh giới sau node đã hoàn tất khi chính node này đã xong.
          const afterDone = index < current;
          const clickable = !!onStepClick && state === 'completed';

          const circle = (
            <span className={cn(CIRCLE_BASE, CIRCLE_STATE[state])} aria-hidden>
              {state === 'completed' ? <Check className="size-4" /> : index + 1}
            </span>
          );

          const labels = (
            <span
              className={cn(
                'flex flex-col',
                isVertical ? 'gap-0.5 pt-1' : 'mt-2 gap-0.5 text-center',
              )}
            >
              <span
                className={cn(
                  'text-sm leading-tight',
                  state === 'current'
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {step.label}
              </span>
              {step.description ? (
                <span className="text-xs leading-tight text-muted-foreground">
                  {step.description}
                </span>
              ) : null}
            </span>
          );

          if (isVertical) {
            return (
              <li
                key={index}
                aria-current={state === 'current' ? 'step' : undefined}
                className="flex gap-3"
              >
                {/* Rail: circle + vertical connector segment below it */}
                <div className="flex flex-col items-center self-stretch">
                  {clickable ? (
                    <button
                      type="button"
                      onClick={() => onStepClick?.(index)}
                      className="rounded-full transition-opacity hover:opacity-80"
                    >
                      {circle}
                    </button>
                  ) : (
                    circle
                  )}
                  {!isLast ? (
                    <span
                      className={cn(
                        'w-0.5 flex-1 rounded-full',
                        afterDone ? 'bg-primary' : 'bg-border',
                      )}
                      aria-hidden
                    />
                  ) : null}
                </div>
                <div className={cn(!isLast && 'pb-6')}>
                  {clickable ? (
                    <button
                      type="button"
                      onClick={() => onStepClick?.(index)}
                      className="rounded-md text-left transition-opacity hover:opacity-80"
                    >
                      {labels}
                    </button>
                  ) : (
                    labels
                  )}
                </div>
              </li>
            );
          }

          return (
            <li
              key={index}
              aria-current={state === 'current' ? 'step' : undefined}
              className="flex flex-1 flex-col items-center last:flex-none"
            >
              <div className="flex w-full items-center">
                {/* Connector before the node */}
                <span
                  className={cn(
                    'h-0.5 flex-1 rounded-full',
                    isFirst && 'invisible',
                    beforeDone ? 'bg-primary' : 'bg-border',
                  )}
                  aria-hidden
                />
                {clickable ? (
                  <button
                    type="button"
                    onClick={() => onStepClick?.(index)}
                    className="rounded-full transition-opacity hover:opacity-80"
                  >
                    {circle}
                  </button>
                ) : (
                  circle
                )}
                {/* Connector after the node */}
                <span
                  className={cn(
                    'h-0.5 flex-1 rounded-full',
                    isLast && 'invisible',
                    afterDone ? 'bg-primary' : 'bg-border',
                  )}
                  aria-hidden
                />
              </div>
              {clickable ? (
                <button
                  type="button"
                  onClick={() => onStepClick?.(index)}
                  className="rounded-md transition-opacity hover:opacity-80"
                >
                  {labels}
                </button>
              ) : (
                labels
              )}
            </li>
          );
        })}
      </ol>
    );
  },
);
Stepper.displayName = 'Stepper';
