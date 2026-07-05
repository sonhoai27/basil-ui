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
      <h2 className="mb-1 text-lg font-bold text-foreground">Color palette</h2>
      <p className="text-sm text-muted-foreground">
        Source of truth: <code>src/styles/globals.css</code> (@theme). Light-only, no hardcoded HEX
        outside the token file.
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
          <Swatch className="bg-success" token="bg-success" note="#10b981 · Paid" />
          <Swatch className="bg-success-bg" token="bg-success-bg" note="#d1fae5" border />
          <div className="w-44 space-y-1.5">
            <div className="flex h-16 items-center justify-center rounded-lg bg-success-bg">
              <span className="rounded-sm bg-success-bg px-2 py-0.5 text-sm font-medium text-success-text">
                Paid
              </span>
            </div>
            <code className="text-xs font-semibold text-foreground">text-success-text</code>
            <p className="text-xs text-muted-foreground">#065f46</p>
          </div>
        </div>

        {/* warning */}
        <div className="flex flex-wrap items-start gap-4">
          <Swatch className="bg-warning" token="bg-warning" note="#f59e0b · Pending payment" />
          <Swatch className="bg-warning-bg" token="bg-warning-bg" note="#fef3c7" border />
          <div className="w-44 space-y-1.5">
            <div className="flex h-16 items-center justify-center rounded-lg bg-warning-bg">
              <span className="rounded-sm bg-warning-bg px-2 py-0.5 text-sm font-medium text-warning-text">
                Pending payment
              </span>
            </div>
            <code className="text-xs font-semibold text-foreground">text-warning-text</code>
            <p className="text-xs text-muted-foreground">#92400e</p>
          </div>
        </div>

        {/* info */}
        <div className="flex flex-wrap items-start gap-4">
          <Swatch className="bg-info" token="bg-info" note="#3b82f6 · Shipping" />
          <Swatch className="bg-info-bg" token="bg-info-bg" note="#dbeafe" border />
          <div className="w-44 space-y-1.5">
            <div className="flex h-16 items-center justify-center rounded-lg bg-info-bg">
              <span className="rounded-sm bg-info-bg px-2 py-0.5 text-sm font-medium text-info-text">
                Shipping
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
            note="#ef4444 · Cancelled / delete"
          />
          <Swatch className="bg-destructive-bg" token="bg-destructive-bg" note="#fee2e2" border />
          <div className="w-44 space-y-1.5">
            <div className="flex h-16 items-center justify-center rounded-lg bg-destructive-bg">
              <span className="rounded-sm bg-destructive-bg px-2 py-0.5 text-sm font-medium text-destructive-text">
                Cancelled
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
              Orders
            </div>
            <div className="px-3 py-2 text-sm text-sidebar-foreground">Customers</div>
            <div className="px-3 py-2 text-sm text-sidebar-foreground">Receivables</div>
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
      <h2 className="mb-1 text-lg font-bold text-foreground">Typography — Nunito Variable</h2>
      <p className="text-sm text-muted-foreground">
        <code>--font-sans: 'Nunito Variable'</code>. Full extended-Latin support.
      </p>
    </div>

    {/* Type scale */}
    <section className="space-y-4">
      <GroupLabel>Heading &amp; body scale</GroupLabel>
      <div className="space-y-3 border-l-2 border-border pl-4">
        <div>
          <p className="text-3xl font-bold text-foreground">Wholesale order management</p>
          <code className="text-xs text-muted-foreground">text-3xl font-bold</code>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">Pastries &amp; cold cuts</p>
          <code className="text-xs text-muted-foreground">text-2xl font-bold</code>
        </div>
        <div>
          <p className="text-xl font-semibold text-foreground">Customer receivables</p>
          <code className="text-xs text-muted-foreground">text-xl font-semibold</code>
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">Stock intake details</p>
          <code className="text-xs text-muted-foreground">text-lg font-semibold</code>
        </div>
        <div>
          <p className="text-base text-foreground">
            Order #2401 for Green Bowl Cafe, deliver before 8:00 AM on Monday.
          </p>
          <code className="text-xs text-muted-foreground">text-base (body)</code>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            Note: prioritize fresh stock, call 15 minutes before delivery.
          </p>
          <code className="text-xs text-muted-foreground">text-sm text-muted-foreground</code>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Updated 2026-07-05 · 07:42</p>
          <code className="text-xs text-muted-foreground">text-xs</code>
        </div>
      </div>
    </section>

    {/* Weights */}
    <section className="space-y-3">
      <GroupLabel>Weights (Nunito)</GroupLabel>
      <div className="flex flex-wrap gap-6">
        <p className="text-lg font-normal text-foreground">Sunrise Diner · 400</p>
        <p className="text-lg font-medium text-foreground">Sunrise Diner · 500</p>
        <p className="text-lg font-semibold text-foreground">Sunrise Diner · 600</p>
        <p className="text-lg font-bold text-foreground">Sunrise Diner · 700</p>
      </div>
    </section>

    {/* Tabular numbers */}
    <section className="space-y-3">
      <GroupLabel>.font-tabular — column-aligned money / quantities</GroupLabel>
      <div className="max-w-md space-y-4 rounded-lg border border-border bg-card p-4">
        <div>
          <p className="mb-1 text-xs text-muted-foreground">Without tabular (misaligned columns):</p>
          <div className="space-y-0.5 text-right text-base text-foreground">
            <p>$1,250.00</p>
            <p>$980.00</p>
            <p>$1,111.11</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">
            <code>font-tabular</code> (column-aligned — use for money/counts):
          </p>
          <div className="space-y-0.5 text-right text-base font-tabular text-foreground">
            <p>$1,250.00</p>
            <p>$980.00</p>
            <p>$1,111.11</p>
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
      <h2 className="mb-1 text-lg font-bold text-foreground">Radius &amp; elevation</h2>
      <p className="text-sm text-muted-foreground">
        Inline surfaces = flat + hairline (NO shadow). Shadow is only for floating overlays.
      </p>
    </div>

    {/* Radius */}
    <section className="space-y-3">
      <GroupLabel>Radius</GroupLabel>
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
      <GroupLabel>Shadow — ONLY for overlays (dropdown / dialog / toast)</GroupLabel>
      <div className="flex flex-wrap gap-6 rounded-lg bg-background p-6">
        <div className="w-52 space-y-2">
          <div className="rounded-lg bg-popover p-4 text-sm text-popover-foreground shadow-popover">
            <p className="font-medium">Actions menu</p>
            <p className="text-muted-foreground">Edit · Duplicate · Delete</p>
          </div>
          <code className="text-xs font-semibold text-foreground">shadow-popover</code>
          <p className="text-xs text-muted-foreground">dropdown, popover</p>
        </div>
        <div className="w-52 space-y-2">
          <div className="rounded-xl bg-card p-4 text-sm text-card-foreground shadow-modal">
            <p className="font-medium">Cancel this order?</p>
            <p className="text-muted-foreground">#2401 · Green Bowl Cafe</p>
          </div>
          <code className="text-xs font-semibold text-foreground">shadow-modal</code>
          <p className="text-xs text-muted-foreground">dialog, sheet</p>
        </div>
        <div className="w-52 space-y-2">
          <div className="rounded-lg bg-card p-4 text-sm text-card-foreground shadow-toast">
            <p className="font-medium text-success-text">Order saved</p>
            <p className="text-muted-foreground">#2402 · $1,250.00</p>
          </div>
          <code className="text-xs font-semibold text-foreground">shadow-toast</code>
          <p className="text-xs text-muted-foreground">toast (sonner)</p>
        </div>
      </div>
      <div className="rounded-md bg-warning-bg px-3 py-2 text-sm text-warning-text">
        Note: shadow is only for floating layers. Inline surfaces (card, table, alert, input) are
        always flat + hairline <code>border-border</code>.
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
        <h2 className="mb-1 text-lg font-bold text-foreground">Spacing</h2>
        <p className="text-sm text-muted-foreground">
          Tailwind&rsquo;s 4px scale. Used for <code>gap-*</code>, <code>p-*</code>, <code>m-*</code>,{' '}
          <code>space-y-*</code>.
        </p>
      </div>

      {/* Scale ruler */}
      <section className="space-y-2">
        <GroupLabel>Base scale</GroupLabel>
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
        <GroupLabel>Common patterns</GroupLabel>

        <div className="space-y-1.5">
          <code className="text-xs text-muted-foreground">gap-3 — button / chip row</code>
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3">
            <span className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground">
              New order
            </span>
            <span className="rounded-md border border-border-strong bg-card px-3 py-1.5 text-sm text-foreground">
              Export
            </span>
            <span className="rounded-sm bg-success-bg px-2 py-0.5 text-sm text-success-text">
              Paid
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <code className="text-xs text-muted-foreground">p-4 + space-y-4 — card body</code>
          <div className="max-w-md space-y-4 rounded-lg border border-border bg-card p-4">
            <div>
              <p className="text-sm font-semibold text-foreground">#2401 · Green Bowl Cafe</p>
              <p className="text-sm text-muted-foreground">Deliver Monday · 08:00</p>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-base font-bold font-tabular text-foreground">$1,250.00</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
