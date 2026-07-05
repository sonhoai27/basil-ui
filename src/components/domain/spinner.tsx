import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "../../lib/utils"

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 28,
} as const

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  size?: keyof typeof sizeMap
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn("inline-flex text-primary", className)}
      {...props}
    >
      <Loader2 className="animate-spin" size={sizeMap[size]} aria-hidden="true" />
    </span>
  )
)
Spinner.displayName = "Spinner"

export { Spinner }
