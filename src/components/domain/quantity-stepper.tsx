import { Minus as MinusIcon, Plus as PlusIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useMessages } from '../../i18n';

export interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function QuantityStepper({
  value,
  min = 0,
  max = 9999,
  step = 1,
  onChange,
  disabled,
  size = 'md',
  className,
}: QuantityStepperProps) {
  const t = useMessages();
  const btn =
    size === 'sm'
      ? 'h-8 w-8 [&_svg]:size-3.5'
      : 'h-10 w-10 [&_svg]:size-4';
  const display =
    size === 'sm' ? 'min-w-[1.75rem] text-sm' : 'min-w-[2rem] text-base';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-input bg-card',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
    >
      <button
        type="button"
        aria-label={t.numberField.decrease}
        onClick={() => onChange(Math.max(min, value - step))}
        disabled={value <= min}
        className={cn(
          'flex items-center justify-center text-foreground transition-colors',
          'hover:bg-muted disabled:pointer-events-none disabled:text-muted-foreground',
          'rounded-l-lg',
          btn,
        )}
      >
        <MinusIcon aria-hidden />
      </button>
      <span
        className={cn(
          'select-none text-center font-tabular font-semibold tabular-nums text-foreground',
          display,
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label={t.numberField.increase}
        onClick={() => onChange(Math.min(max, value + step))}
        disabled={value >= max}
        className={cn(
          'flex items-center justify-center text-foreground transition-colors',
          'hover:bg-muted disabled:pointer-events-none disabled:text-muted-foreground',
          'rounded-r-lg',
          btn,
        )}
      >
        <PlusIcon aria-hidden />
      </button>
    </div>
  );
}
