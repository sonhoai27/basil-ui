import * as React from 'react';
import { Leaf as LeafIcon, TriangleAlert as TriangleAlertIcon } from 'lucide-react';
import { Button } from './button';
import { cn } from '../../lib/utils';

interface StateShellProps {
  role: 'status' | 'alert';
  icon: React.ReactNode;
  iconClassName?: string;
  title: string;
  titleClassName?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/** Layout dùng chung cho EmptyState + ErrorState — icon + title + description + CTA. */
const StateShell = React.forwardRef<HTMLDivElement, StateShellProps>(
  ({ role, icon, iconClassName, title, titleClassName, description, action, className }, ref) => {
    return (
      <div
        ref={ref}
        role={role}
        className={cn(
          'mx-auto flex max-w-sm flex-col items-center justify-center gap-3 px-5 py-12 text-center',
          className,
        )}
      >
        <span className={iconClassName} aria-hidden>
          {icon}
        </span>
        <div className="space-y-1">
          <h3 className={cn('text-base text-foreground', titleClassName)}>{title}</h3>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
    );
  },
);
StateShell.displayName = 'StateShell';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, description, icon, action, className }, ref) => {
    return (
      <StateShell
        ref={ref}
        role="status"
        icon={icon ?? <LeafIcon size={32} />}
        iconClassName="text-muted-foreground"
        title={title}
        titleClassName="font-medium"
        description={description}
        action={action ? <Button onClick={action.onClick}>{action.label}</Button> : null}
        className={className}
      />
    );
  },
);
EmptyState.displayName = 'EmptyState';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: { label: string; onClick: () => void };
  className?: string;
}

/** Trạng thái lỗi — icon cảnh báo destructive + CTA thử lại. */
export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ title = 'Đã có lỗi xảy ra', description, icon, action, className }, ref) => {
    return (
      <StateShell
        ref={ref}
        role="alert"
        icon={icon ?? <TriangleAlertIcon size={32} />}
        iconClassName="text-destructive"
        title={title}
        titleClassName="font-semibold"
        description={description}
        action={
          action ? (
            <Button variant="outline" onClick={action.onClick}>
              {action.label}
            </Button>
          ) : null
        }
        className={className}
      />
    );
  },
);
ErrorState.displayName = 'ErrorState';
