import type { Story } from '@ladle/react';

export default { title: 'Foundations' };

/* ---------------------------------------------------------------------------
   Helpers (local, no component imports — pure Tailwind token swatches)
   --------------------------------------------------------------------------- */

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

function Swatch({
  className,
  token,
  note,
  border,
}: {
  className: string;
  token: string;
  note?: string;
  border?: boolean;
}) {
  return (
    <div className="w-44 space-y-1.5">
      <div
        className={`h-16 w-full rounded-lg ${border ? 'border border-border-strong' : ''} ${className}`}
      />
      <div>
        <code className="text-xs font-semibold text-foreground">{token}</code>
        {note ? <p className="text-xs text-muted-foreground">{note}</p> : null}
      </div>
    </div>
  );
}

/* ===========================================================================
   Colors
   =========================================================================== */

export const Colors: Story = () => (
  <div className="max-w-5xl space-y-8 p-2">
    <div>
      <h2 className="mb-1 text-lg font-bold text-foreground">Bảng màu — Mộc Chính</h2>
      <p className="text-sm text-muted-foreground">
        Nguồn chân lý: <code>src/styles/globals.css</code> (@theme). Light-only, không hardcode HEX
        ngoài file token.
      </p>
    </div>

    {/* Brand */}
    <section className="space-y-3">
      <GroupLabel>Brand — banana-leaf green</GroupLabel>
      <div className="flex flex-wrap gap-4">
        <Swatch className="bg-primary" token="bg-primary" note="#1b5e20 · CTA, nav active" />
        <Swatch
          className="bg-primary-hover"
          token="bg-primary-hover"
          note="#2e7d32 · button hover"
        />
        <Swatch
          className="bg-primary-subtle"
          token="bg-primary-subtle"
          note="#e8f5e9 · row/chip hover"
          border
        />
        <Swatch className="bg-ring" token="bg-ring (ring)" note="#1b5e20 · focus ring" />
      </div>
    </section>

    {/* Surfaces */}
    <section className="space-y-3">
      <GroupLabel>Surfaces & neutrals</GroupLabel>
      <div className="flex flex-wrap gap-4">
        <Swatch
          className="bg-background"
          token="bg-background"
          note="#fafaf7 · page (never white)"
          border
        />
        <Swatch className="bg-card" token="bg-card" note="#ffffff · panels" border />
        <Swatch className="bg-muted" token="bg-muted" note="#f3f4f6 · muted surface" border />
        <Swatch
          className="bg-accent"
          token="bg-accent"
          note="#e8f5e9 · green-tint hover"
          border
        />
        <Swatch className="bg-border" token="bg-border" note="#e8e8e3 · hairline" border />
        <Swatch
          className="bg-border-strong"
          token="bg-border-strong"
          note="#d6d6cf · strong edge / input"
          border
        />
      </div>
    </section>

    {/* Status triads */}
    <section className="space-y-3">
      <GroupLabel>Status — solid + tinted bg/text (borderless chips)</GroupLabel>
      <div className="space-y-5">
        {/* success */}
        <div className="flex flex-wrap items-start gap-4">
          <Swatch className="bg-success" token="bg-success" note="#10b981 · Đã thanh toán" />
          <Swatch className="bg-success-bg" token="bg-success-bg" note="#d1fae5" border />
          <div className="w-44 space-y-1.5">
            <div className="flex h-16 items-center justify-center rounded-lg bg-success-bg">
              <span className="rounded-sm bg-success-bg px-2 py-0.5 text-sm font-medium text-success-text">
                Đã thanh toán
              </span>
            </div>
            <code className="text-xs font-semibold text-foreground">text-success-text</code>
            <p className="text-xs text-muted-foreground">#065f46</p>
          </div>
        </div>

        {/* warning */}
        <div className="flex flex-wrap items-start gap-4">
          <Swatch className="bg-warning" token="bg-warning" note="#f59e0b · Chờ thanh toán" />
          <Swatch className="bg-warning-bg" token="bg-warning-bg" note="#fef3c7" border />
          <div className="w-44 space-y-1.5">
            <div className="flex h-16 items-center justify-center rounded-lg bg-warning-bg">
              <span className="rounded-sm bg-warning-bg px-2 py-0.5 text-sm font-medium text-warning-text">
                Chờ thanh toán
              </span>
            </div>
            <code className="text-xs font-semibold text-foreground">text-warning-text</code>
            <p className="text-xs text-muted-foreground">#92400e</p>
          </div>
        </div>

        {/* info */}
        <div className="flex flex-wrap items-start gap-4">
          <Swatch className="bg-info" token="bg-info" note="#3b82f6 · Đang giao" />
          <Swatch className="bg-info-bg" token="bg-info-bg" note="#dbeafe" border />
          <div className="w-44 space-y-1.5">
            <div className="flex h-16 items-center justify-center rounded-lg bg-info-bg">
              <span className="rounded-sm bg-info-bg px-2 py-0.5 text-sm font-medium text-info-text">
                Đang giao
              </span>
            </div>
            <code className="text-xs font-semibold text-foreground">text-info-text</code>
            <p className="text-xs text-muted-foreground">#1e40af</p>
          </div>
        </div>

        {/* destructive */}
        <div className="flex flex-wrap items-start gap-4">
          <Swatch
            className="bg-destructive"
            token="bg-destructive"
            note="#ef4444 · Đã huỷ / xoá"
          />
          <Swatch className="bg-destructive-bg" token="bg-destructive-bg" note="#fee2e2" border />
          <div className="w-44 space-y-1.5">
            <div className="flex h-16 items-center justify-center rounded-lg bg-destructive-bg">
              <span className="rounded-sm bg-destructive-bg px-2 py-0.5 text-sm font-medium text-destructive-text">
                Đã huỷ
              </span>
            </div>
            <code className="text-xs font-semibold text-foreground">text-destructive-text</code>
            <p className="text-xs text-muted-foreground">#991b1b</p>
          </div>
        </div>
      </div>
    </section>

    {/* Sidebar chrome */}
    <section className="space-y-3">
      <GroupLabel>Sidebar chrome — dark banana-leaf</GroupLabel>
      <div className="flex flex-wrap gap-4">
        <div className="w-56 space-y-1.5">
          <div className="space-y-1 rounded-lg bg-sidebar p-3">
            <div className="rounded-md bg-sidebar-accent px-3 py-2 text-sm font-medium text-sidebar-accent-foreground">
              Đơn hàng
            </div>
            <div className="px-3 py-2 text-sm text-sidebar-foreground">Khách hàng</div>
            <div className="px-3 py-2 text-sm text-sidebar-foreground">Công nợ</div>
          </div>
          <code className="text-xs font-semibold text-foreground">bg-sidebar</code>
          <p className="text-xs text-muted-foreground">#1b3a1f · nav shell</p>
        </div>
        <Swatch
          className="bg-sidebar-accent"
          token="bg-sidebar-accent"
          note="#2e5232 · active item"
        />
        <div className="w-44 space-y-1.5">
          <div className="flex h-16 items-center justify-center rounded-lg bg-sidebar">
            <span className="text-sm font-medium text-sidebar-foreground">
              text-sidebar-foreground
            </span>
          </div>
          <code className="text-xs font-semibold text-foreground">sidebar-foreground</code>
          <p className="text-xs text-muted-foreground">#e8f5e9 · cream</p>
        </div>
      </div>
    </section>
  </div>
);

/* ===========================================================================
   Typography
   =========================================================================== */

export const Typography: Story = () => (
  <div className="max-w-3xl space-y-8 p-2">
    <div>
      <h2 className="mb-1 text-lg font-bold text-foreground">Kiểu chữ — Nunito Variable</h2>
      <p className="text-sm text-muted-foreground">
        <code>--font-sans: 'Nunito Variable'</code>. Đầy đủ dấu tiếng Việt.
      </p>
    </div>

    {/* Type scale */}
    <section className="space-y-4">
      <GroupLabel>Thang tiêu đề & thân</GroupLabel>
      <div className="space-y-3 border-l-2 border-border pl-4">
        <div>
          <p className="text-3xl font-bold text-foreground">Quản lý đơn hàng sỉ</p>
          <code className="text-xs text-muted-foreground">text-3xl font-bold</code>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">Chả lụa &amp; nem chua</p>
          <code className="text-xs text-muted-foreground">text-2xl font-bold</code>
        </div>
        <div>
          <p className="text-xl font-semibold text-foreground">Công nợ khách hàng</p>
          <code className="text-xs text-muted-foreground">text-xl font-semibold</code>
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">Chi tiết phiếu nhập kho</p>
          <code className="text-xs text-muted-foreground">text-lg font-semibold</code>
        </div>
        <div>
          <p className="text-base text-foreground">
            Đơn DH-2401 của Chị Lan · Quán bún, giao trước 8h sáng thứ Hai.
          </p>
          <code className="text-xs text-muted-foreground">text-base (body)</code>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Ghi chú: ưu tiên hàng tươi, gọi trước khi giao 15 phút.
          </p>
          <code className="text-xs text-muted-foreground">text-sm text-muted-foreground</code>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Cập nhật lúc 05/07/2026 · 07:42</p>
          <code className="text-xs text-muted-foreground">text-xs</code>
        </div>
      </div>
    </section>

    {/* Weights */}
    <section className="space-y-3">
      <GroupLabel>Độ đậm (Nunito)</GroupLabel>
      <div className="flex flex-wrap gap-6">
        <p className="text-lg font-normal text-foreground">Nem chua · 400</p>
        <p className="text-lg font-medium text-foreground">Nem chua · 500</p>
        <p className="text-lg font-semibold text-foreground">Nem chua · 600</p>
        <p className="text-lg font-bold text-foreground">Nem chua · 700</p>
      </div>
    </section>

    {/* Tabular numbers */}
    <section className="space-y-3">
      <GroupLabel>.font-tabular — số tiền / số lượng thẳng cột</GroupLabel>
      <div className="max-w-md space-y-4 rounded-lg border border-border bg-card p-4">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Không tabular (lệch cột):</p>
          <div className="space-y-0.5 text-right text-base text-foreground">
            <p>1.250.000₫</p>
            <p>980.000₫</p>
            <p>1.111.111₫</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">
            <code>font-tabular</code> (thẳng cột — dùng cho tiền/đếm):
          </p>
          <div className="space-y-0.5 text-right text-base font-tabular text-foreground">
            <p>1.250.000₫</p>
            <p>980.000₫</p>
            <p>1.111.111₫</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

/* ===========================================================================
   Radius & Elevation
   =========================================================================== */

export const RadiusAndElevation: Story = () => (
  <div className="max-w-4xl space-y-8 p-2">
    <div>
      <h2 className="mb-1 text-lg font-bold text-foreground">Bo góc &amp; đổ bóng</h2>
      <p className="text-sm text-muted-foreground">
        Bề mặt inline = phẳng + hairline (KHÔNG shadow). Shadow chỉ cho overlay nổi.
      </p>
    </div>

    {/* Radius */}
    <section className="space-y-3">
      <GroupLabel>Bo góc (radius)</GroupLabel>
      <div className="flex flex-wrap gap-4">
        <div className="w-40 space-y-1.5">
          <div className="flex h-20 items-center justify-center rounded-sm border border-border-strong bg-card text-sm text-muted-foreground">
            6px
          </div>
          <code className="text-xs font-semibold text-foreground">rounded-sm</code>
          <p className="text-xs text-muted-foreground">chips, badges</p>
        </div>
        <div className="w-40 space-y-1.5">
          <div className="flex h-20 items-center justify-center rounded-md border border-border-strong bg-card text-sm text-muted-foreground">
            8px
          </div>
          <code className="text-xs font-semibold text-foreground">rounded-md</code>
          <p className="text-xs text-muted-foreground">buttons, inputs</p>
        </div>
        <div className="w-40 space-y-1.5">
          <div className="flex h-20 items-center justify-center rounded-lg border border-border-strong bg-card text-sm text-muted-foreground">
            10px
          </div>
          <code className="text-xs font-semibold text-foreground">rounded-lg</code>
          <p className="text-xs text-muted-foreground">cards, panels, tables</p>
        </div>
        <div className="w-40 space-y-1.5">
          <div className="flex h-20 items-center justify-center rounded-xl border border-border-strong bg-card text-sm text-muted-foreground">
            12px
          </div>
          <code className="text-xs font-semibold text-foreground">rounded-xl</code>
          <p className="text-xs text-muted-foreground">modals (dialog/sheet)</p>
        </div>
      </div>
    </section>

    {/* Elevation */}
    <section className="space-y-3">
      <GroupLabel>Đổ bóng — CHỈ cho overlay (dropdown / dialog / toast)</GroupLabel>
      <div className="flex flex-wrap gap-6 rounded-lg bg-background p-6">
        <div className="w-52 space-y-2">
          <div className="rounded-lg bg-popover p-4 text-sm text-popover-foreground shadow-popover">
            <p className="font-medium">Menu thao tác</p>
            <p className="text-muted-foreground">Sửa · Nhân bản · Xoá</p>
          </div>
          <code className="text-xs font-semibold text-foreground">shadow-popover</code>
          <p className="text-xs text-muted-foreground">dropdown, popover</p>
        </div>
        <div className="w-52 space-y-2">
          <div className="rounded-xl bg-card p-4 text-sm text-card-foreground shadow-modal">
            <p className="font-medium">Xác nhận huỷ đơn?</p>
            <p className="text-muted-foreground">DH-2401 · Chị Lan</p>
          </div>
          <code className="text-xs font-semibold text-foreground">shadow-modal</code>
          <p className="text-xs text-muted-foreground">dialog, sheet</p>
        </div>
        <div className="w-52 space-y-2">
          <div className="rounded-lg bg-card p-4 text-sm text-card-foreground shadow-toast">
            <p className="font-medium text-success-text">Đã lưu đơn hàng</p>
            <p className="text-muted-foreground">DH-2402 · 1.250.000₫</p>
          </div>
          <code className="text-xs font-semibold text-foreground">shadow-toast</code>
          <p className="text-xs text-muted-foreground">toast (sonner)</p>
        </div>
      </div>
      <div className="rounded-md bg-warning-bg px-3 py-2 text-sm text-warning-text">
        Lưu ý: shadow chỉ dùng cho lớp nổi. Bề mặt inline (card, table, alert, input) luôn phẳng +
        hairline <code>border-border</code>.
      </div>
    </section>
  </div>
);

/* ===========================================================================
   Spacing
   =========================================================================== */

export const Spacing: Story = () => {
  const steps: { cls: string; label: string; px: string }[] = [
    { cls: 'w-1', label: '1', px: '4px' },
    { cls: 'w-2', label: '2', px: '8px' },
    { cls: 'w-3', label: '3', px: '12px' },
    { cls: 'w-4', label: '4', px: '16px' },
    { cls: 'w-6', label: '6', px: '24px' },
    { cls: 'w-8', label: '8', px: '32px' },
    { cls: 'w-12', label: '12', px: '48px' },
    { cls: 'w-16', label: '16', px: '64px' },
  ];

  return (
    <div className="max-w-3xl space-y-8 p-2">
      <div>
        <h2 className="mb-1 text-lg font-bold text-foreground">Khoảng cách (spacing)</h2>
        <p className="text-sm text-muted-foreground">
          Thang 4px của Tailwind. Dùng cho <code>gap-*</code>, <code>p-*</code>, <code>m-*</code>,{' '}
          <code>space-y-*</code>.
        </p>
      </div>

      {/* Scale ruler */}
      <section className="space-y-2">
        <GroupLabel>Thang cơ bản</GroupLabel>
        <div className="space-y-2">
          {steps.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <code className="w-10 text-right text-xs text-muted-foreground">{s.label}</code>
              <div className={`h-4 rounded-sm bg-primary ${s.cls}`} />
              <span className="text-xs text-muted-foreground">{s.px}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Common patterns */}
      <section className="space-y-3">
        <GroupLabel>Ứng dụng thường gặp</GroupLabel>

        <div className="space-y-1.5">
          <code className="text-xs text-muted-foreground">gap-3 — hàng nút / chip</code>
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3">
            <span className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground">
              Tạo đơn
            </span>
            <span className="rounded-md border border-border-strong bg-card px-3 py-1.5 text-sm text-foreground">
              Xuất Excel
            </span>
            <span className="rounded-sm bg-success-bg px-2 py-0.5 text-sm text-success-text">
              Đã thanh toán
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <code className="text-xs text-muted-foreground">p-4 + space-y-4 — thân card</code>
          <div className="max-w-md space-y-4 rounded-lg border border-border bg-card p-4">
            <div>
              <p className="text-sm font-semibold text-foreground">DH-2401 · Chị Lan · Quán bún</p>
              <p className="text-sm text-muted-foreground">Giao thứ Hai · 08:00</p>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Tổng cộng</span>
              <span className="text-base font-bold font-tabular text-foreground">1.250.000₫</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
