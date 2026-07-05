import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Info,
  CircleCheck,
  TriangleAlert,
  CircleX,
  X,
  type LucideIcon,
} from "lucide-react"

import { cn } from "../../lib/utils"
import { useMessages } from "../../i18n"

/**
 * Banner — page-level, full-width, dismissible notice (unlike the inline Alert).
 * Borderless tint (bg-{hue}-bg text-{hue}-text) like Alert but laid out horizontally:
 * icon + content on the left, `action` on the right, and a × button when `onDismiss` is set.
 */
const bannerVariants = cva(
  "relative flex w-full items-start gap-3 rounded-lg px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        info: "bg-info-bg text-info-text",
        success: "bg-success-bg text-success-text",
        warning: "bg-warning-bg text-warning-text",
        destructive: "bg-destructive-bg text-destructive-text",
      },
    },
    defaultVariants: { variant: "info" },
  }
)

const VARIANT_ICON: Record<
  NonNullable<VariantProps<typeof bannerVariants>["variant"]>,
  LucideIcon
> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  destructive: CircleX,
}

export interface BannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof bannerVariants> {
  /** Bold title (optional). */
  title?: React.ReactNode
  /** Custom icon node; `false` to hide it. Defaults to the variant icon. */
  icon?: React.ReactNode | false
  /** Action slot on the right (button/link). */
  action?: React.ReactNode
  /** When a handler is provided, renders a × button to dismiss. */
  onDismiss?: () => void
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    { className, variant, title, icon, action, onDismiss, children, ...props },
    ref
  ) => {
    const t = useMessages()
    const DefaultIcon = VARIANT_ICON[variant ?? "info"]
    return (
      <div
        ref={ref}
        role="status"
        className={cn(bannerVariants({ variant }), className)}
        {...props}
      >
        {icon !== false ? (
          <span className="mt-px shrink-0 [&>svg]:size-5" aria-hidden>
            {icon ?? <DefaultIcon className="size-5" />}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          {title ? (
            <p className="font-semibold leading-snug tracking-tight">{title}</p>
          ) : null}
          {children ? (
            <div
              className={cn(
                "opacity-90 [&_p]:leading-relaxed",
                title && "mt-0.5"
              )}
            >
              {children}
            </div>
          ) : null}
        </div>
        {action ? (
          <div className="ml-1 mt-px flex shrink-0 items-center">{action}</div>
        ) : null}
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={t.banner.dismiss}
            className="-mr-1 -mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md text-current opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="size-4" aria-hidden />
          </button>
        ) : null}
      </div>
    )
  }
)
Banner.displayName = "Banner"

export { Banner }
