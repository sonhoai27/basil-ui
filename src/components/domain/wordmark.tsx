import { BrandMark, type BrandMarkProps } from './brand-mark';
import { cn } from '../../lib/utils';

export type AppKind = 'cms' | 'order' | 'warehouse';
const SUB: Record<AppKind, string> = {
  cms: 'CMS Đơn Sỉ',
  order: 'Đặt Hàng Sỉ',
  warehouse: 'Kho Đóng Gói',
};

export interface WordmarkProps {
  app: AppKind;
  tone?: 'dark' | 'light';
  size?: BrandMarkProps['size'];
  className?: string;
}

export function Wordmark({ app, tone = 'light', size = 'md', className }: WordmarkProps) {
  const titleColor = tone === 'dark' ? 'text-sidebar-foreground' : 'text-foreground';
  const subColor = tone === 'dark' ? 'text-sidebar-foreground/60' : 'text-muted-foreground';
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <BrandMark size={size} />
      <span className="flex flex-col leading-tight">
        <span className={cn('text-sm font-semibold', titleColor)}>Mộc Chính</span>
        <span className={cn('text-[11px] font-medium', subColor)}>
          {SUB[app]}
        </span>
      </span>
    </span>
  );
}
