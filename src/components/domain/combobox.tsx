"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus, X } from "lucide-react"

import { cn } from "../../lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

export interface ComboboxItem {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface ComboboxProps {
  items: ComboboxItem[]
  value?: string
  onChange: (value?: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  className?: string
  /** Allow clearing the current selection via the × button on the trigger. */
  allowClear?: boolean
  /** Called when the user picks the "Create new" row (no exact match found). */
  onCreate?: (query: string) => void
  /** Label for the create row; receives the current query. Default: + Create "{query}". */
  createLabel?: (query: string) => React.ReactNode
}

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      items,
      value,
      onChange,
      placeholder = "Select...",
      searchPlaceholder = "Search...",
      emptyText = "No results.",
      disabled,
      className,
      allowClear,
      onCreate,
      createLabel,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")

    const selected = React.useMemo(
      () => items.find((item) => item.value === value),
      [items, value]
    )

    const trimmed = query.trim()
    const hasExactMatch = React.useMemo(
      () =>
        items.some(
          (item) => item.label.toLowerCase() === trimmed.toLowerCase()
        ),
      [items, trimmed]
    )
    const showCreate = Boolean(onCreate) && trimmed.length > 0 && !hasExactMatch

    const showClear = Boolean(allowClear) && !disabled && value != null

    // Reset the query on close so the next open starts clean.
    const handleOpenChange = (next: boolean) => {
      setOpen(next)
      if (!next) setQuery("")
    }

    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            role="combobox"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={selected ? selected.label : placeholder}
            data-placeholder={selected ? undefined : ""}
            className={cn(
              "flex h-10 w-full items-center justify-between gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-left text-sm transition-colors",
              "disabled:cursor-not-allowed disabled:opacity-50",
              !selected && "text-muted-foreground",
              className
            )}
          >
            <span className="flex min-w-0 flex-1 items-center gap-2">
              {selected?.icon ? (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center [&_svg]:h-4 [&_svg]:w-4">
                  {selected.icon}
                </span>
              ) : null}
              <span className="line-clamp-1">
                {selected ? selected.label : placeholder}
              </span>
            </span>
            {showClear ? (
              <span
                role="button"
                tabIndex={0}
                aria-label="Clear selection"
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
            ) : (
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command>
            <CommandInput
              placeholder={searchPlaceholder}
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              {!showCreate ? <CommandEmpty>{emptyText}</CommandEmpty> : null}
              <CommandGroup>
                {items.map((item) => {
                  const isSelected = item.value === value
                  return (
                    <CommandItem
                      key={item.value}
                      value={item.label}
                      disabled={item.disabled}
                      onSelect={() => {
                        onChange(isSelected ? undefined : item.value)
                        handleOpenChange(false)
                      }}
                      className="gap-2"
                    >
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
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4 shrink-0 text-primary",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  )
                })}
                {showCreate ? (
                  <CommandItem
                    value={`__create__${trimmed}`}
                    onSelect={() => {
                      onCreate?.(trimmed)
                      handleOpenChange(false)
                    }}
                    className="gap-2 text-primary"
                  >
                    <Plus className="h-4 w-4 shrink-0" />
                    <span className="line-clamp-1">
                      {createLabel ? (
                        createLabel(trimmed)
                      ) : (
                        <>Create &ldquo;{trimmed}&rdquo;</>
                      )}
                    </span>
                  </CommandItem>
                ) : null}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)
Combobox.displayName = "Combobox"

export { Combobox }
