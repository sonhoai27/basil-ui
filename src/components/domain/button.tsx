import * as React from 'react';
import { Loader2 as SpinnerIcon } from 'lucide-react';
import {
  Button as ShadcnButton,
  buttonVariants,
  type ButtonProps as ShadcnButtonProps,
} from '../ui/button';
import { cn } from '../../lib/utils';

/**
 * Thin pass-through over shadcn Button.
 * Visual 100% từ shadcn cva. Wrapper CHỈ thêm 4 ergonomic prop, KHÔNG override visual.
 *
 * shadcn Button có:  variant (default/destructive/outline/secondary/ghost/link) + size (default/sm/lg/icon)
 * Wrapper thêm:      isLoading + leadingIcon + trailingIcon + fullWidth
 */
export interface ButtonProps extends ShadcnButtonProps {
  isLoading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { isLoading, leadingIcon, trailingIcon, fullWidth, disabled, className, children, ...props },
    ref,
  ) => (
    <ShadcnButton
      ref={ref}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(fullWidth && 'w-full', className)}
      {...props}
    >
      {isLoading ? (
        <SpinnerIcon className="animate-spin" aria-hidden />
      ) : (
        leadingIcon
      )}
      {children}
      {!isLoading && trailingIcon}
    </ShadcnButton>
  ),
);
Button.displayName = 'Button';

export { buttonVariants };
