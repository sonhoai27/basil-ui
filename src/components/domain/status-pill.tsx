import * as React from 'react';
import { Badge, type BadgeProps } from '../ui/badge';
import { cn } from '../../lib/utils';
import { useMessages } from '../../i18n';

/**
 * Default order lifecycle statuses. StatusPill is opinionated for commerce/POS;
 * override `STATUS_CONFIG` (below) or fork this file to map your own states.
 */
export type OrderStatus = 'pending_payment' | 'paid' | 'packing' | 'sent' | 'cancelled';

type SoftVariant = NonNullable<BadgeProps['variant']>;

const STATUS_CONFIG: Record<
  OrderStatus,
  { variant: SoftVariant; dot: string }
> = {
  pending_payment: { variant: 'soft-warning', dot: 'bg-warning' },
  paid:            { variant: 'soft-success', dot: 'bg-success' },
  packing:         { variant: 'soft-info',    dot: 'bg-info' },
  sent:            { variant: 'soft-primary', dot: 'bg-primary' },
  cancelled:       { variant: 'soft-muted',   dot: 'bg-muted-foreground' },
};

export interface StatusPillProps
  extends Omit<BadgeProps, 'variant' | 'children'> {
  status: OrderStatus;
}

export const StatusPill = React.forwardRef<HTMLDivElement, StatusPillProps>(
  ({ status, className, ...props }, ref) => {
    const t = useMessages();
    const cfg = STATUS_CONFIG[status];
    return (
      <Badge
        ref={ref}
        variant={cfg.variant}
        size="sm"
        className={cn('w-fit', className)}
        {...props}
      >
        <span className={cn('h-1.5 w-1.5 rounded-full', cfg.dot)} aria-hidden />
        {t.status[status]}
      </Badge>
    );
  },
);
StatusPill.displayName = 'StatusPill';
