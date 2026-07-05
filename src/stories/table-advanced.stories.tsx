import type { Story } from '@ladle/react';
import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';

import {
  DataTable,
  DataTableColumnHeader,
  EditableCell,
  SavedViews,
  StatusPill,
  type DataTableViewState,
  type SavedView,
} from '../index';

export default { title: 'Table · Advanced' };

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

/** vi-VN thousands grouping + ₫: 1250000 → "1.250.000 ₫". */
function formatVnd(n: number): string {
  return `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(n)} ₫`;
}

/* ------------------------------------------------------------------ */
/* 1 · EditableCell — standalone demos                                */
/* ------------------------------------------------------------------ */

const STATUS_OPTIONS = [
  { label: 'Chờ thanh toán', value: 'pending_payment' },
  { label: 'Đã thanh toán', value: 'paid' },
  { label: 'Đang đóng', value: 'packing' },
  { label: 'Đã gửi', value: 'sent' },
];

function Readout({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="mt-2 text-xs text-muted-foreground">
      {label}:{' '}
      <span className="font-tabular font-medium text-foreground">{value}</span>
    </div>
  );
}

function DemoCard({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-xs rounded-lg border border-border bg-card p-4">
      <div className="mb-1 text-sm font-medium text-foreground">{title}</div>
      <div className="mb-3 text-xs text-muted-foreground">{hint}</div>
      {children}
    </div>
  );
}

export const EditableCellStory: Story = () => {
  const [note, setNote] = React.useState<string>('Giao trước 9h sáng');
  const [qty, setQty] = React.useState<number>(12);
  const [price, setPrice] = React.useState<number>(185000);
  const [status, setStatus] = React.useState<string>('paid');

  return (
    <div className="flex max-w-4xl flex-wrap gap-4">
      <DemoCard title="Ghi chú (text)" hint="Bấm để sửa · Enter lưu · Esc huỷ">
        <EditableCell
          value={note}
          type="text"
          placeholder="Thêm ghi chú…"
          ariaLabel="Ghi chú đơn"
          onSave={(v) => setNote(String(v))}
        />
        <Readout label="Đã lưu" value={note || '—'} />
      </DemoCard>

      <DemoCard title="Số lượng (number)" hint="Chỉ nhận chữ số · canh phải">
        <EditableCell
          value={qty}
          type="number"
          align="right"
          ariaLabel="Số lượng"
          onSave={(v) => setQty(Number(v))}
        />
        <Readout label="Đã lưu" value={qty} />
      </DemoCard>

      <DemoCard title="Đơn giá (currency)" hint="Định dạng ₫ khi đọc">
        <EditableCell
          value={price}
          type="currency"
          ariaLabel="Đơn giá"
          onSave={(v) => setPrice(Number(v))}
        />
        <Readout label="Đã lưu" value={formatVnd(price)} />
      </DemoCard>

      <DemoCard title="Trạng thái (select)" hint="Bấm để mở danh sách">
        <EditableCell
          value={status}
          type="select"
          options={STATUS_OPTIONS}
          ariaLabel="Trạng thái đơn"
          onSave={(v) => setStatus(String(v))}
        />
        <Readout
          label="Đã lưu"
          value={STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status}
        />
      </DemoCard>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 2 · InlineEditTable — sửa SL/giá ngay trên bảng, thành tiền tự tính */
/* ------------------------------------------------------------------ */

interface LineItem {
  id: string;
  product: string;
  unit: string;
  qty: number;
  price: number;
}

const INITIAL_LINES: LineItem[] = [
  { id: 'sp-01', product: 'Nước mắm Nam Ngư 500ml', unit: 'chai', qty: 24, price: 32000 },
  { id: 'sp-02', product: 'Dầu ăn Tường An 1L', unit: 'chai', qty: 12, price: 48000 },
  { id: 'sp-03', product: 'Đường trắng Biên Hoà 1kg', unit: 'gói', qty: 30, price: 24500 },
  { id: 'sp-04', product: 'Bột ngọt Ajinomoto 400g', unit: 'gói', qty: 18, price: 41000 },
  { id: 'sp-05', product: 'Gạo ST25 túi 5kg', unit: 'túi', qty: 10, price: 165000 },
  { id: 'sp-06', product: 'Mì Hảo Hảo thùng 30 gói', unit: 'thùng', qty: 6, price: 108000 },
];

export const InlineEditTable: Story = () => {
  const [rows, setRows] = React.useState<LineItem[]>(INITIAL_LINES);

  const patch = React.useCallback(
    (id: string, next: Partial<LineItem>) => {
      setRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...next } : r)),
      );
    },
    [],
  );

  const columns = React.useMemo<ColumnDef<LineItem, unknown>[]>(
    () => [
      {
        accessorKey: 'product',
        header: 'Sản phẩm',
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-foreground">{row.original.product}</span>
            <span className="text-xs text-muted-foreground">
              Đơn vị: {row.original.unit}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'qty',
        header: () => <div className="text-right">Số lượng</div>,
        cell: ({ row }) => (
          <EditableCell
            value={row.original.qty}
            type="number"
            align="right"
            ariaLabel={`Số lượng ${row.original.product}`}
            onSave={(v) => patch(row.original.id, { qty: Number(v) })}
          />
        ),
      },
      {
        accessorKey: 'price',
        header: () => <div className="text-right">Đơn giá</div>,
        cell: ({ row }) => (
          <EditableCell
            value={row.original.price}
            type="currency"
            ariaLabel={`Đơn giá ${row.original.product}`}
            onSave={(v) => patch(row.original.id, { price: Number(v) })}
          />
        ),
      },
      {
        id: 'lineTotal',
        header: () => <div className="text-right">Thành tiền</div>,
        cell: ({ row }) => (
          <div className="text-right font-tabular font-medium tabular-nums text-foreground">
            {formatVnd(row.original.qty * row.original.price)}
          </div>
        ),
      },
    ],
    [patch],
  );

  const grandTotal = rows.reduce((sum, r) => sum + r.qty * r.price, 0);

  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-sm text-muted-foreground">
        Bấm vào ô <strong>Số lượng</strong> hoặc <strong>Đơn giá</strong> để sửa —
        cột <strong>Thành tiền</strong> tự tính lại.
      </p>
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(r) => r.id}
        aria-label="Chi tiết đơn hàng"
      />
      <div className="mt-3 flex justify-end text-sm">
        <span className="text-muted-foreground">Tổng cộng:&nbsp;</span>
        <span className="font-tabular font-semibold text-foreground">
          {formatVnd(grandTotal)}
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 3 · ResizableColumns — kéo giãn độ rộng cột                         */
/* ------------------------------------------------------------------ */

type OrderStatus = 'pending_payment' | 'paid' | 'packing' | 'sent';

interface OrderRow {
  code: string;
  customer: string;
  channel: string;
  total: number;
  status: OrderStatus;
}

const RESIZE_ORDERS: OrderRow[] = [
  { code: 'DH-2401', customer: 'Chị Lan · Quán bún', channel: 'Zalo', total: 1250000, status: 'pending_payment' },
  { code: 'DH-2402', customer: 'Anh Dũng · Bếp ăn KCN Sóng Thần', channel: 'Điện thoại', total: 3480000, status: 'paid' },
  { code: 'DH-2403', customer: 'Cô Bảy · Tạp hoá', channel: 'Zalo', total: 640000, status: 'packing' },
  { code: 'DH-2404', customer: 'Chị Hoa · Nhà hàng Sen', channel: 'Trực tiếp', total: 7920000, status: 'sent' },
  { code: 'DH-2405', customer: 'Anh Tài · Quán nhậu Bờ Kè', channel: 'Zalo', total: 520000, status: 'pending_payment' },
  { code: 'DH-2406', customer: 'Chị Mai · Bún đậu', channel: 'Điện thoại', total: 2150000, status: 'paid' },
  { code: 'DH-2407', customer: 'Chú Ba · Cơm tấm', channel: 'Zalo', total: 1680000, status: 'packing' },
];

export const ResizableColumns: Story = () => {
  const columns = React.useMemo<ColumnDef<OrderRow, unknown>[]>(
    () => [
      {
        accessorKey: 'code',
        header: 'Mã đơn',
        size: 90,
        minSize: 70,
        cell: ({ row }) => (
          <span className="font-tabular font-medium text-foreground">
            {row.original.code}
          </span>
        ),
      },
      {
        accessorKey: 'customer',
        header: 'Khách hàng',
        size: 200,
        minSize: 120,
        maxSize: 320,
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="truncate text-foreground">{row.original.customer}</span>
            <span className="text-xs text-muted-foreground">{row.original.channel}</span>
          </div>
        ),
      },
      {
        accessorKey: 'total',
        header: () => <div className="text-right">Tổng tiền</div>,
        size: 140,
        minSize: 110,
        cell: ({ row }) => (
          <div className="text-right font-tabular tabular-nums text-foreground">
            {formatVnd(row.original.total)}
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        size: 120,
        minSize: 100,
        cell: ({ row }) => <StatusPill status={row.original.status} />,
      },
    ],
    [],
  );

  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-sm text-muted-foreground">
        Rê chuột tới mép phải mỗi tiêu đề cột để thấy tay kéo — kéo để chỉnh độ rộng.
      </p>
      <DataTable
        columns={columns}
        data={RESIZE_ORDERS}
        enableColumnResizing
        getRowId={(r) => r.code}
        aria-label="Đơn hàng (kéo giãn cột)"
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 4 · SavedViewsStory — strip nối vào DataTable qua state/appliedView */
/* ------------------------------------------------------------------ */

const SEED_VIEWS: SavedView[] = [
  {
    id: 'v-unpaid',
    name: 'Chưa thu tiền',
  },
  {
    id: 'v-zalo',
    name: 'Đơn Zalo',
  },
];

// Preset snapshots gắn với các view seed ở trên.
const SEED_STATE: Record<string, DataTableViewState> = {
  'v-unpaid': {
    globalFilter: 'Chờ thanh toán',
    sorting: [{ id: 'total', desc: true }],
  },
  'v-zalo': {
    globalFilter: 'Zalo',
    sorting: [{ id: 'code', desc: false }],
  },
};

interface SvOrderRow {
  code: string;
  customer: string;
  channel: string;
  total: number;
  status: string;
}

const SV_ORDERS: SvOrderRow[] = [
  { code: 'DH-2401', customer: 'Chị Lan · Quán bún', channel: 'Zalo', total: 1250000, status: 'Chờ thanh toán' },
  { code: 'DH-2402', customer: 'Anh Dũng · Bếp ăn KCN', channel: 'Điện thoại', total: 3480000, status: 'Đã thanh toán' },
  { code: 'DH-2403', customer: 'Cô Bảy · Tạp hoá', channel: 'Zalo', total: 640000, status: 'Đang đóng' },
  { code: 'DH-2404', customer: 'Chị Hoa · Nhà hàng Sen', channel: 'Trực tiếp', total: 7920000, status: 'Đã gửi' },
  { code: 'DH-2405', customer: 'Anh Tài · Quán nhậu', channel: 'Zalo', total: 520000, status: 'Chờ thanh toán' },
  { code: 'DH-2406', customer: 'Chị Mai · Bún đậu', channel: 'Điện thoại', total: 2150000, status: 'Chờ thanh toán' },
  { code: 'DH-2407', customer: 'Chú Ba · Cơm tấm', channel: 'Zalo', total: 1680000, status: 'Đã thanh toán' },
  { code: 'DH-2408', customer: 'Chị Thu · Quán phở', channel: 'Trực tiếp', total: 4320000, status: 'Đã gửi' },
];

export const SavedViewsStory: Story = () => {
  const [views, setViews] = React.useState<SavedView[]>(SEED_VIEWS);
  // Bảng tra id → snapshot; các view do người dùng tạo mới được thêm vào đây.
  const [viewState, setViewState] = React.useState<Record<string, DataTableViewState>>(
    SEED_STATE,
  );
  const [activeId, setActiveId] = React.useState<string>('');

  // Snapshot trạng thái bảng hiện tại (để lưu thành view mới).
  const snapshotRef = React.useRef<DataTableViewState>({});
  // appliedView đổi tham chiếu → DataTable áp lại trạng thái.
  const [appliedView, setAppliedView] = React.useState<DataTableViewState | undefined>(
    undefined,
  );

  const applyView = (id: string) => {
    setActiveId(id);
    if (!id) {
      // "Tất cả" → xoá lọc/sort.
      setAppliedView({ globalFilter: '', sorting: [], columnFilters: [] });
      return;
    }
    setAppliedView({ ...(viewState[id] ?? {}) });
  };

  const saveNew = (name: string) => {
    const id = `v-${views.length + 1}-${name.replace(/\s+/g, '-').toLowerCase()}`;
    const snapshot = { ...snapshotRef.current };
    setViewState((prev) => ({ ...prev, [id]: snapshot }));
    setViews((prev) => [...prev, { id, name }]);
    setActiveId(id);
  };

  const deleteView = (id: string) => {
    setViews((prev) => prev.filter((v) => v.id !== id));
    setViewState((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (activeId === id) {
      setActiveId('');
      setAppliedView({ globalFilter: '', sorting: [], columnFilters: [] });
    }
  };

  const columns = React.useMemo<ColumnDef<SvOrderRow, unknown>[]>(
    () => [
      {
        accessorKey: 'code',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Mã đơn" />,
        cell: ({ row }) => (
          <span className="font-tabular font-medium text-foreground">
            {row.original.code}
          </span>
        ),
      },
      {
        accessorKey: 'customer',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Khách hàng" />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-foreground">{row.original.customer}</span>
            <span className="text-xs text-muted-foreground">{row.original.channel}</span>
          </div>
        ),
      },
      {
        accessorKey: 'total',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tổng tiền" className="justify-end" />
        ),
        cell: ({ row }) => (
          <div className="text-right font-tabular tabular-nums text-foreground">
            {formatVnd(row.original.total)}
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">{row.original.status}</span>
        ),
      },
    ],
    [],
  );

  return (
    <div className="max-w-3xl">
      <SavedViews
        views={views}
        activeId={activeId}
        onSelect={applyView}
        onSaveNew={saveNew}
        onRename={(id, name) =>
          setViews((prev) => prev.map((v) => (v.id === id ? { ...v, name } : v)))
        }
        onDelete={deleteView}
        allLabel="Tất cả"
        className="mb-3"
      />
      <DataTable
        columns={columns}
        data={SV_ORDERS}
        searchable
        searchPlaceholder="Tìm đơn, khách, trạng thái…"
        getRowId={(r) => r.code}
        appliedView={appliedView}
        onStateChange={(state) => {
          snapshotRef.current = state;
        }}
        aria-label="Đơn hàng (saved views)"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Tìm kiếm + sắp xếp, rồi bấm <strong>“+ Lưu bộ lọc hiện tại”</strong> để lưu thành
        view mới. Chọn <strong>“Tất cả”</strong> để bỏ lọc.
      </p>
    </div>
  );
};
