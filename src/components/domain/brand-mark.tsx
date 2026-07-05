import { cn } from '../../lib/utils';

export interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASS: Record<NonNullable<BrandMarkProps['size']>, { box: string; icon: number }> = {
  sm: { box: 'h-6 w-6', icon: 14 },
  md: { box: 'h-8 w-8', icon: 18 },
  lg: { box: 'h-10 w-10', icon: 22 },
};

/**
 * Brand mark — ô vuông primary (banana-leaf green) chứa lá contrast màu trắng.
 * Lá dùng `currentColor` (= text-primary-foreground) → bám token, không còn neon.
 */
export function BrandMark({ size = 'md', className }: BrandMarkProps) {
  const { box, icon } = SIZE_CLASS[size];
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground',
        box,
        className,
      )}
      aria-hidden
    >
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 4C18 4 14 4.5 11 7.5C8 10.5 7 14 7 16.5C7 18 7.5 19.5 8.5 20.5L20 9V4Z"
          fill="currentColor"
        />
        <path
          d="M8.5 20.5L4 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
