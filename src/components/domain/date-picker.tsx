"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"
import type { Matcher } from "react-day-picker"

import { cn } from "../../lib/utils"
import { useMessages } from "../../i18n"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

export interface DatePickerProps {
  value?: Date
  onChange?: (date?: Date) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  /** Earliest selectable date. */
  fromDate?: Date
  /** Latest selectable date. */
  toDate?: Date
  /** Matcher for dates disabled in the calendar. */
  disabledDates?: Matcher | Matcher[]
  /** Hide the button that clears the selected date. */
  hideClear?: boolean
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder,
      className,
      disabled,
      fromDate,
      toDate,
      disabledDates,
      hideClear,
    },
    ref
  ) => {
    const t = useMessages()
    const [open, setOpen] = React.useState(false)
    const placeholderText = placeholder ?? t.datePicker.placeholder
    const showClear = !hideClear && !disabled && value != null

    // react-day-picker v10: constrain the date range via `before`/`after` matchers,
    // merged with the caller-provided `disabledDates` matcher.
    const disabledMatchers: Matcher[] = []
    if (fromDate) disabledMatchers.push({ before: fromDate })
    if (toDate) disabledMatchers.push({ after: toDate })
    if (Array.isArray(disabledDates)) disabledMatchers.push(...disabledDates)
    else if (disabledDates) disabledMatchers.push(disabledDates)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-label={value ? format(value, "dd/MM/yyyy") : placeholderText}
            data-placeholder={value ? undefined : ""}
            className={cn(
              "flex h-10 w-full items-center gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-left text-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "disabled:cursor-not-allowed disabled:opacity-50",
              !value && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="h-4 w-4 shrink-0 opacity-70" />
            <span className="line-clamp-1 flex-1">
              {value ? format(value, "dd/MM/yyyy") : placeholderText}
            </span>
            {showClear ? (
              <span
                role="button"
                tabIndex={0}
                aria-label={t.datePicker.clear}
                className="-mr-1 inline-flex shrink-0 items-center justify-center rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange?.(undefined)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    e.stopPropagation()
                    onChange?.(undefined)
                  }
                }}
              >
                <X className="h-3.5 w-3.5" />
              </span>
            ) : null}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date: Date | undefined) => {
              onChange?.(date)
              setOpen(false)
            }}
            startMonth={fromDate}
            endMonth={toDate}
            disabled={disabledMatchers.length > 0 ? disabledMatchers : undefined}
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
