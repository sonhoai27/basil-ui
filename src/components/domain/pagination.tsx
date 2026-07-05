import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Button } from './button';
import { cn } from '../../lib/utils';
import { useMessages } from '../../i18n';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  const t = useMessages();
  return (
    <nav
      role="navigation"
      aria-label={t.pagination.aria}
      className={cn('flex items-center justify-between gap-3', className)}
    >
      <Button
        variant="outline"
        size="sm"
        leadingIcon={<ChevronLeftIcon size={14} aria-hidden />}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
      >
        {t.common.previous}
      </Button>
      <span aria-live="polite" className="font-tabular text-xs text-muted-foreground">
        {t.pagination.pageOf(page, pageCount)}
      </span>
      <Button
        variant="outline"
        size="sm"
        trailingIcon={<ChevronRightIcon size={14} aria-hidden />}
        onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        disabled={page >= pageCount}
      >
        {t.common.next}
      </Button>
    </nav>
  );
}
