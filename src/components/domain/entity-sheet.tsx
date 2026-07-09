import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Skeleton } from '../ui/skeleton';
import { ErrorState } from './empty-state';
import { cn } from '../../lib/utils';
import { useMessages } from '../../i18n';

interface EntitySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  /** Secondary buttons — rendered in the top row (export, secondary actions) */
  secondaryActions?: React.ReactNode;
  /** Primary buttons — rendered in the bottom row (cancel + primary) */
  primaryActions: React.ReactNode;
  /** Left footer slot, inline with the primary actions — destructive */
  destructive?: React.ReactNode;
  /** Helper text above the footer */
  helper?: React.ReactNode;
  /** Loading — replaces the body with a skeleton and hides the footer actions */
  loading?: boolean;
  /** Error — replaces the body with an inline ErrorState and hides the footer actions */
  error?: { title?: string; description?: string; onRetry?: () => void } | string;
  className?: string;
  bodyClassName?: string;
}

function BodySkeleton() {
  return (
    <div className="space-y-4" aria-hidden>
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
    </div>
  );
}

export const EntitySheet = React.forwardRef<HTMLDivElement, EntitySheetProps>(
  (
    {
      open,
      onOpenChange,
      title,
      subtitle,
      children,
      secondaryActions,
      primaryActions,
      destructive,
      helper,
      loading,
      error,
      className,
      bodyClassName,
    },
    ref,
  ) => {
    const t = useMessages();
    const errorProps =
      typeof error === 'string' ? { description: error } : error;
    const isBusy = Boolean(loading || error);

    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          ref={ref}
          side="right"
          className={cn('flex w-full flex-col gap-0 p-0 sm:max-w-[520px]', className)}
        >
          <SheetHeader className="border-b bg-muted px-6 py-4 pr-14 text-left">
            {subtitle ? (
              <SheetDescription className="font-tabular text-xs uppercase tracking-wider">
                {subtitle}
              </SheetDescription>
            ) : null}
            <SheetTitle className="text-xl font-semibold">{title}</SheetTitle>
          </SheetHeader>

          <div className={cn('flex-1 overflow-y-auto px-6 py-4', bodyClassName)}>
            {loading ? (
              <BodySkeleton />
            ) : error ? (
              <ErrorState
                title={errorProps?.title}
                description={errorProps?.description}
                action={
                  errorProps?.onRetry
                    ? { label: t.common.retry, onClick: errorProps.onRetry }
                    : undefined
                }
              />
            ) : (
              children
            )}
          </div>

          {isBusy ? null : (
            // Drawer luôn hẹp (~520px) kể cả desktop → footer LUÔN xếp dọc:
            // phụ (1 hàng) → chính (full) → nguy hiểm (full, đáy).
            <div className="sticky bottom-0 flex flex-col gap-2 border-t bg-card px-6 py-3">
              {helper ? <p className="text-xs text-muted-foreground">{helper}</p> : null}
              {secondaryActions ? (
                <div className="flex flex-wrap items-center gap-2">{secondaryActions}</div>
              ) : null}
              {primaryActions ? <div className="flex flex-col gap-2">{primaryActions}</div> : null}
              {destructive ? <div className="flex flex-col">{destructive}</div> : null}
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
  },
);
EntitySheet.displayName = 'EntitySheet';
