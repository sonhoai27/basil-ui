import type { Story } from '@ladle/react';
import { useState } from 'react';
import {
  Download,
  Filter as FilterIcon,
  Plus,
  Search,
  ShoppingBag,
} from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  BrandMark,
  Button,
  EmptyState,
  EntitySheet,
  ErrorState,
  Input,
  Label,
  SectionGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Spinner,
  Toaster,
  Toolbar,
  ToolbarSpacer,
  Wordmark,
  toast,
} from '../index';

export default { title: 'Feedback & Brand' };

const Label2 = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
    {children}
  </div>
);

export const Alerts: Story = () => (
  <div className="max-w-xl space-y-3">
    <Alert variant="info">
      <AlertTitle>Đơn mới cần duyệt</AlertTitle>
      <AlertDescription>
        Có 4 đơn đang chờ thanh toán. Kiểm tra tài khoản ngân hàng trước khi bấm Duyệt.
      </AlertDescription>
    </Alert>
    <Alert variant="success">
      <AlertTitle>Đã duyệt đơn DH-2401</AlertTitle>
      <AlertDescription>Telegram đã gửi thông báo cho Kế toán &amp; Kho.</AlertDescription>
    </Alert>
    <Alert variant="warning">
      <AlertTitle>Sắp hết hàng</AlertTitle>
      <AlertDescription>Chả lụa chỉ còn 3 kg trong kho — cân nhắc nhập thêm.</AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <AlertTitle>Không kết nối được máy chủ</AlertTitle>
      <AlertDescription>Kiểm tra đường truyền rồi thử lại sau ít phút.</AlertDescription>
    </Alert>
    <Alert>
      <AlertDescription>Callout mặc định (neutral) — dùng cho ghi chú chung.</AlertDescription>
    </Alert>
  </div>
);

export const Toasts: Story = () => (
  <div className="flex flex-wrap gap-3">
    <Toaster />
    <Button
      onClick={() => toast.success('Đã duyệt đơn DH-2401', { description: 'Đã gửi Kế toán & Kho' })}
    >
      Toast thành công
    </Button>
    <Button
      variant="destructive"
      onClick={() => toast.error('Không huỷ được đơn', { description: 'Đơn đã xuất kho' })}
    >
      Toast lỗi
    </Button>
    <Button variant="outline" onClick={() => toast.info('Đang đồng bộ dữ liệu…')}>
      Toast info
    </Button>
    <Button variant="secondary" onClick={() => toast('Đã lưu nháp đơn hàng')}>
      Toast thường
    </Button>
  </div>
);

export const Skeletons: Story = () => (
  <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
    <div>
      <Label2>Card</Label2>
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="mt-5 h-8 w-32" />
        <Skeleton className="mt-3 h-3 w-20" />
      </div>
    </div>
    <div>
      <Label2>List rows</Label2>
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Spinners: Story = () => (
  <div className="flex items-center gap-8">
    <div className="flex flex-col items-center gap-2">
      <Spinner size="sm" />
      <span className="text-xs text-muted-foreground">sm</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Spinner size="md" />
      <span className="text-xs text-muted-foreground">md</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Spinner size="lg" />
      <span className="text-xs text-muted-foreground">lg</span>
    </div>
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner size="sm" />
      Đang tải đơn hàng…
    </div>
  </div>
);

export const EmptyAndError: Story = () => (
  <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
    <div className="rounded-lg border border-border bg-card">
      <EmptyState
        title="Chưa có đơn nào"
        description="Đơn hàng mới từ khách sẽ hiển thị ở đây."
        icon={<ShoppingBag size={32} />}
        action={{ label: 'Tạo đơn thủ công', onClick: () => toast('Mở form tạo đơn') }}
      />
    </div>
    <div className="rounded-lg border border-border bg-card">
      <ErrorState
        description="Không tải được danh sách đơn. Kiểm tra kết nối rồi thử lại."
        action={{ label: 'Thử lại', onClick: () => toast('Đang tải lại…') }}
      />
    </div>
  </div>
);

export const ToolbarStory: Story = () => (
  <Toolbar className="max-w-2xl">
    <div className="relative">
      <Search
        size={15}
        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input placeholder="Tìm đơn, khách…" className="w-56 pl-8" aria-label="Tìm" />
    </div>
    <Select defaultValue="all">
      <SelectTrigger className="w-[160px]" aria-label="Lọc trạng thái">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả trạng thái</SelectItem>
        <SelectItem value="pending_payment">Chờ thanh toán</SelectItem>
        <SelectItem value="paid">Đã thanh toán</SelectItem>
        <SelectItem value="cancelled">Đã huỷ</SelectItem>
      </SelectContent>
    </Select>
    <Button variant="outline" leadingIcon={<FilterIcon size={15} />}>
      Bộ lọc
    </Button>
    <ToolbarSpacer />
    <Button leadingIcon={<Plus size={15} />}>Tạo đơn</Button>
  </Toolbar>
);

export const Brand: Story = () => (
  <div className="space-y-6">
    <div>
      <Label2>BrandMark — sizes</Label2>
      <div className="flex items-center gap-4">
        <BrandMark size="sm" />
        <BrandMark size="md" />
        <BrandMark size="lg" />
      </div>
    </div>
    <div>
      <Label2>Wordmark — tone light (nền sáng)</Label2>
      <div className="flex flex-wrap items-center gap-8 rounded-lg border border-border bg-card p-5">
        <Wordmark app="cms" tone="light" />
        <Wordmark app="order" tone="light" />
        <Wordmark app="warehouse" tone="light" />
      </div>
    </div>
    <div>
      <Label2>Wordmark — tone dark (nền sidebar)</Label2>
      <div className="flex flex-wrap items-center gap-8 rounded-lg bg-sidebar p-5">
        <Wordmark app="cms" tone="dark" />
        <Wordmark app="order" tone="dark" />
        <Wordmark app="warehouse" tone="dark" />
      </div>
    </div>
  </div>
);

export const SectionAndEntitySheet: Story = () => {
  const [mode, setMode] = useState<null | 'normal' | 'loading' | 'error'>(null);
  return (
    <div className="max-w-2xl">
      <div className="rounded-lg border border-border bg-card px-5">
        <SectionGroup title="Thông tin cửa hàng" description="Hiển thị trên báo giá gửi khách." first>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="shop">Tên cửa hàng</Label>
              <Input id="shop" defaultValue="Mộc Chính" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="hotline">Hotline</Label>
              <Input id="hotline" defaultValue="0909 123 456" className="mt-1.5" />
            </div>
          </div>
        </SectionGroup>
        <SectionGroup title="Giao hàng" description="Cấu hình phí & khung giờ mặc định.">
          <div className="text-sm text-muted-foreground">Nội dung mục thứ hai…</div>
        </SectionGroup>
      </div>

      <div className="mt-6">
        <Label2>EntitySheet — states</Label2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setMode('normal')}>Mở (bình thường)</Button>
          <Button variant="outline" onClick={() => setMode('loading')}>
            Mở (đang tải)
          </Button>
          <Button variant="outline" onClick={() => setMode('error')}>
            Mở (lỗi)
          </Button>
        </div>
      </div>

      <EntitySheet
        open={mode !== null}
        onOpenChange={(o) => !o && setMode(null)}
        title="Chị Lan · Quán bún"
        subtitle="KH-0142"
        loading={mode === 'loading'}
        error={mode === 'error' ? { description: 'Không tải được hồ sơ khách.', onRetry: () => setMode('normal') } : undefined}
        helper="Thay đổi sẽ áp dụng cho các đơn mới."
        primaryActions={
          <>
            <Button variant="outline" onClick={() => setMode(null)}>
              Huỷ
            </Button>
            <Button onClick={() => setMode(null)}>Lưu</Button>
          </>
        }
        secondaryActions={
          <Button variant="ghost" size="sm" leadingIcon={<Download size={14} />}>
            Xuất lịch sử
          </Button>
        }
      >
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-border py-2">
            <span className="text-muted-foreground">SĐT</span>
            <span className="font-tabular">0912 345 678</span>
          </div>
          <div className="flex justify-between border-b border-border py-2">
            <span className="text-muted-foreground">Tổng chi</span>
            <span className="font-tabular font-semibold">28.400.000₫</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Số đơn</span>
            <span className="font-tabular">37</span>
          </div>
        </div>
      </EntitySheet>
    </div>
  );
};
