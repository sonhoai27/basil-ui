import * as React from 'react';

import { cn } from '../../lib/utils';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Flat list toolbar layout primitive. A horizontal bar for filters/search on
 * the left and actions on the right — pair with `ToolbarSpacer` to push
 * trailing items to the end. Flat surface: border + card bg, no shadow.
 */
export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3',
        className,
      )}
      {...props}
    />
  ),
);
Toolbar.displayName = 'Toolbar';

export interface ToolbarSpacerProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Flexible spacer — pushes following toolbar items to the trailing edge. */
export function ToolbarSpacer({ className, ...props }: ToolbarSpacerProps) {
  return <div aria-hidden className={cn('flex-1', className)} {...props} />;
}
