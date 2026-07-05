import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface FilterChip {
  /** Khoá duy nhất để xoá. */
  id: string;
  /** Nhãn tiêu chí, ví dụ "Trạng thái". */
  label: string;
  /** Giá trị đang lọc, ví dụ "Chờ thanh toán". */
  value?: string;
}

export interface FilterChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: FilterChip[];
  onRemove: (id: string) => void;
  /** Hiện "Xoá tất cả" khi có ≥ 2 chip (mặc định). */
  onClearAll?: () => void;
  /** Tổng số kết quả sau lọc (hiển thị "· N kết quả"). */
  resultCount?: number;
}

/**
 * Hàng chip bộ lọc đang áp dụng — mỗi chip xoá được, kèm "Xoá tất cả".
 * Đặt ngay dưới toolbar/search để bộ lọc luôn hiển thị (không lọc ẩn).
 */
export const FilterChips = React.forwardRef<HTMLDivElement, FilterChipsProps>(
  ({ filters, onRemove, onClearAll, resultCount, className, ...props }, ref) => {
    if (filters.length === 0) return null;
    return (
      <div
        ref={ref}
        className={cn('flex flex-wrap items-center gap-2', className)}
        {...props}
      >
        <span className="text-xs font-medium text-muted-foreground">Đang lọc:</span>
        {filters.map((f) => (
          <span
            key={f.id}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card py-1 pl-2.5 pr-1 text-xs"
          >
            <span className="text-muted-foreground">{f.label}:</span>
            <span className="font-medium text-foreground">{f.value}</span>
            <button
              type="button"
              onClick={() => onRemove(f.id)}
              aria-label={`Bỏ lọc ${f.label}`}
              className="inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X size={12} aria-hidden />
            </button>
          </span>
        ))}
        {onClearAll && filters.length >= 2 ? (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Xoá tất cả
          </button>
        ) : null}
        {resultCount !== undefined ? (
          <span className="font-tabular text-xs text-muted-foreground">· {resultCount} kết quả</span>
        ) : null}
      </div>
    );
  },
);
FilterChips.displayName = 'FilterChips';
