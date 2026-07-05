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

/**
 * Banner — thông báo cấp trang, full-width, dismissible (khác Alert inline).
 * Borderless tint (bg-{hue}-bg text-{hue}-text) như Alert nhưng trải ngang:
 * icon + nội dung bên trái, `action` bên phải, nút × khi có `onDismiss`.
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
  /** Tiêu đề đậm (tuỳ chọn). */
  title?: React.ReactNode
  /** Node icon tuỳ ý; `false` để ẩn. Mặc định: icon theo variant. */
  icon?: React.ReactNode | false
  /** Slot hành động bên phải (button/link). */
  action?: React.ReactNode
  /** Có handler → render nút × để đóng. */
  onDismiss?: () => void
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    { className, variant, title, icon, action, onDismiss, children, ...props },
    ref
  ) => {
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
            aria-label="Đóng"
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
