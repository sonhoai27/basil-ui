"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "../../lib/utils"
import { Badge } from "../ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

export interface MultiSelectItem {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface MultiSelectProps {
  items: MultiSelectItem[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  /** Số chip hiển thị tối đa trước khi gộp thành "+N". */
  maxDisplay?: number
  disabled?: boolean
  className?: string
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      items,
      value,
      onChange,
      placeholder = "Chọn...",
      searchPlaceholder = "Tìm kiếm...",
      emptyText = "Không có kết quả.",
      maxDisplay,
      disabled,
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    const selectedItems = React.useMemo(
      () =>
        value
          .map((v) => items.find((item) => item.value === v))
          .filter((item): item is MultiSelectItem => item != null),
      [value, items]
    )

    const toggle = (v: string) => {
      if (value.includes(v)) onChange(value.filter((x) => x !== v))
      else onChange([...value, v])
    }

    const remove = (v: string) => onChange(value.filter((x) => x !== v))

    const visible =
      maxDisplay != null ? selectedItems.slice(0, maxDisplay) : selectedItems
    const overflow = selectedItems.length - visible.length

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            role="combobox"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={placeholder}
            data-placeholder={selectedItems.length === 0 ? "" : undefined}
            className={cn(
              "flex min-h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1.5 text-left text-sm transition-colors",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
          >
            {selectedItems.length === 0 ? (
              <span className="line-clamp-1 flex-1 text-muted-foreground">
                {placeholder}
              </span>
            ) : (
              <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
                {visible.map((item) => (
                  <Badge
                    key={item.value}
                    variant="soft-muted"
                    size="sm"
                    className="max-w-full gap-1 pr-1"
                  >
                    <span className="line-clamp-1">{item.label}</span>
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label={`Xoá ${item.label}`}
                      className="inline-flex shrink-0 items-center justify-center rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation()
                        remove(item.value)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          e.stopPropagation()
                          remove(item.value)
                        }
                      }}
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </Badge>
                ))}
                {overflow > 0 ? (
                  <Badge variant="soft-muted" size="sm">
                    +{overflow}
                  </Badge>
                ) : null}
              </span>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => {
                  const isSelected = value.includes(item.value)
                  return (
                    <CommandItem
                      key={item.value}
                      value={item.label}
                      disabled={item.disabled}
                      onSelect={() => toggle(item.value)}
                      className="gap-2"
                    >
                      <span
                        className={cn(
                          "grid h-4 w-4 shrink-0 place-content-center rounded-sm border border-primary transition-colors",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-70 [&_svg]:invisible"
                        )}
                        aria-hidden
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {item.icon ? (
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
                          {item.icon}
                        </span>
                      ) : null}
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="line-clamp-1">{item.label}</span>
                        {item.description ? (
                          <span className="line-clamp-1 text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        ) : null}
                      </span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)
MultiSelect.displayName = "MultiSelect"

export { MultiSelect }
