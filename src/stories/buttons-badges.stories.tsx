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
        <Button variant="default">New order</Button>
        <Button variant="secondary">Save draft</Button>
        <Button variant="outline">Export</Button>
        <Button variant="ghost">Skip</Button>
        <Button variant="destructive">Cancel order</Button>
        <Button variant="link">View details</Button>
      </div>
    </div>

    <div className="space-y-3">
      <Label>Sizes</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Small (sm)</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large (lg)</Button>
        <Button size="icon" aria-label="Add product">
          <Plus />
        </Button>
        <Button size="icon-sm" aria-label="Print order" variant="outline">
          <Printer />
        </Button>
      </div>
    </div>

    <div className="space-y-3">
      <Label>With icon</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Button leadingIcon={<Plus />}>Add line item</Button>
        <Button variant="outline" trailingIcon={<ArrowRight />}>
          Continue
        </Button>
        <Button variant="secondary" leadingIcon={<Printer />} trailingIcon={<ArrowRight />}>
          Print &amp; send
        </Button>
      </div>
    </div>

    <div className="space-y-3">
      <Label>Loading</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Button isLoading>Saving…</Button>
        <Button variant="secondary" isLoading>
          Processing
        </Button>
        <Button variant="outline" isLoading>
          Loading
        </Button>
      </div>
    </div>

    <div className="space-y-3">
      <Label>Disabled</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled>New order</Button>
        <Button variant="outline" disabled leadingIcon={<Check />}>
          Confirmed
        </Button>
        <Button variant="destructive" disabled>
          Cancel order
        </Button>
      </div>
    </div>

    <div className="space-y-3">
      <Label>Full width</Label>
      <div className="max-w-md space-y-3">
        <Button fullWidth leadingIcon={<Plus />}>
          Add new customer
        </Button>
        <Button fullWidth variant="outline">
          Back to orders
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
        <Badge variant="default">New</Badge>
        <Badge variant="secondary">Wholesale</Badge>
        <Badge variant="destructive">Out of stock</Badge>
        <Badge variant="outline">#2401</Badge>
        <Badge variant="caption">Promo</Badge>
      </div>
    </div>

    <div className="space-y-3">
      <Label>Soft / tinted</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="soft-primary">Sent</Badge>
        <Badge variant="soft-success">Paid</Badge>
        <Badge variant="soft-warning">Pending payment</Badge>
        <Badge variant="soft-info">Packing</Badge>
        <Badge variant="soft-muted">Cancelled</Badge>
        <Badge variant="soft-destructive">Overdue</Badge>
      </div>
    </div>

    <div className="space-y-3">
      <Label>Size sm</Label>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="default" size="sm">
          New
        </Badge>
        <Badge variant="secondary" size="sm">
          Wholesale
        </Badge>
        <Badge variant="destructive" size="sm">
          Out of stock
        </Badge>
        <Badge variant="outline" size="sm">
          #2401
        </Badge>
        <Badge variant="caption" size="sm">
          Promo
        </Badge>
        <Badge variant="soft-primary" size="sm">
          Sent
        </Badge>
        <Badge variant="soft-success" size="sm">
          Paid
        </Badge>
        <Badge variant="soft-warning" size="sm">
          Pending payment
        </Badge>
        <Badge variant="soft-info" size="sm">
          Packing
        </Badge>
        <Badge variant="soft-muted" size="sm">
          Cancelled
        </Badge>
        <Badge variant="soft-destructive" size="sm">
          Overdue
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
    <Label>Order status</Label>
    <div className="flex flex-wrap items-center gap-3">
      <StatusPill status="pending_payment" />
      <StatusPill status="paid" />
      <StatusPill status="packing" />
      <StatusPill status="sent" />
      <StatusPill status="cancelled" />
    </div>

    <Label>Inside an order table row</Label>
    <div className="divide-y rounded-md border">
      {[
        { code: '#2401', customer: 'Green Bowl Cafe', total: '$1,250.00', status: 'pending_payment' as const },
        { code: '#2402', customer: 'Sunrise Diner', total: '$3,480.00', status: 'paid' as const },
        { code: '#2403', customer: 'Corner Grocery', total: '$860.00', status: 'packing' as const },
        { code: '#2404', customer: 'Harbor Seafood', total: '$2,100.00', status: 'sent' as const },
        { code: '#2405', customer: 'Maple Bistro', total: '$540.00', status: 'cancelled' as const },
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
    <Label>Row actions menu</Label>
    <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
      <div className="flex items-center gap-3">
        <span className="font-tabular font-semibold">#2401</span>
        <span className="text-muted-foreground">Green Bowl Cafe</span>
      </div>
      <KebabMenu
        items={[
          { label: 'View', icon: <Eye className="size-4" />, onSelect: () => {} },
          { label: 'Edit', icon: <Pencil className="size-4" />, onSelect: () => {} },
          {
            label: 'Cancel order',
            icon: <Trash2 className="size-4" />,
            onSelect: () => {},
            destructive: true,
          },
        ]}
      />
    </div>
  </div>
);
