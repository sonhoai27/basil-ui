import type { Story } from '@ladle/react';
import { Eye, Pencil, Trash2, Plus, ArrowRight, Printer, Check } from 'lucide-react';

import { Button, Badge, StatusPill, KebabMenu } from '../index';

export default { title: 'Actions & Status' };

/** Tiny muted section label above a sub-group of variants. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                            */
/* ------------------------------------------------------------------ */

export const Buttons: Story = () => (
  <div className="max-w-3xl space-y-8">
    <div className="space-y-3">
      <Label>Variants</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="default">Tạo đơn hàng</Button>
        <Button variant="secondary">Lưu nháp</Button>
        <Button variant="outline">Xuất Excel</Button>
        <Button variant="ghost">Bỏ qua</Button>
        <Button variant="destructive">Huỷ đơn</Button>
        <Button variant="link">Xem chi tiết</Button>
      </div>
    </div>

    <div className="space-y-3">
      <Label>Sizes</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Nhỏ (sm)</Button>
        <Button size="default">Mặc định</Button>
        <Button size="lg">Lớn (lg)</Button>
        <Button size="icon" aria-label="Thêm sản phẩm">
          <Plus />
        </Button>
        <Button size="icon-sm" aria-label="In đơn" variant="outline">
          <Printer />
        </Button>
      </div>
    </div>

    <div className="space-y-3">
      <Label>Với icon</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Button leadingIcon={<Plus />}>Thêm dòng hàng</Button>
        <Button variant="outline" trailingIcon={<ArrowRight />}>
          Tiếp tục
        </Button>
        <Button variant="secondary" leadingIcon={<Printer />} trailingIcon={<ArrowRight />}>
          In &amp; gửi
        </Button>
      </div>
    </div>

    <div className="space-y-3">
      <Label>Loading</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Button isLoading>Đang lưu…</Button>
        <Button variant="secondary" isLoading>
          Đang xử lý
        </Button>
        <Button variant="outline" isLoading>
          Đang tải
        </Button>
      </div>
    </div>

    <div className="space-y-3">
      <Label>Disabled</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled>Tạo đơn hàng</Button>
        <Button variant="outline" disabled leadingIcon={<Check />}>
          Đã xác nhận
        </Button>
        <Button variant="destructive" disabled>
          Huỷ đơn
        </Button>
      </div>
    </div>

    <div className="space-y-3">
      <Label>Full width</Label>
      <div className="max-w-md space-y-3">
        <Button fullWidth leadingIcon={<Plus />}>
          Thêm khách hàng mới
        </Button>
        <Button fullWidth variant="outline">
          Quay lại danh sách đơn
        </Button>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Badges                                                            */
/* ------------------------------------------------------------------ */

export const Badges: Story = () => (
  <div className="max-w-3xl space-y-8">
    <div className="space-y-3">
      <Label>Solid</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="default">Mới</Badge>
        <Badge variant="secondary">Bán sỉ</Badge>
        <Badge variant="destructive">Hết hàng</Badge>
        <Badge variant="outline">DH-2401</Badge>
        <Badge variant="caption">Ưu đãi</Badge>
      </div>
    </div>

    <div className="space-y-3">
      <Label>Soft / tinted</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="soft-primary">Đã gửi</Badge>
        <Badge variant="soft-success">Đã thanh toán</Badge>
        <Badge variant="soft-warning">Chờ thanh toán</Badge>
        <Badge variant="soft-info">Đang đóng</Badge>
        <Badge variant="soft-muted">Đã huỷ</Badge>
        <Badge variant="soft-destructive">Quá hạn</Badge>
      </div>
    </div>

    <div className="space-y-3">
      <Label>Size sm</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="default" size="sm">
          Mới
        </Badge>
        <Badge variant="secondary" size="sm">
          Bán sỉ
        </Badge>
        <Badge variant="destructive" size="sm">
          Hết hàng
        </Badge>
        <Badge variant="outline" size="sm">
          DH-2401
        </Badge>
        <Badge variant="caption" size="sm">
          Ưu đãi
        </Badge>
        <Badge variant="soft-primary" size="sm">
          Đã gửi
        </Badge>
        <Badge variant="soft-success" size="sm">
          Đã thanh toán
        </Badge>
        <Badge variant="soft-warning" size="sm">
          Chờ thanh toán
        </Badge>
        <Badge variant="soft-info" size="sm">
          Đang đóng
        </Badge>
        <Badge variant="soft-muted" size="sm">
          Đã huỷ
        </Badge>
        <Badge variant="soft-destructive" size="sm">
          Quá hạn
        </Badge>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* StatusPills                                                        */
/* ------------------------------------------------------------------ */

export const StatusPills: Story = () => (
  <div className="max-w-md space-y-4">
    <Label>Trạng thái đơn hàng</Label>
    <div className="flex flex-wrap items-center gap-3">
      <StatusPill status="pending_payment" />
      <StatusPill status="paid" />
      <StatusPill status="packing" />
      <StatusPill status="sent" />
      <StatusPill status="cancelled" />
    </div>

    <Label>Trong dòng bảng đơn</Label>
    <div className="divide-y rounded-md border">
      {[
        { code: 'DH-2401', customer: 'Chị Lan · Quán bún', total: '1.250.000₫', status: 'pending_payment' as const },
        { code: 'DH-2402', customer: 'Anh Dũng · Bếp ăn KCN', total: '3.480.000₫', status: 'paid' as const },
        { code: 'DH-2403', customer: 'Cô Hồng · Tạp hoá', total: '860.000₫', status: 'packing' as const },
        { code: 'DH-2404', customer: 'Quán ốc Bảy', total: '2.100.000₫', status: 'sent' as const },
        { code: 'DH-2405', customer: 'Chị Mai · Cơm tấm', total: '540.000₫', status: 'cancelled' as const },
      ].map((o) => (
        <div key={o.code} className="flex items-center gap-3 px-3 py-2 text-sm">
          <span className="font-tabular font-semibold">{o.code}</span>
          <span className="flex-1 truncate text-muted-foreground">{o.customer}</span>
          <span className="font-tabular">{o.total}</span>
          <StatusPill status={o.status} />
        </div>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* KebabMenu                                                          */
/* ------------------------------------------------------------------ */

export const KebabMenuStory: Story = () => (
  <div className="max-w-md space-y-4">
    <Label>Menu thao tác dòng</Label>
    <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
      <div className="flex items-center gap-3">
        <span className="font-tabular font-semibold">DH-2401</span>
        <span className="text-muted-foreground">Chị Lan · Quán bún</span>
      </div>
      <KebabMenu
        items={[
          { label: 'Xem', icon: <Eye className="size-4" />, onSelect: () => {} },
          { label: 'Sửa', icon: <Pencil className="size-4" />, onSelect: () => {} },
          {
            label: 'Huỷ đơn',
            icon: <Trash2 className="size-4" />,
            onSelect: () => {},
            destructive: true,
          },
        ]}
      />
    </div>
  </div>
);
