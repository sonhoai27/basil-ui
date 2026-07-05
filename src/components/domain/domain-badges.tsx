import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

export function VatBadge({ className }: { className?: string }) {
  return (
    <Badge variant="soft-warning" size="sm" className={cn('font-semibold', className)}>
      VAT
    </Badge>
  );
}

export function OutOfStockBadge({ className }: { className?: string }) {
  return (
    <Badge variant="soft-destructive" size="sm" className={cn('font-medium', className)} role="status">
      Out of stock
    </Badge>
  );
}

