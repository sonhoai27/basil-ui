import { BrandMark, type BrandMarkProps } from './brand-mark';
import { cn } from '../../lib/utils';

export interface WordmarkProps {
  /** Brand name shown next to the mark. */
  name?: string;
  /** Optional subtitle under the name (e.g. the product or app area). */
  subtitle?: string;
  /** Color tone: `light` on light surfaces, `dark` on dark chrome (e.g. a sidebar). */
  tone?: 'dark' | 'light';
  size?: BrandMarkProps['size'];
  className?: string;
}

/**
 * Brand lockup — {@link BrandMark} + a name and optional subtitle.
 * Generic by design: pass your own `name` / `subtitle` (defaults to "Basil").
 */
export function Wordmark({
  name = 'Basil',
  subtitle,
  tone = 'light',
  size = 'md',
  className,
}: WordmarkProps) {
  const titleColor = tone === 'dark' ? 'text-sidebar-foreground' : 'text-foreground';
  const subColor = tone === 'dark' ? 'text-sidebar-foreground/60' : 'text-muted-foreground';
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <BrandMark size={size} />
      <span className="flex flex-col leading-tight">
        <span className={cn('text-sm font-semibold', titleColor)}>{name}</span>
        {subtitle ? (
          <span className={cn('text-[11px] font-medium', subColor)}>{subtitle}</span>
        ) : null}
      </span>
    </span>
  );
}
