import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * DescriptionList — key/value detail display cho read view (order/customer detail).
 * Compound: <DescriptionList> render <dl>; <DescriptionItem> render 1 hàng (dt + dd).
 * Hairline giữa các hàng khi `divided`. `columns={2}` cho grid responsive.
 */
export interface DescriptionListProps
  extends React.HTMLAttributes<HTMLDListElement> {
  /** Số cột (responsive grid). Mặc định 1. */
  columns?: 1 | 2;
  /** Hairline border-border giữa các hàng. */
  divided?: boolean;
}

const DescriptionListContext = React.createContext<{ divided: boolean }>({
  divided: false,
});

export const DescriptionList = React.forwardRef<
  HTMLDListElement,
  DescriptionListProps
>(({ columns = 1, divided = false, className, children, ...props }, ref) => {
  return (
    <DescriptionListContext.Provider value={{ divided }}>
      <dl
        ref={ref}
        className={cn(
          'grid grid-cols-1 gap-x-6',
          columns === 2 && 'sm:grid-cols-2',
          divided ? 'gap-y-0' : 'gap-y-3',
          className,
        )}
        {...props}
      >
        {children}
      </dl>
    </DescriptionListContext.Provider>
  );
});
DescriptionList.displayName = 'DescriptionList';

export interface DescriptionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Nhãn (dt). */
  term: React.ReactNode;
  /** Giá trị hiển thị dạng số → dùng tabular. */
  numeric?: boolean;
}

export const DescriptionItem = React.forwardRef<
  HTMLDivElement,
  DescriptionItemProps
>(({ term, numeric, className, children, ...props }, ref) => {
  const { divided } = React.useContext(DescriptionListContext);
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-start gap-4',
        divided &&
          'border-b border-border py-3 first:pt-0 last:border-b-0 last:pb-0',
        className,
      )}
      {...props}
    >
      <dt className="w-32 shrink-0 text-sm text-muted-foreground">{term}</dt>
      <dd
        className={cn(
          'min-w-0 flex-1 text-sm text-foreground',
          numeric && 'font-tabular tabular-nums',
        )}
      >
        {children}
      </dd>
    </div>
  );
});
DescriptionItem.displayName = 'DescriptionItem';
