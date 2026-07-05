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

/** en-US currency formatting: 1250 → "$1,250.00". */
function formatUsd(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

/* ------------------------------------------------------------------ */
/* 1 · EditableCell — standalone demos                                */
/* ------------------------------------------------------------------ */

const STATUS_OPTIONS = [
  { label: 'Pending payment', value: 'pending_payment' },
  { label: 'Paid', value: 'paid' },
  { label: 'Packing', value: 'packing' },
  { label: 'Sent', value: 'sent' },
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
  const [note, setNote] = React.useState<string>('Deliver before 9am');
  const [qty, setQty] = React.useState<number>(12);
  const [price, setPrice] = React.useState<number>(18.5);
  const [status, setStatus] = React.useState<string>('paid');

  return (
    <div className="flex max-w-4xl flex-wrap gap-4">
      <DemoCard title="Note (text)" hint="Click to edit · Enter saves · Esc cancels">
        <EditableCell
          value={note}
          type="text"
          placeholder="Add a note…"
          ariaLabel="Order note"
          onSave={(v) => setNote(String(v))}
        />
        <Readout label="Saved" value={note || '—'} />
      </DemoCard>

      <DemoCard title="Quantity (number)" hint="Digits only · right-aligned">
        <EditableCell
          value={qty}
          type="number"
          align="right"
          ariaLabel="Quantity"
          onSave={(v) => setQty(Number(v))}
        />
        <Readout label="Saved" value={qty} />
      </DemoCard>

      <DemoCard title="Unit price (currency)" hint="Formatted as $ when read">
        <EditableCell
          value={price}
          type="currency"
          ariaLabel="Unit price"
          onSave={(v) => setPrice(Number(v))}
        />
        <Readout label="Saved" value={formatUsd(price)} />
      </DemoCard>

      <DemoCard title="Status (select)" hint="Click to open the list">
        <EditableCell
          value={status}
          type="select"
          options={STATUS_OPTIONS}
          ariaLabel="Order status"
          onSave={(v) => setStatus(String(v))}
        />
        <Readout
          label="Saved"
          value={STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status}
        />
      </DemoCard>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 2 · InlineEditTable — edit qty/price inline, total auto-computes    */
/* ------------------------------------------------------------------ */

interface LineItem {
  id: string;
  product: string;
  unit: string;
  qty: number;
  price: number;
}

const INITIAL_LINES: LineItem[] = [
  { id: 'sp-01', product: 'Fish Sauce 500ml', unit: 'bottle', qty: 24, price: 3.2 },
  { id: 'sp-02', product: 'Cooking Oil 1L', unit: 'bottle', qty: 12, price: 4.8 },
  { id: 'sp-03', product: 'White Sugar 1kg', unit: 'pack', qty: 30, price: 2.45 },
  { id: 'sp-04', product: 'MSG 400g', unit: 'pack', qty: 18, price: 4.1 },
  { id: 'sp-05', product: 'Premium Rice 5kg', unit: 'bag', qty: 10, price: 16.5 },
  { id: 'sp-06', product: 'Instant Noodles, case of 30', unit: 'case', qty: 6, price: 10.8 },
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
        header: 'Product',
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-foreground">{row.original.product}</span>
            <span className="text-xs text-muted-foreground">
              Unit: {row.original.unit}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'qty',
        header: () => <div className="text-right">Quantity</div>,
        cell: ({ row }) => (
          <EditableCell
            value={row.original.qty}
            type="number"
            align="right"
            ariaLabel={`Quantity for ${row.original.product}`}
            onSave={(v) => patch(row.original.id, { qty: Number(v) })}
          />
        ),
      },
      {
        accessorKey: 'price',
        header: () => <div className="text-right">Unit price</div>,
        cell: ({ row }) => (
          <EditableCell
            value={row.original.price}
            type="currency"
            ariaLabel={`Unit price for ${row.original.product}`}
            onSave={(v) => patch(row.original.id, { price: Number(v) })}
          />
        ),
      },
      {
        id: 'lineTotal',
        header: () => <div className="text-right">Line total</div>,
        cell: ({ row }) => (
          <div className="text-right font-tabular font-medium tabular-nums text-foreground">
            {formatUsd(row.original.qty * row.original.price)}
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
        Click a <strong>Quantity</strong> or <strong>Unit price</strong> cell to edit —
        the <strong>Line total</strong> column recomputes automatically.
      </p>
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(r) => r.id}
        aria-label="Order line items"
      />
      <div className="mt-3 flex justify-end text-sm">
        <span className="text-muted-foreground">Grand total:&nbsp;</span>
        <span className="font-tabular font-semibold text-foreground">
          {formatUsd(grandTotal)}
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 3 · ResizableColumns — drag to resize column width                  */
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
  { code: 'ORD-2401', customer: 'Emma Carter · The Noodle Bar', channel: 'Chat', total: 1250, status: 'pending_payment' },
  { code: 'ORD-2402', customer: 'Daniel Reed · Riverside Industrial Canteen', channel: 'Phone', total: 3480, status: 'paid' },
  { code: 'ORD-2403', customer: 'Betty Shaw · Corner Store', channel: 'Chat', total: 640, status: 'packing' },
  { code: 'ORD-2404', customer: 'Hannah Lotus · Lotus Restaurant', channel: 'In person', total: 7920, status: 'sent' },
  { code: 'ORD-2405', customer: 'Tony Rivers · Riverside Tavern', channel: 'Chat', total: 520, status: 'pending_payment' },
  { code: 'ORD-2406', customer: 'May Nguyen · Bun Dau Diner', channel: 'Phone', total: 2150, status: 'paid' },
  { code: 'ORD-2407', customer: 'Ben Cole · Broken Rice House', channel: 'Chat', total: 1680, status: 'packing' },
];

export const ResizableColumns: Story = () => {
  const columns = React.useMemo<ColumnDef<OrderRow, unknown>[]>(
    () => [
      {
        accessorKey: 'code',
        header: 'Order #',
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
        header: 'Customer',
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
        header: () => <div className="text-right">Total</div>,
        size: 140,
        minSize: 110,
        cell: ({ row }) => (
          <div className="text-right font-tabular tabular-nums text-foreground">
            {formatUsd(row.original.total)}
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
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
        Hover the right edge of each column header to reveal the drag handle — drag to resize.
      </p>
      <DataTable
        columns={columns}
        data={RESIZE_ORDERS}
        enableColumnResizing
        getRowId={(r) => r.code}
        aria-label="Orders (resizable columns)"
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 4 · SavedViewsStory — strip wired to DataTable via state/appliedView */
/* ------------------------------------------------------------------ */

const SEED_VIEWS: SavedView[] = [
  {
    id: 'v-unpaid',
    name: 'Unpaid',
  },
  {
    id: 'v-chat',
    name: 'Chat orders',
  },
];

// Preset snapshots bound to the seed views above.
const SEED_STATE: Record<string, DataTableViewState> = {
  'v-unpaid': {
    globalFilter: 'Pending payment',
    sorting: [{ id: 'total', desc: true }],
  },
  'v-chat': {
    globalFilter: 'Chat',
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
  { code: 'ORD-2401', customer: 'Emma Carter · The Noodle Bar', channel: 'Chat', total: 1250, status: 'Pending payment' },
  { code: 'ORD-2402', customer: 'Daniel Reed · Industrial Canteen', channel: 'Phone', total: 3480, status: 'Paid' },
  { code: 'ORD-2403', customer: 'Betty Shaw · Corner Store', channel: 'Chat', total: 640, status: 'Packing' },
  { code: 'ORD-2404', customer: 'Hannah Lotus · Lotus Restaurant', channel: 'In person', total: 7920, status: 'Sent' },
  { code: 'ORD-2405', customer: 'Tony Rivers · The Tavern', channel: 'Chat', total: 520, status: 'Pending payment' },
  { code: 'ORD-2406', customer: 'May Nguyen · Bun Dau Diner', channel: 'Phone', total: 2150, status: 'Pending payment' },
  { code: 'ORD-2407', customer: 'Ben Cole · Broken Rice House', channel: 'Chat', total: 1680, status: 'Paid' },
  { code: 'ORD-2408', customer: 'Sophie Tran · Pho Kitchen', channel: 'In person', total: 4320, status: 'Sent' },
];

export const SavedViewsStory: Story = () => {
  const [views, setViews] = React.useState<SavedView[]>(SEED_VIEWS);
  // Lookup id → snapshot; views the user creates get added here.
  const [viewState, setViewState] = React.useState<Record<string, DataTableViewState>>(
    SEED_STATE,
  );
  const [activeId, setActiveId] = React.useState<string>('');

  // Snapshot of the current table state (to save as a new view).
  const snapshotRef = React.useRef<DataTableViewState>({});
  // Changing appliedView's reference makes DataTable re-apply the state.
  const [appliedView, setAppliedView] = React.useState<DataTableViewState | undefined>(
    undefined,
  );

  const applyView = (id: string) => {
    setActiveId(id);
    if (!id) {
      // "All" → clear filters/sorting.
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
        header: ({ column }) => <DataTableColumnHeader column={column} title="Order #" />,
        cell: ({ row }) => (
          <span className="font-tabular font-medium text-foreground">
            {row.original.code}
          </span>
        ),
      },
      {
        accessorKey: 'customer',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Customer" />
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
          <DataTableColumnHeader column={column} title="Total" className="justify-end" />
        ),
        cell: ({ row }) => (
          <div className="text-right font-tabular tabular-nums text-foreground">
            {formatUsd(row.original.total)}
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
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
        allLabel="All"
        className="mb-3"
      />
      <DataTable
        columns={columns}
        data={SV_ORDERS}
        searchable
        searchPlaceholder="Search orders, customers, status…"
        getRowId={(r) => r.code}
        appliedView={appliedView}
        onStateChange={(state) => {
          snapshotRef.current = state;
        }}
        aria-label="Orders (saved views)"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Search + sort, then click <strong>“+ Save current filters”</strong> to save it as a new
        view. Choose <strong>“All”</strong> to clear the filters.
      </p>
    </div>
  );
};
