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
/* Shared orders fixture — ~12 realistic order rows                    */
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
  pending_payment: 'Pending payment',
  paid: 'Paid',
  packing: 'Packing',
  sent: 'Sent',
  cancelled: 'Cancelled',
};

const ORDERS: OrderRow[] = [
  { code: 'ORD-2401', customer: 'Emma Carter · The Noodle Bar',     channel: 'Chat',      items: 6,  total: '$1,250.00', totalRaw: 1250000, status: 'pending_payment', createdAt: 'Jul 05, 08:12' },
  { code: 'ORD-2402', customer: 'Daniel Reed · Industrial Canteen', channel: 'Phone',     items: 12, total: '$3,480.00', totalRaw: 3480000, status: 'paid',            createdAt: 'Jul 05, 09:40' },
  { code: 'ORD-2403', customer: 'Betty Shaw · Corner Store',        channel: 'Chat',      items: 4,  total: '$640.00',   totalRaw: 640000,  status: 'packing',         createdAt: 'Jul 04, 16:22' },
  { code: 'ORD-2404', customer: 'Hannah Lotus · Lotus Restaurant',  channel: 'In person', items: 21, total: '$7,920.00', totalRaw: 7920000, status: 'sent',            createdAt: 'Jul 04, 11:05' },
  { code: 'ORD-2405', customer: 'Tony Rivers · The Tavern',         channel: 'Chat',      items: 3,  total: '$520.00',   totalRaw: 520000,  status: 'cancelled',       createdAt: 'Jul 03, 19:48' },
  { code: 'ORD-2406', customer: 'May Nguyen · Bun Dau Diner',       channel: 'Phone',     items: 9,  total: '$2,150.00', totalRaw: 2150000, status: 'pending_payment', createdAt: 'Jul 03, 07:30' },
  { code: 'ORD-2407', customer: 'Ben Cole · Broken Rice House',     channel: 'Chat',      items: 7,  total: '$1,680.00', totalRaw: 1680000, status: 'paid',            createdAt: 'Jul 02, 10:15' },
  { code: 'ORD-2408', customer: 'Sophie Tran · Pho Kitchen',        channel: 'In person', items: 15, total: '$4,320.00', totalRaw: 4320000, status: 'sent',            createdAt: 'Jul 02, 08:50' },
  { code: 'ORD-2409', customer: 'Nathan Pham · The Tavern 2',       channel: 'Phone',     items: 5,  total: '$990.00',   totalRaw: 990000,  status: 'packing',         createdAt: 'Jul 01, 17:33' },
  { code: 'ORD-2410', customer: 'Tammy Vo · Rice Roll Stall',       channel: 'Chat',      items: 8,  total: '$1,840.00', totalRaw: 1840000, status: 'paid',            createdAt: 'Jul 01, 09:02' },
  { code: 'ORD-2411', customer: 'Yvonne Le · School Kitchen',       channel: 'In person', items: 30, total: '$9,560.00', totalRaw: 9560000, status: 'pending_payment', createdAt: 'Jun 30, 14:20' },
  { code: 'ORD-2412', customer: 'Peter Ngo · Seafood Shack',        channel: 'Chat',      items: 4,  total: '$760.00',   totalRaw: 760000,  status: 'cancelled',       createdAt: 'Jun 30, 20:11' },
];

/* ------------------------------------------------------------------ */
/* Columns — meta.label for toggleable columns, sortable header,       */
/* StatusPill                                                          */
/* ------------------------------------------------------------------ */

function orderColumns(): ColumnDef<OrderRow, unknown>[] {
  return [
    {
      accessorKey: 'code',
      meta: { label: 'Order #' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Order #" />,
      cell: ({ row }) => (
        <span className="font-tabular font-medium text-foreground">{row.original.code}</span>
      ),
    },
    {
      accessorKey: 'customer',
      meta: { label: 'Customer' },
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
      meta: { label: 'Items' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Items" />,
      cell: ({ row }) => (
        <span className="font-tabular tabular-nums text-muted-foreground">{row.original.items}</span>
      ),
    },
    {
      accessorKey: 'totalRaw',
      meta: { label: 'Total' },
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
      meta: { label: 'Status' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => <StatusPill status={row.original.status} />,
    },
    {
      accessorKey: 'createdAt',
      meta: { label: 'Created' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
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
        aria-label="Orders (compact density)"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Compact density · the “Columns” button toggles visibility · change rows per page 5 / 10 / 20.
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Sticky header — vertical scroll within maxHeight, header stays      */
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
        aria-label="Orders (sticky header on scroll)"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Scroll the list inside the 320px-tall frame — the header row stays pinned to the top.
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* CSV export — toolbar with an “Export CSV” button                    */
/* ------------------------------------------------------------------ */

export const WithCsvExport: Story = () => {
  const columns = React.useMemo(orderColumns, []);
  const handleExport = React.useCallback(() => {
    downloadCsv<OrderRow>('orders', ORDERS, [
      { header: 'Order #', value: (r) => r.code },
      { header: 'Customer', value: (r) => r.customer },
      { header: 'Channel', value: (r) => r.channel },
      { header: 'Items', value: (r) => r.items },
      { header: 'Total', value: (r) => r.totalRaw },
      { header: 'Status', value: (r) => STATUS_LABEL[r.status] },
      { header: 'Created', value: (r) => r.createdAt },
    ]);
  }, []);

  const toolbar = (
    <div className="flex items-center justify-between gap-3">
      <div className="leading-tight">
        <div className="text-sm font-medium text-foreground">Recent orders</div>
        <div className="text-xs text-muted-foreground">{ORDERS.length} orders · download as Excel</div>
      </div>
      <Button
        variant="outline"
        size="sm"
        leadingIcon={<Download className="size-4" />}
        onClick={handleExport}
      >
        Export CSV
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
        aria-label="Orders (with CSV export)"
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Wide dataset — pin first column, global search, faceted filter,     */
/* density, row selection + select-all-across-pages                    */
/* ------------------------------------------------------------------ */

interface WideOrderRow extends OrderRow {
  salesperson: string;
  district: string;
  paymentMethod: string;
  note: string;
  deliveryAt: string;
}

const WIDE_ORDERS: WideOrderRow[] = [
  { code: 'ORD-2401', customer: 'Emma Carter · The Noodle Bar',     channel: 'Chat',      items: 6,  total: '$1,250.00', totalRaw: 1250000, status: 'pending_payment', createdAt: 'Jul 05, 08:12', salesperson: 'Grace',  district: 'North District',   paymentMethod: 'Bank transfer', note: 'Deliver before 10am',      deliveryAt: 'Jul 05, 09:30' },
  { code: 'ORD-2402', customer: 'Daniel Reed · Industrial Canteen', channel: 'Phone',     items: 12, total: '$3,480.00', totalRaw: 3480000, status: 'paid',            createdAt: 'Jul 05, 09:40', salesperson: 'Henry',  district: 'South County',     paymentMethod: 'Cash',          note: 'Issue a VAT invoice',      deliveryAt: 'Jul 05, 14:00' },
  { code: 'ORD-2403', customer: 'Betty Shaw · Corner Store',        channel: 'Chat',      items: 4,  total: '$640.00',   totalRaw: 640000,  status: 'packing',         createdAt: 'Jul 04, 16:22', salesperson: 'Grace',  district: 'Airport District', paymentMethod: 'COD',           note: 'Call before delivery',     deliveryAt: 'Jul 05, 08:00' },
  { code: 'ORD-2404', customer: 'Hannah Lotus · Lotus Restaurant',  channel: 'In person', items: 21, total: '$7,920.00', totalRaw: 7920000, status: 'sent',            createdAt: 'Jul 04, 11:05', salesperson: 'Tracy',  district: 'District 1',       paymentMethod: 'Bank transfer', note: 'Weekly recurring order',   deliveryAt: 'Jul 04, 15:30' },
  { code: 'ORD-2405', customer: 'Tony Rivers · The Tavern',         channel: 'Chat',      items: 3,  total: '$520.00',   totalRaw: 520000,  status: 'cancelled',       createdAt: 'Jul 03, 19:48', salesperson: 'Henry',  district: 'Riverside',        paymentMethod: 'COD',           note: 'Customer cancelled (dup)', deliveryAt: '—' },
  { code: 'ORD-2406', customer: 'May Nguyen · Bun Dau Diner',       channel: 'Phone',     items: 9,  total: '$2,150.00', totalRaw: 2150000, status: 'pending_payment', createdAt: 'Jul 03, 07:30', salesperson: 'Tracy',  district: 'West End',         paymentMethod: 'Bank transfer', note: 'Awaiting deposit',         deliveryAt: 'Jul 03, 11:00' },
  { code: 'ORD-2407', customer: 'Ben Cole · Broken Rice House',     channel: 'Chat',      items: 7,  total: '$1,680.00', totalRaw: 1680000, status: 'paid',            createdAt: 'Jul 02, 10:15', salesperson: 'Grace',  district: 'District 12',      paymentMethod: 'Cash',          note: 'Deliver with invoice',     deliveryAt: 'Jul 02, 13:00' },
  { code: 'ORD-2408', customer: 'Sophie Tran · Pho Kitchen',        channel: 'In person', items: 15, total: '$4,320.00', totalRaw: 4320000, status: 'sent',            createdAt: 'Jul 02, 08:50', salesperson: 'Henry',  district: 'Eastside',         paymentMethod: 'Bank transfer', note: 'Sent with driver Nathan',  deliveryAt: 'Jul 02, 12:15' },
  { code: 'ORD-2409', customer: 'Nathan Pham · The Tavern 2',       channel: 'Phone',     items: 5,  total: '$990.00',   totalRaw: 990000,  status: 'packing',         createdAt: 'Jul 01, 17:33', salesperson: 'Tracy',  district: 'Midtown',          paymentMethod: 'COD',           note: 'Pack extra dry ice',       deliveryAt: 'Jul 02, 07:30' },
  { code: 'ORD-2410', customer: 'Tammy Vo · Rice Roll Stall',       channel: 'Chat',      items: 8,  total: '$1,840.00', totalRaw: 1840000, status: 'paid',            createdAt: 'Jul 01, 09:02', salesperson: 'Grace',  district: 'North District',   paymentMethod: 'Bank transfer', note: 'Priority regular customer', deliveryAt: 'Jul 01, 11:30' },
  { code: 'ORD-2411', customer: 'Yvonne Le · School Kitchen',       channel: 'In person', items: 30, total: '$9,560.00', totalRaw: 9560000, status: 'pending_payment', createdAt: 'Jun 30, 14:20', salesperson: 'Tracy',  district: 'Hillcrest',        paymentMethod: 'Bank transfer', note: 'Large order, split in two', deliveryAt: 'Jul 01, 06:30' },
  { code: 'ORD-2412', customer: 'Peter Ngo · Seafood Shack',        channel: 'Chat',      items: 4,  total: '$760.00',   totalRaw: 760000,  status: 'cancelled',       createdAt: 'Jun 30, 20:11', salesperson: 'Henry',  district: 'District 4',       paymentMethod: 'COD',           note: 'Out of stock, reorder later', deliveryAt: '—' },
  { code: 'ORD-2413', customer: 'Vera Dang · Goat Hotpot',          channel: 'Phone',     items: 11, total: '$2,980.00', totalRaw: 2980000, status: 'paid',            createdAt: 'Jun 29, 15:47', salesperson: 'Grace',  district: 'Lakeside',         paymentMethod: 'Bank transfer', note: 'Deliver tomorrow afternoon', deliveryAt: 'Jun 30, 16:00' },
  { code: 'ORD-2414', customer: 'Kyle Nguyen · Seafood Buffet',     channel: 'In person', items: 18, total: '$5,240.00', totalRaw: 5240000, status: 'sent',            createdAt: 'Jun 29, 09:18', salesperson: 'Tracy',  district: 'Eastside',         paymentMethod: 'Bank transfer', note: 'Includes monthly promo',   deliveryAt: 'Jun 29, 13:45' },
];

const STATUS_OPTIONS = (Object.keys(STATUS_LABEL) as OrderStatus[]).map((value) => ({
  label: STATUS_LABEL[value],
  value,
}));

function wideOrderColumns(): ColumnDef<WideOrderRow, unknown>[] {
  return [
    {
      accessorKey: 'code',
      meta: { label: 'Order #' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Order #" />,
      cell: ({ row }) => (
        <span className="font-tabular font-medium text-foreground whitespace-nowrap">
          {row.original.code}
        </span>
      ),
    },
    {
      accessorKey: 'customer',
      meta: { label: 'Customer' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
      cell: ({ row }) => (
        <div className="flex flex-col whitespace-nowrap">
          <span className="text-foreground">{row.original.customer}</span>
          <span className="text-xs text-muted-foreground">{row.original.channel}</span>
        </div>
      ),
    },
    {
      accessorKey: 'salesperson',
      meta: { label: 'Salesperson' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Salesperson" />,
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-muted-foreground">{row.original.salesperson}</span>
      ),
    },
    {
      accessorKey: 'district',
      meta: { label: 'Area' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Area" />,
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-muted-foreground">{row.original.district}</span>
      ),
    },
    {
      accessorKey: 'items',
      meta: { label: 'Items' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Items" />,
      cell: ({ row }) => (
        <span className="font-tabular tabular-nums text-muted-foreground">{row.original.items}</span>
      ),
    },
    {
      accessorKey: 'totalRaw',
      meta: { label: 'Total' },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total" className="justify-end" />
      ),
      cell: ({ row }) => (
        <div className="text-right font-tabular font-medium tabular-nums text-foreground whitespace-nowrap">
          {row.original.total}
        </div>
      ),
    },
    {
      accessorKey: 'paymentMethod',
      meta: { label: 'Payment' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Payment" />,
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-muted-foreground">{row.original.paymentMethod}</span>
      ),
    },
    {
      accessorKey: 'status',
      meta: { label: 'Status' },
      // The faceted filter needs a filterFn that receives the selected values array.
      filterFn: (row, id, val) => (val as string[]).includes(row.getValue(id)),
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => <StatusPill status={row.original.status} />,
    },
    {
      accessorKey: 'note',
      meta: { label: 'Note' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Note" />,
      cell: ({ row }) => (
        <span className="whitespace-nowrap text-muted-foreground">{row.original.note}</span>
      ),
    },
    {
      accessorKey: 'deliveryAt',
      meta: { label: 'Delivery slot' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Delivery slot" />,
      cell: ({ row }) => (
        <span className="font-tabular whitespace-nowrap text-xs text-muted-foreground">
          {row.original.deliveryAt}
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      meta: { label: 'Created' },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
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
        searchPlaceholder="Search order #, customer, note…"
        densityToggle
        enableRowSelection
        pageSize={5}
        pageSizeOptions={[5, 10]}
        rowCount={WIDE_ORDERS.length}
        toolbar={(table) => (
          <DataTableFacetedFilter
            column={table.getColumn('status')!}
            title="Status"
            options={STATUS_OPTIONS}
          />
        )}
        bulkActions={(selected, clear) => (
          <>
            <Button variant="outline" size="sm" onClick={clear}>
              Clear selection
            </Button>
            <Button variant="default" size="sm">
              Print {selected.length} packing slips
            </Button>
          </>
        )}
        aria-label="Orders (many columns, pinned first column)"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Wide table — scroll horizontally to see the <strong>Order #</strong> column (and the checkbox)
        pinned on the left. The search box filters client-side, the <strong>Cozy/Compact</strong>{' '}
        button toggles density, and the <strong>Status</strong> chip filters by facet. Select a full
        page (5 rows) to reveal the “Select all {WIDE_ORDERS.length}” button.
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Filtered-empty — type a non-matching term → “Clear filters” state   */
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
        searchPlaceholder="Search order # or customer…"
        pageSize={5}
        aria-label="Orders (empty state when filtered)"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Type a keyword that isn't in the list (e.g. <code>“xyz”</code>) to see the filtered-empty
        state with a <strong>Clear filters</strong> button — distinct from the “No data” empty state.
      </p>
    </div>
  );
};
