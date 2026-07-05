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

interface EntitySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  /** Buttons phụ — render row trên (export, secondary actions) */
  secondaryActions?: React.ReactNode;
  /** Buttons chính — render row dưới (cancel + primary) */
  primaryActions: React.ReactNode;
  /** Slot trái footer ngang hàng primary — destructive */
  destructive?: React.ReactNode;
  /** Helper text trên top footer */
  helper?: React.ReactNode;
  /** Đang tải — thay body bằng skeleton, ẩn footer actions */
  loading?: boolean;
  /** Lỗi — thay body bằng ErrorState inline, ẩn footer actions */
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
          <SheetHeader className="border-b bg-muted px-6 py-4 text-left">
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
                    ? { label: 'Thử lại', onClick: errorProps.onRetry }
                    : undefined
                }
              />
            ) : (
              children
            )}
          </div>

          {isBusy ? null : (
            <div className="sticky bottom-0 flex flex-col gap-2 border-t bg-card px-6 py-3">
              {helper ? <p className="text-xs text-muted-foreground">{helper}</p> : null}
              {secondaryActions ? (
                <div className="flex flex-wrap items-center gap-2 border-b pb-2">
                  {secondaryActions}
                </div>
              ) : null}
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">{destructive}</div>
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
                  {primaryActions}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
  },
);
EntitySheet.displayName = 'EntitySheet';
