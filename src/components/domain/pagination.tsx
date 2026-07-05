import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Button } from './button';
import { cn } from '../../lib/utils';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="Phân trang"
      className={cn('flex items-center justify-between gap-3', className)}
    >
      <Button
        variant="outline"
        size="sm"
        leadingIcon={<ChevronLeftIcon size={14} aria-hidden />}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
      >
        Trước
      </Button>
      <span aria-live="polite" className="font-tabular text-xs text-muted-foreground">
        Trang <strong className="text-foreground">{page}</strong> / {pageCount}
      </span>
      <Button
        variant="outline"
        size="sm"
        trailingIcon={<ChevronRightIcon size={14} aria-hidden />}
        onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        disabled={page >= pageCount}
      >
        Sau
      </Button>
    </nav>
  );
}
