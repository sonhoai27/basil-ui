import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Info,
  CircleCheck,
  TriangleAlert,
  CircleX,
  type LucideIcon,
} from "lucide-react"

import { cn } from "../../lib/utils"

/**
 * Alert — callout borderless: nền tint + icon & chữ cùng hue (không viền).
 * Tự render icon mặc định theo variant; truyền `icon` để override, `icon={false}` để ẩn.
 */
const alertVariants = cva(
  "relative flex w-full items-start gap-3 rounded-xl px-4 py-3.5 text-sm",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground",
        info: "bg-info-bg text-info-text",
        success: "bg-success-bg text-success-text",
        warning: "bg-warning-bg text-warning-text",
        destructive: "bg-destructive-bg text-destructive-text",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

const VARIANT_ICON: Record<
  NonNullable<VariantProps<typeof alertVariants>["variant"]>,
  LucideIcon
> = {
  default: Info,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  destructive: CircleX,
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Node icon tuỳ ý; `false` để ẩn icon. Mặc định: icon theo variant. */
  icon?: React.ReactNode | false
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    const DefaultIcon = VARIANT_ICON[variant ?? "default"]
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon !== false ? (
          <span className="mt-px shrink-0 [&>svg]:size-5" aria-hidden>
            {icon ?? <DefaultIcon className="size-5" />}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("font-semibold leading-snug tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-0.5 opacity-90 [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
