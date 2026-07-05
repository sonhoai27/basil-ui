import * as React from 'react';
import { cn } from '../../lib/utils';

/** Renders below an input — a muted caption, or destructive when in error state. */
export function FieldHint({
  children,
  error,
}: {
  children?: React.ReactNode;
  error?: boolean;
}) {
  if (!children) return null;
  return (
    <p className={cn('mt-1 text-xs', error ? 'text-destructive' : 'text-muted-foreground')}>
      {children}
    </p>
  );
}

/** Dot indicator for a required field — place next to a shadcn Label. */
export function RequiredHint() {
  return (
    <span
      className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground align-middle"
      aria-hidden
    />
  );
}
