"use client"

import * as React from "react"
import {
  endOfMonth,
  format,
  startOfMonth,
  subDays,
} from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"
import type { DateRange, Matcher } from "react-day-picker"

import { cn } from "../../lib/utils"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

export type { DateRange }

export interface DateRangePickerPreset {
  label: string
  /** Trả về khoảng ngày cho preset. */
  getRange: () => DateRange
}

export interface DateRangePickerProps {
  /** Khoảng ngày đang chọn. */
  value?: DateRange
  /** Gọi khi khoảng ngày thay đổi (undefined khi xoá). */
  onChange: (range?: DateRange) => void
  placeholder?: string
  /** Số tháng hiển thị cạnh nhau (mặc định 2). */
  numberOfMonths?: number
  disabled?: boolean
  /** Ngày sớm nhất được chọn. */
  fromDate?: Date
  /** Ngày muộn nhất được chọn. */
  toDate?: Date
  /** Căn lề popover so với trigger. */
  align?: "start" | "center" | "end"
  className?: string
  /**
   * Cột preset bên trái. `true` dùng bộ mặc định
   * (Hôm nay / 7 ngày / 30 ngày / Tháng này), hoặc truyền mảng tuỳ biến.
   */
  presets?: boolean | DateRangePickerPreset[]
}

const DEFAULT_PRESETS: DateRangePickerPreset[] = [
  {
    label: "Hôm nay",
    getRange: () => {
      const today = new Date()
      return { from: today, to: today }
    },
  },
  {
    label: "7 ngày",
    getRange: () => {
      const today = new Date()
      return { from: subDays(today, 6), to: today }
    },
  },
  {
    label: "30 ngày",
    getRange: () => {
      const today = new Date()
      return { from: subDays(today, 29), to: today }
    },
  },
  {
    label: "Tháng này",
    getRange: () => {
      const today = new Date()
      return { from: startOfMonth(today), to: endOfMonth(today) }
    },
  },
]

function formatRange(range?: DateRange): string | null {
  if (!range?.from) return null
  const from = format(range.from, "dd/MM/yyyy")
  if (!range.to) return from
  const to = format(range.to, "dd/MM/yyyy")
  return `${from} – ${to}`
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "Chọn khoảng ngày",
      numberOfMonths = 2,
      disabled,
      fromDate,
      toDate,
      align = "start",
      className,
      presets,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    const label = formatRange(value)
    const showClear = !disabled && value?.from != null

    // react-day-picker v10: giới hạn khoảng ngày qua matcher `before`/`after`.
    const disabledMatchers: Matcher[] = []
    if (fromDate) disabledMatchers.push({ before: fromDate })
    if (toDate) disabledMatchers.push({ after: toDate })

    const presetList = presets === true ? DEFAULT_PRESETS : Array.isArray(presets) ? presets : null

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-label={label ?? placeholder}
            data-placeholder={label ? undefined : ""}
            className={cn(
              "flex h-10 w-full items-center gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-left text-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "disabled:cursor-not-allowed disabled:opacity-50",
              !label && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="h-4 w-4 shrink-0 opacity-70" />
            <span className="line-clamp-1 flex-1 font-tabular">
              {label ?? placeholder}
            </span>
            {showClear ? (
              <span
                role="button"
                tabIndex={0}
                aria-label="Xoá khoảng ngày"
                className="-mr-1 inline-flex shrink-0 items-center justify-center rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange(undefined)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    e.stopPropagation()
                    onChange(undefined)
                  }
                }}
              >
                <X className="h-3.5 w-3.5" />
              </span>
            ) : null}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <div className="flex flex-col sm:flex-row">
            {presetList ? (
              <div className="flex shrink-0 flex-row gap-1 border-b border-border p-2 sm:flex-col sm:border-b-0 sm:border-r">
                {presetList.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => onChange(preset.getRange())}
                    className="rounded-md px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            ) : null}
            <Calendar
              mode="range"
              selected={value}
              onSelect={(range?: DateRange) => onChange(range)}
              numberOfMonths={numberOfMonths}
              defaultMonth={value?.from}
              startMonth={fromDate}
              endMonth={toDate}
              disabled={disabledMatchers.length > 0 ? disabledMatchers : undefined}
              classNames={{
                range_start: "rounded-l-md bg-primary-subtle",
                range_middle: "bg-primary-subtle",
                range_end: "rounded-r-md bg-primary-subtle",
              }}
              modifiersClassNames={{
                range_middle:
                  "[&>button]:bg-transparent [&>button]:text-foreground [&>button:hover]:bg-primary/10",
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)
DateRangePicker.displayName = "DateRangePicker"

export { DateRangePicker }
