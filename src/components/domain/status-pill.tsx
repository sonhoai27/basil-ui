import * as React from 'react';
import { Badge, type BadgeProps } from '../ui/badge';
import { cn } from '../../lib/utils';

/**
 * Default order lifecycle statuses. StatusPill is opinionated for commerce/POS;
 * override `STATUS_CONFIG` (below) or fork this file to map your own states.
 */
export type OrderStatus = 'pending_payment' | 'paid' | 'packing' | 'sent' | 'cancelled';

type SoftVariant = NonNullable<BadgeProps['variant']>;

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; variant: SoftVariant; dot: string }
> = {
  pending_payment: { label: 'Chờ thanh toán', variant: 'soft-warning', dot: 'bg-warning' },
  paid:            { label: 'Đã thanh toán',  variant: 'soft-success', dot: 'bg-success' },
  packing:         { label: 'Đang đóng',      variant: 'soft-info',    dot: 'bg-info' },
  sent:            { label: 'Đã gửi',         variant: 'soft-primary', dot: 'bg-primary' },
  cancelled:       { label: 'Đã huỷ',         variant: 'soft-muted',   dot: 'bg-muted-foreground' },
};

export interface StatusPillProps
  extends Omit<BadgeProps, 'variant' | 'children'> {
  status: OrderStatus;
}

export const StatusPill = React.forwardRef<HTMLDivElement, StatusPillProps>(
  ({ status, className, ...props }, ref) => {
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
        {cfg.label}
      </Badge>
    );
  },
);
StatusPill.displayName = 'StatusPill';
