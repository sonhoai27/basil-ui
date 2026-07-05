import * as React from 'react';

import { cn } from '../../lib/utils';

export interface InputOTPProps {
  /** Số ô nhập (mặc định 6). */
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  ariaLabel?: string;
  className?: string;
}

/**
 * Ô nhập mã OTP dạng segmented — mỗi ô 1 chữ số.
 * Tự nhảy ô kế khi gõ, Backspace lùi ô, mũi tên di chuyển, dán (paste) điền toàn bộ.
 * Chỉ nhận chữ số.
 */
export const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  (
    { length = 6, value, onChange, disabled, autoFocus, ariaLabel = 'Mã OTP', className },
    ref,
  ) => {
    const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);
    const [activeIndex, setActiveIndex] = React.useState<number>(autoFocus ? 0 : -1);

    // Cho phép parent lấy ref tới ô đầu tiên.
    React.useImperativeHandle(ref, () => inputsRef.current[0] as HTMLInputElement, []);

    React.useEffect(() => {
      if (autoFocus) {
        inputsRef.current[0]?.focus();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const chars = React.useMemo(() => {
      const digits = value.replace(/\D/g, '').slice(0, length).split('');
      return Array.from({ length }, (_, i) => digits[i] ?? '');
    }, [value, length]);

    const focusIndex = (index: number) => {
      const clamped = Math.max(0, Math.min(length - 1, index));
      inputsRef.current[clamped]?.focus();
      inputsRef.current[clamped]?.select();
    };

    const setDigit = (index: number, digit: string) => {
      const next = [...chars];
      next[index] = digit;
      onChange(next.join('').replace(/\D/g, '').slice(0, length));
    };

    const handleChange = (index: number, raw: string) => {
      const digitsOnly = raw.replace(/\D/g, '');
      if (!digitsOnly) {
        // Xoá qua onChange (vd. gõ ký tự không hợp lệ) — không đổi.
        return;
      }
      if (digitsOnly.length > 1) {
        // Người dùng gõ/dán nhiều số vào 1 ô — lấp dần từ ô hiện tại.
        const next = [...chars];
        let cursor = index;
        for (const d of digitsOnly) {
          if (cursor >= length) break;
          next[cursor] = d;
          cursor += 1;
        }
        onChange(next.join('').replace(/\D/g, '').slice(0, length));
        focusIndex(cursor);
        return;
      }
      setDigit(index, digitsOnly);
      if (index < length - 1) focusIndex(index + 1);
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Backspace': {
          e.preventDefault();
          if (chars[index]) {
            setDigit(index, '');
          } else if (index > 0) {
            setDigit(index - 1, '');
            focusIndex(index - 1);
          }
          break;
        }
        case 'Delete': {
          e.preventDefault();
          setDigit(index, '');
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          focusIndex(index - 1);
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          focusIndex(index + 1);
          break;
        }
        case 'Home': {
          e.preventDefault();
          focusIndex(0);
          break;
        }
        case 'End': {
          e.preventDefault();
          focusIndex(length - 1);
          break;
        }
        default:
          break;
      }
    };

    const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '');
      if (!pasted) return;
      const next = [...chars];
      let cursor = index;
      for (const d of pasted) {
        if (cursor >= length) break;
        next[cursor] = d;
        cursor += 1;
      }
      onChange(next.join('').replace(/\D/g, '').slice(0, length));
      focusIndex(Math.min(cursor, length - 1));
    };

    return (
      <div
        role="group"
        aria-label={ariaLabel}
        className={cn('flex items-center gap-2', className)}
      >
        {chars.map((char, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            pattern="[0-9]*"
            maxLength={1}
            value={char}
            disabled={disabled}
            aria-label={`Chữ số ${index + 1}`}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(index, e)}
            onFocus={(e) => {
              setActiveIndex(index);
              e.target.select();
            }}
            onBlur={() => setActiveIndex(-1)}
            className={cn(
              'h-11 w-11 rounded-md border border-input bg-transparent text-center text-lg',
              'font-tabular tabular-nums text-foreground transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              'disabled:cursor-not-allowed disabled:opacity-50',
              activeIndex === index && 'ring-2 ring-primary',
            )}
          />
        ))}
      </div>
    );
  },
);
InputOTP.displayName = 'InputOTP';
