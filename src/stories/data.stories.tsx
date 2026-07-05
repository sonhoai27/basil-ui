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
    code: 'ORD-2401',
    customer: 'Emma Carter · The Noodle Bar',
    channel: 'Chat',
    items: 6,
    total: '$1,250.00',
    totalRaw: 1250000,
    status: 'pending_payment',
    createdAt: 'Jul 05, 08:12',
  },
  {
    code: 'ORD-2402',
    customer: 'Daniel Reed · Industrial Canteen',
    channel: 'Phone',
    items: 12,
    total: '$3,480.00',
    totalRaw: 3480000,
    status: 'paid',
    createdAt: 'Jul 05, 09:40',
  },
  {
    code: 'ORD-2403',
    customer: 'Betty Shaw · Corner Store',
    channel: 'Chat',
    items: 4,
    total: '$640.00',
    totalRaw: 640000,
    status: 'packing',
    createdAt: 'Jul 04, 16:22',
  },
  {
    code: 'ORD-2404',
    customer: 'Hannah Lotus · Lotus Restaurant',
    channel: 'In person',
    items: 21,
    total: '$7,920.00',
    totalRaw: 7920000,
    status: 'sent',
    createdAt: 'Jul 04, 11:05',
  },
  {
    code: 'ORD-2405',
    customer: 'Tony Rivers · The Tavern',
    channel: 'Chat',
    items: 3,
    total: '$520.00',
    totalRaw: 520000,
    status: 'cancelled',
    createdAt: 'Jul 03, 19:48',
  },
  {
    code: 'ORD-2406',
    customer: 'May Nguyen · Bun Dau Diner',
    channel: 'Phone',
    items: 9,
    total: '$2,150.00',
    totalRaw: 2150000,
    status: 'pending_payment',
    createdAt: 'Jul 03, 07:30',
  },
];

function orderColumns(): ColumnDef<OrderRow, unknown>[] {
  return [
    {
      accessorKey: 'code',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Order #" />,
      cell: ({ row }) => (
        <span className="font-tabular font-medium text-foreground">{row.original.code}</span>
      ),
    },
    {
      accessorKey: 'customer',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-foreground">{row.original.customer}</span>
          <span className="text-xs text-muted-foreground">{row.original.channel}</span>
        </div>
      ),
    },
    {
      accessorKey: 'items',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Items" />,
      cell: ({ row }) => (
        <span className="font-tabular text-muted-foreground">{row.original.items}</span>
      ),
    },
    {
      accessorKey: 'totalRaw',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total" className="justify-end" />
      ),
      cell: ({ row }) => (
        <div className="text-right font-tabular font-medium tabular-nums text-foreground">
          {row.original.total}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => <StatusPill status={row.original.status} />,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
      cell: ({ row }) => (
        <span className="font-tabular text-xs text-muted-foreground">{row.original.createdAt}</span>
      ),
    },
    {
      id: '__actions',
      enableSorting: false,
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DataTableRowActions
            actions={[
              { label: 'View details', icon: <Eye className="size-4" />, onSelect: () => {} },
              { label: 'Edit order', icon: <Pencil className="size-4" />, onSelect: () => {} },
              { label: 'Print slip', icon: <Printer className="size-4" />, onSelect: () => {} },
              {
                label: 'Cancel order',
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
        caption="Recent orders"
        aria-label="Orders"
        bulkActions={(selected, clear) => (
          <>
            <Button variant="outline" size="sm" onClick={clear}>
              Clear selection
            </Button>
            <Button variant="outline" size="sm" leadingIcon={<Printer className="size-4" />}>
              Print {selected.length} slips
            </Button>
            <Button variant="destructive" size="sm" leadingIcon={<Trash2 className="size-4" />}>
              Cancel {selected.length} orders
            </Button>
          </>
        )}
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Click a column header to sort · tick rows to reveal the bulk-action bar.
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
          Loading
        </p>
        <DataTable<OrderRow> columns={columns} data={[]} isLoading aria-label="Loading orders" />
      </section>

      <section className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Empty</p>
        <DataTable<OrderRow>
          columns={columns}
          data={[]}
          emptyTitle="No orders yet"
          emptyDescription="New orders will show up here once customers place them."
          emptyAction={{ label: 'Create order manually', onClick: () => {} }}
          aria-label="No orders"
        />
      </section>

      <section className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Error</p>
        <DataTable<OrderRow>
          columns={columns}
          data={[]}
          isError
          onRetry={() => {}}
          aria-label="Failed to load orders"
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
    <Table aria-label="Product price list">
      <TableCaption className="sr-only">Wholesale price list for selected products</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Product</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead className="text-right">Wholesale price</TableHead>
          <TableHead className="text-right">Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Pork Ham</TableCell>
          <TableCell className="text-muted-foreground">kg</TableCell>
          <TableCell className="text-right font-tabular">$18.00</TableCell>
          <TableCell className="text-right font-tabular">42</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Fermented Pork Roll</TableCell>
          <TableCell className="text-muted-foreground">dozen</TableCell>
          <TableCell className="text-right font-tabular">$5.50</TableCell>
          <TableCell className="text-right font-tabular">120</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Head Cheese</TableCell>
          <TableCell className="text-muted-foreground">kg</TableCell>
          <TableCell className="text-right font-tabular">$16.00</TableCell>
          <TableCell className="text-right font-tabular">18</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={2}>Total stock</TableCell>
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
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending">Pending payment</TabsTrigger>
        <TabsTrigger value="sent">Sent</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <p className="text-sm text-muted-foreground">
          Showing all orders for the day — 6 orders, $15,960.00 total.
        </p>
      </TabsContent>
      <TabsContent value="pending">
        <p className="text-sm text-muted-foreground">
          2 orders awaiting bank transfer (ORD-2401, ORD-2406).
        </p>
      </TabsContent>
      <TabsContent value="sent">
        <p className="text-sm text-muted-foreground">1 order handed to the carrier (ORD-2404).</p>
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
        <AccordionTrigger>How long does delivery take?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Orders confirmed before 3pm ship same day within the city. Out-of-town orders go by carrier and arrive in 1–2 days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="pay">
        <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Bank transfer up front, or cash on delivery (COD) for regular customers. Credit terms up to 7 days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="min">
        <AccordionTrigger>Is there a minimum order quantity?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Wholesale orders start at $500.00. Below that, retail pricing applies.
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
          label="Revenue today"
          value="$15,960.00"
          tone="primary"
          featured
          icon={<Wallet className="size-5" />}
          trend={{ value: 12 }}
          hint="vs. yesterday"
        />
        <KpiCard
          label="New orders"
          value={6}
          tone="success"
          icon={<Package className="size-5" />}
          trend={{ value: 3 }}
          hint="3 orders pending"
        />
        <KpiCard
          label="Customer balance"
          value="$8,240.00"
          tone="warning"
          icon={<TrendingUp className="size-5" />}
          trend={{ value: 8, positive: false }}
          hint="5 customers owe"
        />
        <KpiCard label="Loading" value="—" loading />
      </div>
    </section>

    <section className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Card</p>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Order ORD-2404 · Lotus Restaurant</CardTitle>
          <CardDescription>Placed Jul 04, 11:05 · 21 items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <StatusPill status="sent" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="font-tabular font-semibold">$7,920.00</span>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" size="sm">
            Print slip
          </Button>
          <Button size="sm">View details</Button>
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
            alt="Emma Carter"
          />
          <AvatarFallback>EC</AvatarFallback>
        </Avatar>
        <Avatar>
          {/* no image → fallback initials */}
          <AvatarFallback className="bg-primary-subtle text-primary">DR</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">BS</AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <div className="text-sm font-medium">Betty Shaw · Corner Store</div>
            <div className="text-xs text-muted-foreground">Regular · owes $640.00</div>
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Breadcrumb</p>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Overview</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>ORD-2404</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </section>

    <section className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Staff card (Card + Avatar + Badge)
      </p>
      <Card className="flex max-w-sm items-center gap-3 p-4">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Daniel Reed" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
        <div className="flex-1 leading-tight">
          <div className="text-sm font-medium">Daniel Reed</div>
          <div className="text-xs text-muted-foreground">Warehouse staff</div>
        </div>
        <Badge variant="soft-success" size="sm">
          <Users className="size-3.5" />
          On shift
        </Badge>
      </Card>
    </section>

    <section className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Schedule line (icon + text)
      </p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarClock className="size-4" />
        Next stock intake: Jul 08, 2026
      </div>
    </section>
  </div>
);
