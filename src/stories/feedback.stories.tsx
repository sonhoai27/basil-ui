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
      <AlertTitle>New orders need review</AlertTitle>
      <AlertDescription>
        4 orders are awaiting payment. Check the bank account before you approve them.
      </AlertDescription>
    </Alert>
    <Alert variant="success">
      <AlertTitle>Order ORD-2401 approved</AlertTitle>
      <AlertDescription>A notification was sent to Accounting &amp; Warehouse.</AlertDescription>
    </Alert>
    <Alert variant="warning">
      <AlertTitle>Running low on stock</AlertTitle>
      <AlertDescription>Only 3 kg of Pork Ham left in the warehouse — consider restocking.</AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <AlertTitle>Can't reach the server</AlertTitle>
      <AlertDescription>Check your connection and try again in a few minutes.</AlertDescription>
    </Alert>
    <Alert>
      <AlertDescription>Default callout (neutral) — use it for general notes.</AlertDescription>
    </Alert>
  </div>
);

export const Toasts: Story = () => (
  <div className="flex flex-wrap gap-3">
    <Toaster />
    <Button
      onClick={() => toast.success('Order ORD-2401 approved', { description: 'Sent to Accounting & Warehouse' })}
    >
      Success toast
    </Button>
    <Button
      variant="destructive"
      onClick={() => toast.error("Couldn't cancel the order", { description: 'Order already shipped' })}
    >
      Error toast
    </Button>
    <Button variant="outline" onClick={() => toast.info('Syncing data…')}>
      Info toast
    </Button>
    <Button variant="secondary" onClick={() => toast('Order draft saved')}>
      Default toast
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
      Loading orders…
    </div>
  </div>
);

export const EmptyAndError: Story = () => (
  <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
    <div className="rounded-lg border border-border bg-card">
      <EmptyState
        title="No orders yet"
        description="New orders from customers will show up here."
        icon={<ShoppingBag size={32} />}
        action={{ label: 'Create order manually', onClick: () => toast('Opening the order form') }}
      />
    </div>
    <div className="rounded-lg border border-border bg-card">
      <ErrorState
        description="Couldn't load the order list. Check your connection and try again."
        action={{ label: 'Retry', onClick: () => toast('Reloading…') }}
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
      <Input placeholder="Search orders, customers…" className="w-56 pl-8" aria-label="Search" />
    </div>
    <Select defaultValue="all">
      <SelectTrigger className="w-[160px]" aria-label="Filter by status">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All statuses</SelectItem>
        <SelectItem value="pending_payment">Pending payment</SelectItem>
        <SelectItem value="paid">Paid</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
      </SelectContent>
    </Select>
    <Button variant="outline" leadingIcon={<FilterIcon size={15} />}>
      Filters
    </Button>
    <ToolbarSpacer />
    <Button leadingIcon={<Plus size={15} />}>New order</Button>
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
      <Label2>Wordmark — tone light (light surface)</Label2>
      <div className="flex flex-wrap items-center gap-8 rounded-lg border border-border bg-card p-5">
        <Wordmark subtitle="Admin" tone="light" />
        <Wordmark subtitle="Orders" tone="light" />
        <Wordmark subtitle="Warehouse" tone="light" />
      </div>
    </div>
    <div>
      <Label2>Wordmark — tone dark (sidebar surface)</Label2>
      <div className="flex flex-wrap items-center gap-8 rounded-lg bg-sidebar p-5">
        <Wordmark subtitle="Admin" tone="dark" />
        <Wordmark subtitle="Orders" tone="dark" />
        <Wordmark subtitle="Warehouse" tone="dark" />
      </div>
    </div>
  </div>
);

export const SectionAndEntitySheet: Story = () => {
  const [mode, setMode] = useState<null | 'normal' | 'loading' | 'error'>(null);
  return (
    <div className="max-w-2xl">
      <div className="rounded-lg border border-border bg-card px-5">
        <SectionGroup title="Store information" description="Shown on quotes sent to customers." first>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="shop">Store name</Label>
              <Input id="shop" defaultValue="Basil Foods" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="hotline">Hotline</Label>
              <Input id="hotline" defaultValue="(0909) 123 456" className="mt-1.5" />
            </div>
          </div>
        </SectionGroup>
        <SectionGroup title="Delivery" description="Configure default fees & time windows.">
          <div className="text-sm text-muted-foreground">Second section content…</div>
        </SectionGroup>
      </div>

      <div className="mt-6">
        <Label2>EntitySheet — states</Label2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setMode('normal')}>Open (normal)</Button>
          <Button variant="outline" onClick={() => setMode('loading')}>
            Open (loading)
          </Button>
          <Button variant="outline" onClick={() => setMode('error')}>
            Open (error)
          </Button>
        </div>
      </div>

      <EntitySheet
        open={mode !== null}
        onOpenChange={(o) => !o && setMode(null)}
        title="Emma Carter · The Noodle Bar"
        subtitle="CUST-0142"
        loading={mode === 'loading'}
        error={mode === 'error' ? { description: "Couldn't load the customer profile.", onRetry: () => setMode('normal') } : undefined}
        helper="Changes apply to new orders."
        primaryActions={
          <>
            <Button variant="outline" onClick={() => setMode(null)}>
              Cancel
            </Button>
            <Button onClick={() => setMode(null)}>Save</Button>
          </>
        }
        secondaryActions={
          <Button variant="ghost" size="sm" leadingIcon={<Download size={14} />}>
            Export history
          </Button>
        }
      >
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-border py-2">
            <span className="text-muted-foreground">Phone</span>
            <span className="font-tabular">(0912) 345 678</span>
          </div>
          <div className="flex justify-between border-b border-border py-2">
            <span className="text-muted-foreground">Total spent</span>
            <span className="font-tabular font-semibold">$28,400.00</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Orders</span>
            <span className="font-tabular">37</span>
          </div>
        </div>
      </EntitySheet>
    </div>
  );
};
