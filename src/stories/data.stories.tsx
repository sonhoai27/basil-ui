import type { Story } from '@ladle/react';
import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  Eye,
  Pencil,
  Trash2,
  Printer,
  Package,
  Wallet,
  TrendingUp,
  Users,
  CalendarClock,
} from 'lucide-react';

import {
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
  StatusPill,
  Pagination,
  Calendar,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  KpiCard,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Separator,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  Button,
  Badge,
} from '../index';

export default { title: 'Data Display' };

/* ------------------------------------------------------------------ */
/* Shared orders fixture                                              */
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

const ORDERS: OrderRow[] = [
  {
    code: 'DH-2401',
    customer: 'Chị Lan · Quán bún',
    channel: 'Zalo',
    items: 6,
    total: '1.250.000₫',
    totalRaw: 1250000,
    status: 'pending_payment',
    createdAt: '05/07 08:12',
  },
  {
    code: 'DH-2402',
    customer: 'Anh Dũng · Bếp ăn KCN',
    channel: 'Điện thoại',
    items: 12,
    total: '3.480.000₫',
    totalRaw: 3480000,
    status: 'paid',
    createdAt: '05/07 09:40',
  },
  {
    code: 'DH-2403',
    customer: 'Cô Bảy · Tạp hoá',
    channel: 'Zalo',
    items: 4,
    total: '640.000₫',
    totalRaw: 640000,
    status: 'packing',
    createdAt: '04/07 16:22',
  },
  {
    code: 'DH-2404',
    customer: 'Chị Hoa · Nhà hàng Sen',
    channel: 'Trực tiếp',
    items: 21,
    total: '7.920.000₫',
    totalRaw: 7920000,
    status: 'sent',
    createdAt: '04/07 11:05',
  },
  {
    code: 'DH-2405',
    customer: 'Anh Tài · Quán nhậu',
    channel: 'Zalo',
    items: 3,
    total: '520.000₫',
    totalRaw: 520000,
    status: 'cancelled',
    createdAt: '03/07 19:48',
  },
  {
    code: 'DH-2406',
    customer: 'Chị Mai · Bún đậu',
    channel: 'Điện thoại',
    items: 9,
    total: '2.150.000₫',
    totalRaw: 2150000,
    status: 'pending_payment',
    createdAt: '03/07 07:30',
  },
];

function orderColumns(): ColumnDef<OrderRow, unknown>[] {
  return [
    {
      accessorKey: 'code',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã đơn" />,
      cell: ({ row }) => (
        <span className="font-tabular font-medium text-foreground">{row.original.code}</span>
      ),
    },
    {
      accessorKey: 'customer',
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
      header: ({ column }) => <DataTableColumnHeader column={column} title="SL mặt hàng" />,
      cell: ({ row }) => (
        <span className="font-tabular text-muted-foreground">{row.original.items}</span>
      ),
    },
    {
      accessorKey: 'totalRaw',
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
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
      cell: ({ row }) => <StatusPill status={row.original.status} />,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tạo lúc" />,
      cell: ({ row }) => (
        <span className="font-tabular text-xs text-muted-foreground">{row.original.createdAt}</span>
      ),
    },
    {
      id: '__actions',
      enableSorting: false,
      header: () => <span className="sr-only">Hành động</span>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DataTableRowActions
            actions={[
              { label: 'Xem chi tiết', icon: <Eye className="size-4" />, onSelect: () => {} },
              { label: 'Sửa đơn', icon: <Pencil className="size-4" />, onSelect: () => {} },
              { label: 'In phiếu', icon: <Printer className="size-4" />, onSelect: () => {} },
              {
                label: 'Huỷ đơn',
                icon: <Trash2 className="size-4" />,
                onSelect: () => {},
                destructive: true,
              },
            ]}
          />
        </div>
      ),
    },
  ];
}

/* ------------------------------------------------------------------ */
/* DataTable — full featured                                         */
/* ------------------------------------------------------------------ */

export const DataTableStory: Story = () => {
  const columns = React.useMemo(orderColumns, []);
  return (
    <div className="max-w-5xl">
      <DataTable<OrderRow>
        columns={columns}
        data={ORDERS}
        getRowId={(r) => r.code}
        enableRowSelection
        initialSorting={[{ id: 'totalRaw', desc: true }]}
        onRowClick={() => {}}
        caption="Danh sách đơn hàng gần đây của Mộc Chính"
        aria-label="Đơn hàng"
        bulkActions={(selected, clear) => (
          <>
            <Button variant="outline" size="sm" onClick={clear}>
              Bỏ chọn
            </Button>
            <Button variant="outline" size="sm" leadingIcon={<Printer className="size-4" />}>
              In {selected.length} phiếu
            </Button>
            <Button variant="destructive" size="sm" leadingIcon={<Trash2 className="size-4" />}>
              Huỷ {selected.length} đơn
            </Button>
          </>
        )}
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Bấm tiêu đề cột để sắp xếp · tick chọn dòng để hiện thanh hành động hàng loạt.
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* DataTable — loading / empty / error                               */
/* ------------------------------------------------------------------ */

export const DataTableStates: Story = () => {
  const columns = React.useMemo(orderColumns, []);
  return (
    <div className="flex max-w-5xl flex-col gap-8">
      <section className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Đang tải
        </p>
        <DataTable<OrderRow> columns={columns} data={[]} isLoading aria-label="Đang tải đơn hàng" />
      </section>

      <section className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Rỗng</p>
        <DataTable<OrderRow>
          columns={columns}
          data={[]}
          emptyTitle="Chưa có đơn hàng"
          emptyDescription="Đơn mới sẽ xuất hiện tại đây khi khách đặt hàng."
          emptyAction={{ label: 'Tạo đơn thủ công', onClick: () => {} }}
          aria-label="Không có đơn hàng"
        />
      </section>

      <section className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Lỗi</p>
        <DataTable<OrderRow>
          columns={columns}
          data={[]}
          isError
          onRetry={() => {}}
          aria-label="Lỗi tải đơn hàng"
        />
      </section>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Low-level Table primitives                                         */
/* ------------------------------------------------------------------ */

export const BasicTable: Story = () => (
  <div className="max-w-2xl overflow-hidden rounded-lg border border-border bg-card">
    <Table aria-label="Bảng giá sản phẩm">
      <TableCaption className="sr-only">Bảng giá sỉ một số mặt hàng</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Sản phẩm</TableHead>
          <TableHead>Đơn vị</TableHead>
          <TableHead className="text-right">Giá sỉ</TableHead>
          <TableHead className="text-right">Tồn</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Chả lụa</TableCell>
          <TableCell className="text-muted-foreground">kg</TableCell>
          <TableCell className="text-right font-tabular">180.000₫</TableCell>
          <TableCell className="text-right font-tabular">42</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Nem chua</TableCell>
          <TableCell className="text-muted-foreground">chục</TableCell>
          <TableCell className="text-right font-tabular">55.000₫</TableCell>
          <TableCell className="text-right font-tabular">120</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Giò thủ</TableCell>
          <TableCell className="text-muted-foreground">kg</TableCell>
          <TableCell className="text-right font-tabular">160.000₫</TableCell>
          <TableCell className="text-right font-tabular">18</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={2}>Tổng tồn kho</TableCell>
          <TableCell className="text-right" />
          <TableCell className="text-right font-tabular">180</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
);

/* ------------------------------------------------------------------ */
/* Pagination                                                         */
/* ------------------------------------------------------------------ */

export const PaginationStory: Story = () => {
  const [page, setPage] = React.useState(3);
  return (
    <div className="max-w-md">
      <Pagination page={page} pageCount={12} onPageChange={setPage} />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Calendar                                                           */
/* ------------------------------------------------------------------ */

export const CalendarStory: Story = () => {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date(2026, 0, 15));
  return (
    <div className="w-fit rounded-lg border border-border bg-card">
      <Calendar mode="single" selected={selected} onSelect={setSelected} defaultMonth={new Date(2026, 0, 1)} />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Tabs                                                               */
/* ------------------------------------------------------------------ */

export const TabsStory: Story = () => (
  <div className="max-w-xl">
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">Tất cả</TabsTrigger>
        <TabsTrigger value="pending">Chờ thanh toán</TabsTrigger>
        <TabsTrigger value="sent">Đã gửi</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <p className="text-sm text-muted-foreground">
          Hiển thị toàn bộ đơn hàng trong ngày — 6 đơn, tổng 15.960.000₫.
        </p>
      </TabsContent>
      <TabsContent value="pending">
        <p className="text-sm text-muted-foreground">
          2 đơn đang chờ khách chuyển khoản (DH-2401, DH-2406).
        </p>
      </TabsContent>
      <TabsContent value="sent">
        <p className="text-sm text-muted-foreground">1 đơn đã giao cho nhà xe (DH-2404).</p>
      </TabsContent>
    </Tabs>
  </div>
);

/* ------------------------------------------------------------------ */
/* Accordion                                                          */
/* ------------------------------------------------------------------ */

export const AccordionStory: Story = () => (
  <div className="max-w-xl rounded-lg border border-border bg-card px-4">
    <Accordion type="single" collapsible defaultValue="ship">
      <AccordionItem value="ship">
        <AccordionTrigger>Bao lâu thì giao hàng?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Đơn chốt trước 15h được giao trong ngày nội thành. Đơn tỉnh gửi nhà xe, nhận sau 1–2 ngày.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="pay">
        <AccordionTrigger>Thanh toán bằng cách nào?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Chuyển khoản trước hoặc thanh toán khi nhận hàng (COD) với khách quen. Công nợ tối đa 7 ngày.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="min">
        <AccordionTrigger>Có đặt số lượng tối thiểu không?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Đơn sỉ tối thiểu 500.000₫. Dưới mức này tính theo giá lẻ.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

/* ------------------------------------------------------------------ */
/* Cards + KPI                                                         */
/* ------------------------------------------------------------------ */

export const CardsAndKpis: Story = () => (
  <div className="max-w-5xl space-y-8">
    <section className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">KpiCard</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Doanh thu hôm nay"
          value="15.960.000₫"
          tone="primary"
          featured
          icon={<Wallet className="size-5" />}
          trend={{ value: 12 }}
          hint="So với hôm qua"
        />
        <KpiCard
          label="Đơn mới"
          value={6}
          tone="success"
          icon={<Package className="size-5" />}
          trend={{ value: 3 }}
          hint="3 đơn chờ xử lý"
        />
        <KpiCard
          label="Công nợ khách"
          value="8.240.000₫"
          tone="warning"
          icon={<TrendingUp className="size-5" />}
          trend={{ value: 8, positive: false }}
          hint="5 khách còn nợ"
        />
        <KpiCard label="Đang tải" value="—" loading />
      </div>
    </section>

    <section className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Card</p>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Đơn DH-2404 · Nhà hàng Sen</CardTitle>
          <CardDescription>Đặt lúc 04/07 11:05 · 21 mặt hàng</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Trạng thái</span>
            <StatusPill status="sent" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Thành tiền</span>
            <span className="font-tabular font-semibold">7.920.000₫</span>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" size="sm">
            In phiếu
          </Button>
          <Button size="sm">Xem chi tiết</Button>
        </CardFooter>
      </Card>
    </section>
  </div>
);

/* ------------------------------------------------------------------ */
/* Avatar + Breadcrumb                                                */
/* ------------------------------------------------------------------ */

export const AvatarBreadcrumb: Story = () => (
  <div className="max-w-2xl space-y-8">
    <section className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Avatar</p>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src="https://i.pravatar.cc/80?img=47"
            alt="Chị Lan"
          />
          <AvatarFallback>CL</AvatarFallback>
        </Avatar>
        <Avatar>
          {/* no image → fallback initials */}
          <AvatarFallback className="bg-primary-subtle text-primary">AD</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">CB</AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <div className="text-sm font-medium">Cô Bảy · Tạp hoá</div>
            <div className="text-xs text-muted-foreground">Khách quen · nợ 640.000₫</div>
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Breadcrumb</p>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Tổng quan</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Đơn hàng</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>DH-2404</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </section>

    <section className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Thẻ nhân sự (Card + Avatar + Badge)
      </p>
      <Card className="flex max-w-sm items-center gap-3 p-4">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Anh Dũng" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div className="flex-1 leading-tight">
          <div className="text-sm font-medium">Anh Dũng</div>
          <div className="text-xs text-muted-foreground">Nhân viên kho</div>
        </div>
        <Badge variant="soft-success" size="sm">
          <Users className="size-3.5" />
          Đang ca
        </Badge>
      </Card>
    </section>

    <section className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Dòng lịch (icon + text)
      </p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarClock className="size-4" />
        Đợt nhập kho tiếp theo: 08/07/2026
      </div>
    </section>
  </div>
);
