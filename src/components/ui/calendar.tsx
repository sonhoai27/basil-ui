import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "../../lib/utils"
import { Button, buttonVariants } from "./button"

/**
 * Calendar — react-day-picker v10 + Tailwind v4. Uses a FIXED cell size (size-9)
 * instead of `--cell-size` (the v3 arbitrary-var syntax does not resolve in v4). Even 7-column grid.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const d = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn("p-3", className)}
      classNames={{
        root: cn("w-fit", d.root),
        months: cn("relative flex flex-col gap-4", d.months),
        month: cn("flex w-full flex-col gap-3", d.month),
        nav: cn("absolute inset-x-1 top-1 flex items-center justify-between", d.nav),
        button_previous: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 aria-disabled:opacity-40",
          d.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 aria-disabled:opacity-40",
          d.button_next
        ),
        month_caption: cn("flex h-8 items-center justify-center", d.month_caption),
        caption_label: cn("select-none text-sm font-semibold", d.caption_label),
        month_grid: cn("w-full border-collapse", d.month_grid),
        weekdays: cn("flex", d.weekdays),
        weekday: cn(
          "flex h-8 w-9 select-none items-center justify-center text-[0.75rem] font-medium text-muted-foreground",
          d.weekday
        ),
        week: cn("mt-1 flex w-full", d.week),
        day: cn("relative h-9 w-9 select-none p-0 text-center", d.day),
        outside: cn("text-muted-foreground/50", d.outside),
        disabled: cn("text-muted-foreground opacity-40", d.disabled),
        hidden: cn("invisible", d.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className, ...rest }) => {
          const Icon =
            orientation === "left"
              ? ChevronLeft
              : orientation === "right"
                ? ChevronRight
                : ChevronDown
          return <Icon className={cn("size-4", className)} {...rest} />
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon-sm"
      data-day={day.date.toLocaleDateString()}
      data-selected={modifiers.selected || undefined}
      data-today={modifiers.today || undefined}
      className={cn(
        "size-9 rounded-md p-0 font-normal",
        "data-[today=true]:ring-1 data-[today=true]:ring-inset data-[today=true]:ring-primary/50",
        "data-[selected=true]:bg-primary data-[selected=true]:font-medium data-[selected=true]:text-primary-foreground data-[selected=true]:ring-0 data-[selected=true]:hover:bg-primary-hover data-[selected=true]:hover:text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
