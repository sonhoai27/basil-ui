import type { Story } from '@ladle/react';
import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Download } from 'lucide-react';

import {
  DataTable,
  DataTableFacetedFilter,
  DataTableColumnHeader,
  StatusPill,
  Button,
  downloadCsv,
} from '../index';

export default { title: 'DataTable · Depth' };

/* ------------------------------------------------------------------ */
/* Shared orders fixture — ~12 dòng đơn hàng thật của Mộc Chính        */
/* ------------------------------------------------------------------ */

type OrderStatus = 'pending_payment' | 'paid' | 'packing' | 'sent' | 'cancelled';

interface OrderRow {
  code: string;
  customer: string;
  channel: string;
  items: number;
  total: string;
  totalRaw: number;
  status: OrderStatus;
  createdAt: string;
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending_payment: 'Chờ thanh toán',
  paid: 'Đã thanh toán',
  packing: 'Đang đóng',
  sent: 'Đã gửi',
  cancelled: 'Đã huỷ',
};

const ORDERS: OrderRow[] = [
  { code: 'DH-2401', customer: 'Chị Lan · Quán bún',    channel: 'Zalo',       items: 6,  total: '1.250.000₫', totalRaw: 1250000, status: 'pending_payment', createdAt: '05/07 08:12' },
  { code: 'DH-2402', customer: 'Anh Dũng · Bếp ăn KCN', channel: 'Điện thoại', items: 12, total: '3.480.000₫', totalRaw: 3480000, status: 'paid',            createdAt: '05/07 09:40' },
  { code: 'DH-2403', customer: 'Cô Bảy · Tạp hoá',      channel: 'Zalo',       items: 4,  total: '640.000₫',   totalRaw: 640000,  status: 'packing',         createdAt: '04/07 16:22' },
  { code: 'DH-2404', customer: 'Chị Hoa · Nhà hàng Sen', channel: 'Trực tiếp', items: 21, total: '7.920.000₫', totalRaw: 7920000, status: 'sent',            createdAt: '04/07 11:05' },
  { code: 'DH-2405', customer: 'Anh Tài · Quán nhậu',   channel: 'Zalo',       items: 3,  total: '520.000₫',   totalRaw: 520000,  status: 'cancelled',       createdAt: '03/07 19:48' },
  { code: 'DH-2406', customer: 'Chị Mai · Bún đậu',     channel: 'Điện thoại', items: 9,  total: '2.150.000₫', totalRaw: 2150000, status: 'pending_payment', createdAt: '03/07 07:30' },
  { code: 'DH-2407', customer: 'Chú Ba · Cơm tấm',      channel: 'Zalo',       items: 7,  total: '1.680.000₫', totalRaw: 1680000, status: 'paid',            createdAt: '02/07 10:15' },
  { code: 'DH-2408', customer: 'Chị Thu · Quán phở',    channel: 'Trực tiếp',  items: 15, total: '4.320.000₫', totalRaw: 4320000, status: 'sent',            createdAt: '02/07 08:50' },
  { code: 'DH-2409', customer: 'Anh Nam · Quán nhậu 2', channel: 'Điện thoại', items: 5,  total: '990.000₫',   totalRaw: 990000,  status: 'packing',         createdAt: '01/07 17:33' },
  { code: 'DH-2410', customer: 'Cô Tám · Bánh cuốn',    channel: 'Zalo',       items: 8,  total: '1.840.000₫', totalRaw: 1840000, status: 'paid',            createdAt: '01/07 09:02' },
  { code: 'DH-2411', customer: 'Chị Yến · Bếp trường',  channel: 'Trực tiếp',  items: 30, total: '9.560.000₫', totalRaw: 9560000, status: 'pending_payment', createdAt: '30/06 14:20' },
  { code: 'DH-2412', customer: 'Anh Phú · Quán ốc',     channel: 'Zalo',       items: 4,  total: '760.000₫',   totalRaw: 760000,  status: 'cancelled',       createdAt: '30/06 20:11' },
];

/* ------------------------------------------------------------------ */
/* Columns — meta.label trên cột ẩn được, header sort, StatusPill      */
/* ------------------------------------------------------------------ */

function orderColumns(): ColumnDef<OrderRow, unknown>[] {
  return [
    {
      accessorKey: 'code',
      meta: { label: 'Mã đơn' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã đơn" />,
      cell: ({ row }) => (
        <span className="font-tabular font-medium text-foreground">{row.original.code}</span>
      ),
    },
    {
      accessorKey: 'customer',
      meta: { label: 'Khách hàng' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Khách hàng" />,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-foreground">{row.original.customer}</span>
          <span className="text-xs text-muted-foreground">{row.original.channel}</span>
        </div>
      ),
    },
    {
      accessorKey: 'items',
      meta: { label: 'SL mặt hàng' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="SL mặt hàng" />,
      cell: ({ row }) => (
        <span className="font-tabular tabular-nums text-muted-foreground">{row.original.items}</span>
      ),
    },
    {
      accessorKey: 'totalRaw',
      meta: { label: 'Thành tiền' },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Thành tiền" className="justify-end" />
      ),
      cell: ({ row }) => (
        <div className="text-right font-tabular font-medium tabular-nums text-foreground">
          {row.original.total}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      meta: { label: 'Trạng thái' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
      cell: ({ row }) => <StatusPill status={row.original.status} />,
    },
    {
      accessorKey: 'createdAt',
      meta: { label: 'Tạo lúc' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tạo lúc" />,
      cell: ({ row }) => (
        <span className="font-tabular text-xs text-muted-foreground">{row.original.createdAt}</span>
      ),
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Density + column visibility + page-size + rowCount                 */
/* ------------------------------------------------------------------ */

export const DensityAndColumns: Story = () => {
  const columns = React.useMemo(orderColumns, []);
  return (
    <div className="max-w-5xl">
      <DataTable<OrderRow>
        columns={columns}
        data={ORDERS}
        getRowId={(r) => r.code}
        density="compact"
        enableColumnVisibility
        pageSize={5}
        pageSizeOptions={[5, 10, 20]}
        rowCount={ORDERS.length}
        initialSorting={[{ id: 'totalRaw', desc: true }]}
        aria-label="Đơn hàng (mật độ gọn)"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Mật độ gọn (compact) · nút “Cột” ẩn/hiện cột · đổi số dòng mỗi trang 5 / 10 / 20.
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Sticky header — cuộn dọc trong maxHeight, header dính              */
/* ------------------------------------------------------------------ */

export const StickyHeader: Story = () => {
  const columns = React.useMemo(orderColumns, []);
  return (
    <div className="max-w-5xl">
      <DataTable<OrderRow>
        columns={columns}
        data={ORDERS}
        getRowId={(r) => r.code}
        maxHeight={320}
        pageSize={20}
        aria-label="Đơn hàng (header dính khi cuộn)"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Cuộn danh sách trong khung cao 320px — hàng tiêu đề luôn ghim trên cùng.
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* CSV export — toolbar với nút “Xuất CSV”                            */
/* ------------------------------------------------------------------ */

export const WithCsvExport: Story = () => {
  const columns = React.useMemo(orderColumns, []);
  const handleExport = React.useCallback(() => {
    downloadCsv<OrderRow>('don-hang', ORDERS, [
      { header: 'Mã đơn', value: (r) => r.code },
      { header: 'Khách hàng', value: (r) => r.customer },
      { header: 'Kênh', value: (r) => r.channel },
      { header: 'SL mặt hàng', value: (r) => r.items },
      { header: 'Thành tiền', value: (r) => r.totalRaw },
      { header: 'Trạng thái', value: (r) => STATUS_LABEL[r.status] },
      { header: 'Tạo lúc', value: (r) => r.createdAt },
    ]);
  }, []);

  const toolbar = (
    <div className="flex items-center justify-between gap-3">
      <div className="leading-tight">
        <div className="text-sm font-medium text-foreground">Đơn hàng gần đây</div>
        <div className="text-xs text-muted-foreground">{ORDERS.length} đơn · tải về file Excel</div>
      </div>
      <Button
        variant="outline"
        size="sm"
        leadingIcon={<Download className="size-4" />}
        onClick={handleExport}
      >
        Xuất CSV
      </Button>
    </div>
  );

  return (
    <div className="max-w-5xl">
      <DataTable<OrderRow>
        columns={columns}
        data={ORDERS}
        getRowId={(r) => r.code}
        toolbar={toolbar}
        pageSize={20}
        rowCount={ORDERS.length}
        aria-label="Đơn hàng (có xuất CSV)"
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Wide dataset — pin cột đầu, tìm kiếm chung, faceted filter,        */
/* mật độ, chọn dòng + chọn-tất-cả-xuyên-trang                        */
/* ------------------------------------------------------------------ */

interface WideOrderRow extends OrderRow {
  salesperson: string;
  district: string;
  paymentMethod: string;
  note: string;
  deliveryAt: string;
}

const WIDE_ORDERS: WideOrderRow[] = [
  { code: 'DH-2401', customer: 'Chị Lan · Quán bún',    channel: 'Zalo',       items: 6,  total: '1.250.000₫', totalRaw: 1250000, status: 'pending_payment', createdAt: '05/07 08:12', salesperson: 'Ngọc',  district: 'Q. Gò Vấp',     paymentMethod: 'Chuyển khoản', note: 'Giao trước 10h',        deliveryAt: '05/07 09:30' },
  { code: 'DH-2402', customer: 'Anh Dũng · Bếp ăn KCN', channel: 'Điện thoại', items: 12, total: '3.480.000₫', totalRaw: 3480000, status: 'paid',            createdAt: '05/07 09:40', salesperson: 'Hùng',  district: 'H. Bình Chánh',  paymentMethod: 'Tiền mặt',     note: 'Xuất hoá đơn VAT',      deliveryAt: '05/07 14:00' },
  { code: 'DH-2403', customer: 'Cô Bảy · Tạp hoá',      channel: 'Zalo',       items: 4,  total: '640.000₫',   totalRaw: 640000,  status: 'packing',         createdAt: '04/07 16:22', salesperson: 'Ngọc',  district: 'Q. Tân Bình',    paymentMethod: 'COD',          note: 'Gọi trước khi giao',    deliveryAt: '05/07 08:00' },
  { code: 'DH-2404', customer: 'Chị Hoa · Nhà hàng Sen', channel: 'Trực tiếp', items: 21, total: '7.920.000₫', totalRaw: 7920000, status: 'sent',            createdAt: '04/07 11:05', salesperson: 'Trang', district: 'Q.1',            paymentMethod: 'Chuyển khoản', note: 'Đơn định kỳ tuần',      deliveryAt: '04/07 15:30' },
  { code: 'DH-2405', customer: 'Anh Tài · Quán nhậu',   channel: 'Zalo',       items: 3,  total: '520.000₫',   totalRaw: 520000,  status: 'cancelled',       createdAt: '03/07 19:48', salesperson: 'Hùng',  district: 'Q. Bình Thạnh',  paymentMethod: 'COD',          note: 'Khách huỷ do trùng',    deliveryAt: '—' },
  { code: 'DH-2406', customer: 'Chị Mai · Bún đậu',     channel: 'Điện thoại', items: 9,  total: '2.150.000₫', totalRaw: 2150000, status: 'pending_payment', createdAt: '03/07 07:30', salesperson: 'Trang', district: 'Q. Phú Nhuận',   paymentMethod: 'Chuyển khoản', note: 'Chờ chuyển cọc',        deliveryAt: '03/07 11:00' },
  { code: 'DH-2407', customer: 'Chú Ba · Cơm tấm',      channel: 'Zalo',       items: 7,  total: '1.680.000₫', totalRaw: 1680000, status: 'paid',            createdAt: '02/07 10:15', salesperson: 'Ngọc',  district: 'Q.12',           paymentMethod: 'Tiền mặt',     note: 'Giao kèm hoá đơn',      deliveryAt: '02/07 13:00' },
  { code: 'DH-2408', customer: 'Chị Thu · Quán phở',    channel: 'Trực tiếp',  items: 15, total: '4.320.000₫', totalRaw: 4320000, status: 'sent',            createdAt: '02/07 08:50', salesperson: 'Hùng',  district: 'TP. Thủ Đức',    paymentMethod: 'Chuyển khoản', note: 'Đã gửi qua tài xế Nam',  deliveryAt: '02/07 12:15' },
  { code: 'DH-2409', customer: 'Anh Nam · Quán nhậu 2', channel: 'Điện thoại', items: 5,  total: '990.000₫',   totalRaw: 990000,  status: 'packing',         createdAt: '01/07 17:33', salesperson: 'Trang', district: 'Q. Tân Phú',     paymentMethod: 'COD',          note: 'Đóng thêm đá khô',      deliveryAt: '02/07 07:30' },
  { code: 'DH-2410', customer: 'Cô Tám · Bánh cuốn',    channel: 'Zalo',       items: 8,  total: '1.840.000₫', totalRaw: 1840000, status: 'paid',            createdAt: '01/07 09:02', salesperson: 'Ngọc',  district: 'Q. Gò Vấp',     paymentMethod: 'Chuyển khoản', note: 'Khách quen ưu tiên',    deliveryAt: '01/07 11:30' },
  { code: 'DH-2411', customer: 'Chị Yến · Bếp trường',  channel: 'Trực tiếp',  items: 30, total: '9.560.000₫', totalRaw: 9560000, status: 'pending_payment', createdAt: '30/06 14:20', salesperson: 'Trang', district: 'H. Hóc Môn',     paymentMethod: 'Chuyển khoản', note: 'Đơn lớn, chia 2 chuyến', deliveryAt: '01/07 06:30' },
  { code: 'DH-2412', customer: 'Anh Phú · Quán ốc',     channel: 'Zalo',       items: 4,  total: '760.000₫',   totalRaw: 760000,  status: 'cancelled',       createdAt: '30/06 20:11', salesperson: 'Hùng',  district: 'Q.4',            paymentMethod: 'COD',          note: 'Hết hàng, hẹn đơn sau',  deliveryAt: '—' },
  { code: 'DH-2413', customer: 'Chị Vân · Lẩu dê',      channel: 'Điện thoại', items: 11, total: '2.980.000₫', totalRaw: 2980000, status: 'paid',            createdAt: '29/06 15:47', salesperson: 'Ngọc',  district: 'Q. Bình Tân',    paymentMethod: 'Chuyển khoản', note: 'Giao chiều mai',        deliveryAt: '30/06 16:00' },
  { code: 'DH-2414', customer: 'Anh Khoa · Buffet ốc',  channel: 'Trực tiếp',  items: 18, total: '5.240.000₫', totalRaw: 5240000, status: 'sent',            createdAt: '29/06 09:18', salesperson: 'Trang', district: 'TP. Thủ Đức',    paymentMethod: 'Chuyển khoản', note: 'Kèm khuyến mãi tháng',   deliveryAt: '29/06 13:45' },
];

const STATUS_OPTIONS = (Object.keys(STATUS_LABEL) as OrderStatus[]).map((value) => ({
  label: STATUS_LABEL[value],
  value,
}));

function wideOrderColumns(): ColumnDef<WideOrderRow, unknown>[] {
  return [
    {
      accessorKey: 'code',
      meta: { label: 'Mã đơn' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã đơn" />,
      cell: ({ row }) => (
        <span className="font-tabular font-medium text-foreground whitespace-nowrap">
          {row.original.code}
        </span>
      ),
    },
    {
      accessorKey: 'customer',
      meta: { label: 'Khách hàng' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Khách hàng" />,
      cell: ({ row }) => (
        <div className="flex flex-col whitespace-nowrap">
          <span className="text-foreground">{row.original.customer}</span>
          <span className="text-xs text-muted-foreground">{row.original.channel}</span>
        </div>
      ),
    },
    {
      accessorKey: 'salesperson',
      meta: { label: 'Nhân viên' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nhân viên" />,
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-muted-foreground">{row.original.salesperson}</span>
      ),
    },
    {
      accessorKey: 'district',
      meta: { label: 'Khu vực' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Khu vực" />,
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-muted-foreground">{row.original.district}</span>
      ),
    },
    {
      accessorKey: 'items',
      meta: { label: 'SL mặt hàng' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="SL mặt hàng" />,
      cell: ({ row }) => (
        <span className="font-tabular tabular-nums text-muted-foreground">{row.original.items}</span>
      ),
    },
    {
      accessorKey: 'totalRaw',
      meta: { label: 'Thành tiền' },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Thành tiền" className="justify-end" />
      ),
      cell: ({ row }) => (
        <div className="text-right font-tabular font-medium tabular-nums text-foreground whitespace-nowrap">
          {row.original.total}
        </div>
      ),
    },
    {
      accessorKey: 'paymentMethod',
      meta: { label: 'Thanh toán' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Thanh toán" />,
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-muted-foreground">{row.original.paymentMethod}</span>
      ),
    },
    {
      accessorKey: 'status',
      meta: { label: 'Trạng thái' },
      // Faceted filter cần filterFn nhận mảng giá trị đã chọn.
      filterFn: (row, id, val) => (val as string[]).includes(row.getValue(id)),
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
      cell: ({ row }) => <StatusPill status={row.original.status} />,
    },
    {
      accessorKey: 'note',
      meta: { label: 'Ghi chú' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ghi chú" />,
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-muted-foreground">{row.original.note}</span>
      ),
    },
    {
      accessorKey: 'deliveryAt',
      meta: { label: 'Hẹn giao' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Hẹn giao" />,
      cell: ({ row }) => (
        <span className="font-tabular whitespace-nowrap text-xs text-muted-foreground">
          {row.original.deliveryAt}
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      meta: { label: 'Tạo lúc' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tạo lúc" />,
      cell: ({ row }) => (
        <span className="font-tabular whitespace-nowrap text-xs text-muted-foreground">
          {row.original.createdAt}
        </span>
      ),
    },
  ];
}

export const PinnedSearchFaceted: Story = () => {
  const columns = React.useMemo(wideOrderColumns, []);
  return (
    <div className="max-w-4xl">
      <DataTable<WideOrderRow>
        columns={columns}
        data={WIDE_ORDERS}
        getRowId={(r) => r.code}
        pinFirstColumn
        searchable
        searchPlaceholder="Tìm mã đơn, khách, ghi chú…"
        densityToggle
        enableRowSelection
        pageSize={5}
        pageSizeOptions={[5, 10]}
        rowCount={WIDE_ORDERS.length}
        toolbar={(table) => (
          <DataTableFacetedFilter
            column={table.getColumn('status')!}
            title="Trạng thái"
            options={STATUS_OPTIONS}
          />
        )}
        bulkActions={(selected, clear) => (
          <>
            <Button variant="outline" size="sm" onClick={clear}>
              Bỏ chọn
            </Button>
            <Button variant="default" size="sm">
              In {selected.length} phiếu giao
            </Button>
          </>
        )}
        aria-label="Đơn hàng (nhiều cột, ghim cột đầu)"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Bảng rộng — cuộn ngang để thấy cột <strong>Mã đơn</strong> (và ô chọn) ghim bên trái. Ô tìm
        kiếm lọc client, nút <strong>Thoáng/Gọn</strong> đổi mật độ, chip <strong>Trạng thái</strong>{' '}
        lọc theo facet. Chọn hết một trang (5 dòng) để hiện nút “Chọn tất cả {WIDE_ORDERS.length}”.
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Filtered-empty — gõ từ khoá không khớp → trạng thái “Xoá bộ lọc”   */
/* ------------------------------------------------------------------ */

export const FilteredEmpty: Story = () => {
  const columns = React.useMemo(orderColumns, []);
  return (
    <div className="max-w-3xl">
      <DataTable<OrderRow>
        columns={columns}
        data={ORDERS.slice(0, 5)}
        getRowId={(r) => r.code}
        searchable
        searchPlaceholder="Tìm mã đơn hoặc khách…"
        pageSize={5}
        aria-label="Đơn hàng (trạng thái rỗng khi lọc)"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Gõ một từ khoá không có trong danh sách (ví dụ <code>“xyz”</code>) để thấy trạng thái rỗng
        do lọc với nút <strong>Xoá bộ lọc</strong> — khác với empty “Không có dữ liệu”.
      </p>
    </div>
  );
};
