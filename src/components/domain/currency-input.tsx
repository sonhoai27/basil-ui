import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { cn } from "../../lib/utils"

/** Format an integer with vi-VN thousands grouping (dot separator): 1250000 → "1.250.000". */
function formatGrouped(n: number): string {
  return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(n)
}

/** Keep only ASCII digits from a string. */
function digitsOnly(s: string): string {
  return s.replace(/\D+/g, "")
}

/** Wrapper trông như 1 ô input: viền + focus-ring (field-ring), suffix chiếm chỗ riêng. */
const fieldCls =
  "flex h-10 w-full items-center gap-1.5 rounded-md border border-input bg-transparent px-3 text-sm transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-primary aria-[invalid=true]:border-destructive"
const innerInputCls =
  "min-w-0 flex-1 bg-transparent text-right tabular-nums outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"

export interface CurrencyInputProps {
  /** Raw integer amount in VND (no decimals). */
  value?: number
  /** Emits the raw integer, never the formatted string. `undefined` when empty. */
  onChange: (value?: number) => void
  placeholder?: string
  disabled?: boolean
  /** Clamp lower bound applied on blur. */
  min?: number
  className?: string
  /** Trailing adornment inside the field. */
  suffix?: string
  id?: string
  "aria-label"?: string
  "aria-invalid"?: boolean
}

/**
 * VND money entry. Type raw digits; formats with vi-VN thousands grouping (dot separator)
 * on blur only. Emits the raw integer via `onChange`. Suffix (₫) reserves its own space so
 * the right-aligned value never overlaps it.
 */
const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      value,
      onChange,
      placeholder,
      disabled,
      min,
      className,
      suffix = "₫",
      id,
      "aria-label": ariaLabel,
      "aria-invalid": ariaInvalid,
    },
    ref
  ) => {
    const [focused, setFocused] = React.useState(false)
    // Raw digit string shown while focused/typing.
    const [draft, setDraft] = React.useState("")

    // Text shown in the field: raw digits while focused, grouped when blurred.
    const display = focused
      ? draft
      : value === undefined
        ? ""
        : formatGrouped(value)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setDraft(value === undefined ? "" : String(value))
      setFocused(true)
      // Move caret to end so grouped-to-raw swap never strands it.
      requestAnimationFrame(() => {
        const el = e.target
        const len = el.value.length
        el.setSelectionRange(len, len)
      })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = digitsOnly(e.target.value)
      setDraft(next)
      onChange(next === "" ? undefined : Number(next))
    }

    const handleBlur = () => {
      setFocused(false)
      if (draft === "") {
        onChange(undefined)
        return
      }
      let n = Number(draft)
      if (min !== undefined && n < min) n = min
      onChange(n)
    }

    return (
      <div
        aria-invalid={ariaInvalid}
        className={cn(fieldCls, disabled && "cursor-not-allowed opacity-50", className)}
      >
        <input
          ref={ref}
          id={id}
          type="text"
          inputMode="numeric"
          aria-label={ariaLabel}
          value={display}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={innerInputCls}
        />
        {suffix ? (
          <span aria-hidden="true" className="shrink-0 text-muted-foreground">
            {suffix}
          </span>
        ) : null}
      </div>
    )
  }
)
CurrencyInput.displayName = "CurrencyInput"

export interface NumberFieldProps {
  value?: number
  onChange: (value?: number) => void
  min?: number
  max?: number
  step?: number
  /** Trailing unit adornment, e.g. "kg". */
  suffix?: string
  disabled?: boolean
  /** Render −/+ stepper buttons flanking the input. */
  steppers?: boolean
  placeholder?: string
  className?: string
  id?: string
  "aria-label"?: string
  "aria-invalid"?: boolean
}

/**
 * Generic integer entry (quantities) with optional −/+ steppers.
 * Emits the raw integer via `onChange`; clamps to [min, max] on blur and step.
 */
const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      value,
      onChange,
      min,
      max,
      step = 1,
      suffix,
      disabled,
      steppers = false,
      placeholder,
      className,
      id,
      "aria-label": ariaLabel,
      "aria-invalid": ariaInvalid,
    },
    ref
  ) => {
    const clamp = (n: number): number => {
      let out = n
      if (min !== undefined && out < min) out = min
      if (max !== undefined && out > max) out = max
      return out
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = digitsOnly(e.target.value)
      onChange(raw === "" ? undefined : Number(raw))
    }

    const handleBlur = () => {
      if (value === undefined) return
      const c = clamp(value)
      if (c !== value) onChange(c)
    }

    const bump = (dir: 1 | -1) => {
      const base = value ?? min ?? 0
      onChange(clamp(base + dir * step))
    }

    const atMin = min !== undefined && value !== undefined && value <= min
    const atMax = max !== undefined && value !== undefined && value >= max

    const stepperCls =
      "flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"

    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        {steppers && (
          <button
            type="button"
            aria-label="Giảm"
            disabled={disabled || atMin}
            onClick={() => bump(-1)}
            className={stepperCls}
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
        <div
          aria-invalid={ariaInvalid}
          className={cn(fieldCls, "min-w-0 flex-1", disabled && "cursor-not-allowed opacity-50")}
        >
          <input
            ref={ref}
            id={id}
            type="text"
            inputMode="numeric"
            aria-label={ariaLabel}
            value={value === undefined ? "" : String(value)}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={innerInputCls}
          />
          {suffix ? (
            <span aria-hidden="true" className="shrink-0 text-muted-foreground">
              {suffix}
            </span>
          ) : null}
        </div>
        {steppers && (
          <button
            type="button"
            aria-label="Tăng"
            disabled={disabled || atMax}
            onClick={() => bump(1)}
            className={stepperCls}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    )
  }
)
NumberField.displayName = "NumberField"

export { CurrencyInput, NumberField }
