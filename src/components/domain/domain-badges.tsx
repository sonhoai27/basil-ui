import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import { useMessages } from '../../i18n';

export function VatBadge({ className }: { className?: string }) {
  return (
    <Badge variant="soft-warning" size="sm" className={cn('font-semibold', className)}>
      VAT
    </Badge>
  );
}

export function OutOfStockBadge({ className }: { className?: string }) {
  const t = useMessages();
  return (
    <Badge variant="soft-destructive" size="sm" className={cn('font-medium', className)} role="status">
      {t.badges.outOfStock}
    </Badge>
  );
}

