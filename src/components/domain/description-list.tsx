import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * DescriptionList — key/value detail display for read views (order/customer detail).
 * Compound: <DescriptionList> renders <dl>; <DescriptionItem> renders one row (dt + dd).
 * Hairline between rows when `divided`. `columns={2}` gives a responsive grid.
 */
export interface DescriptionListProps
  extends React.HTMLAttributes<HTMLDListElement> {
  /** Number of columns (responsive grid). Default 1. */
  columns?: 1 | 2;
  /** Hairline border-border between rows. */
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
  /** Label (dt). */
  term: React.ReactNode;
  /** Value displayed as a number → uses tabular figures. */
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
