import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-card text-foreground",
        caption:
          "border-transparent bg-primary text-primary-foreground font-semibold uppercase tracking-wider hover:bg-primary/90",
        // Soft/tinted variants — use the paired -bg/-text tokens
        "soft-primary":  "border-transparent bg-primary-subtle text-primary",
        "soft-success":  "border-transparent bg-success-bg text-success-text",
        "soft-warning":  "border-transparent bg-warning-bg text-warning-text",
        "soft-info":     "border-transparent bg-info-bg text-info-text",
        "soft-muted":    "border-transparent bg-muted text-muted-foreground",
        "soft-destructive": "border-transparent bg-destructive-bg text-destructive-text",
      },
      size: {
        default: "px-3 py-0.5 text-[13px]",
        sm: "px-2 py-0 text-[11px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
