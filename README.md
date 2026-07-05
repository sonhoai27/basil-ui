# Basil 🌿

**An accessible, flat, agent-friendly React component kit for sales, F&B, and POS dashboards.**

[![npm version](https://img.shields.io/npm/v/basil-ui.svg)](https://www.npmjs.com/package/basil-ui)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com)
[![React 18 · 19](https://img.shields.io/badge/React-18%20%C2%B7%2019-149eca.svg)](https://react.dev)

**[📚 Live docs & component explorer →](https://sonhoai27.github.io/basil-ui/)**

---

## What is Basil?

Basil is an open-source component kit and set of dashboard templates for building **sales, food & beverage, retail, and point-of-sale** interfaces. It's ~68 accessible React components built on [Radix UI](https://www.radix-ui.com/) primitives and [Tailwind CSS v4](https://tailwindcss.com), including a deep, production-grade `DataTable`.

It was **extracted from a real production wholesale F&B ordering tool** and hardened into a generic, reusable library — so the components are opinionated where it counts (a flat, calm visual language; WCAG-checked contrast; tabular numbers for money and counts) and unopinionated everywhere else.

Basil is also **built to be driven by AI agents**: it ships an `llms.txt`, an `AGENTS.md`, and a machine-readable component registry so tools like Claude Code or Cursor can wire up UIs correctly on the first try.

---

## Highlights

- 🪶 **Flat hairline design ("v2").** One warm hairline border per surface, no shadows on inline content — depth is reserved for things that actually float (dropdowns, dialogs, sheets, toasts).
- 🧱 **~68 components**, including a deep **`DataTable`** (sorting, server/client pagination, row selection + bulk actions, sticky header, column pinning/resizing, faceted filters, saved views, CSV export).
- ♿ **WCAG-checked contrast** and real keyboard support — Radix primitives underneath, a single crisp focus treatment on top.
- 🟦 **TypeScript-first.** Every component is fully typed; prop interfaces and JSDoc travel with the package.
- 🎨 **Tailwind v4, CSS-first.** All design tokens live in one `@theme` block — no hardcoded hex, no config file to fight.
- 🤖 **LLM / agent-friendly.** Ships [`llms.txt`](./llms.txt), [`AGENTS.md`](./AGENTS.md), and a machine-readable [`registry/components.json`](./registry/components.json).
- 🔤 **Bring-your-own font.** Nunito is the recommended typeface but is **opt-in** — nothing is bundled, so you control your font pipeline.
- 🌞 Light-mode-first, warm surface (`#fafaf7`), primary green `#1b5e20`.

---

## Install

```bash
npm i basil-ui
```

Install the peer dependencies (React and, if you use the `DataTable`, TanStack Table):

```bash
npm i react react-dom @tanstack/react-table
```

> React **18 or 19** and Tailwind **v4** are peer requirements.

Import the stylesheet **once** at your app root:

```tsx
// app entry (e.g. main.tsx / layout.tsx)
import 'basil-ui/styles.css';
```

### Font (opt-in)

Basil is designed for **Nunito** but does not bundle it. Load it yourself:

```bash
npm i @fontsource-variable/nunito
```

```tsx
import '@fontsource-variable/nunito';
```

Or supply any font you like by overriding the `--font-sans` token in your own CSS:

```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

---

## Quick start

```tsx
import { Button, StatusPill, DataTable } from 'basil-ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';

type Order = {
  code: string;
  customer: string;
  total: string;
  status: 'pending_payment' | 'paid' | 'packing' | 'sent' | 'cancelled';
};

const columns: ColumnDef<Order, unknown>[] = [
  { accessorKey: 'code', header: 'Order' },
  { accessorKey: 'customer', header: 'Customer' },
  {
    accessorKey: 'total',
    header: 'Total',
    // tabular numbers keep money aligned in the column
    cell: (c) => <span className="font-tabular">{c.getValue<string>()}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (c) => <StatusPill status={c.getValue<Order['status']>()} />,
  },
];

export function OrdersPage({ data }: { data: Order[] }) {
  return (
    <div className="space-y-4">
      <Button leadingIcon={<Plus />}>New order</Button>
      <DataTable columns={columns} data={data} caption="Orders" searchable />
    </div>
  );
}
```

Every component runs `className` through the exported `cn` helper (`clsx` + `tailwind-merge`), so your overrides merge predictably.

---

## Design principles ("v2")

- **Flat hairline surfaces.** Cards, tables, toolbars, and inputs wear exactly one warm hairline border and **no shadow**. Depth is earned, not decorative.
- **Shadows only on overlays.** `--shadow-popover`, `--shadow-modal`, and `--shadow-toast` are the *only* shadows in the system — dropdowns, dialogs, sheets, toasts. Never on an inline card.
- **Borderless tinted status.** Status reads as a `bg-{hue}-bg text-{hue}-text` pair — no border, no dot-on-white. See `StatusPill` and the `Badge` `soft-*` variants.
- **Single crisp focus, two treatments.**
  - **Text inputs** (`Input`, `Textarea`, date-picker triggers) use a **2px field-ring** (`focus-visible:ring-2 ring-primary`, `outline-none`).
  - **Everything else** (buttons, links, tabs, switches…) defers to the **global outline** (`:focus-visible { outline: 2px solid; outline-offset: 2px }`).
  - The two are mutually exclusive by design, so focus never doubles up.
- **Tokens in `globals.css`.** `src/styles/globals.css` is the single source of truth — a Tailwind v4 `@theme` block that becomes utilities directly. Never hardcode hex; change a token and everything updates. Light-mode only.
- **Warm surface.** The page background is never pure white (`#fafaf7`); cards are `#ffffff` on top of it.
- **Tabular numbers.** Money, counts, and codes use `.font-tabular` (`font-variant-numeric: tabular-nums`) so digits line up in columns.

---

## Components

Everything is re-exported from the package barrel (`import { … } from 'basil-ui'`). Radix/shadcn-style primitives export their sub-parts too (e.g. `DialogHeader`, `SelectItem`).

### Primitives
`Button` · `Badge` · `Avatar` · `Separator` · `Skeleton` · `Spinner` · `Slider` · `ScrollArea` · `Accordion` · `Tabs` · `BrandMark` · `Wordmark`

### Forms
`Input` · `Textarea` · `Label` · `Checkbox` · `RadioGroup` · `Switch` · `SegmentedControl` · `Select` · `Combobox` · `MultiSelect` · `DatePicker` · `DateRangePicker` · `Calendar` · `CurrencyInput` · `NumberField` · `InputOTP` · `FileUpload` · `Form` (RHF helpers) · `QuantityStepper` · `FieldHint` · `RequiredHint`

### Data
`DataTable` · `DataTableFacetedFilter` · `DataTableColumnHeader` · `DataTableRowActions` · `EditableCell` · `SavedViews` · `Pagination` · `Table` · `Toolbar` · `FilterChips` · `DescriptionList` · `SectionGroup` · `Card` · `Breadcrumb` · `downloadCsv` / `toCsv`

### Overlays
`Dialog` · `AlertDialog` · `ConfirmDialog` · `Sheet` · `EntitySheet` · `Drawer` · `Popover` · `Tooltip` · `DropdownMenu` · `KebabMenu` · `Command`

### Feedback
`Alert` · `Banner` · `Progress` · `Toaster` / `toast()` · `EmptyState` · `ErrorState` · `Skeleton` · `Spinner`

### Domain
`StatusPill` · `KpiCard` · `Timeline` · `Stepper` · `Sparkline` · `VatBadge` · `OutOfStockBadge`

> 📚 Full API docs, prop tables, and live examples live in the **[Storybook](https://sonhoai27.github.io/basil-ui/)** (Ladle). Browse the [hosted docs](https://sonhoai27.github.io/basil-ui/), or run `npm run storybook` locally.

#### About the `DataTable`

The flagship component. A single `DataTable` covers: sorting, client **and** server pagination (`pageCount` + `onPaginationChange`), row selection with bulk actions and select-all-across-pages, a built-in global search, density toggle, sticky header + first-column pinning on scroll, column show/hide and drag-resizing, faceted filters via a render-prop toolbar, distinct loading / empty / filtered-empty / error states, and saved-view snapshots (`onStateChange` / `appliedView`) you can persist and re-apply. Pair it with `downloadCsv` for Excel-friendly export.

---

## For AI agents

Basil ships first-class machine-readable metadata so coding agents can use it correctly:

- **[`llms.txt`](./llms.txt)** — a compact, LLM-oriented map of the library.
- **[`AGENTS.md`](./AGENTS.md)** — conventions, do's and don'ts, and copy-paste patterns for agents editing a Basil codebase.
- **[`registry/components.json`](./registry/components.json)** — a machine-readable registry of every component, its props, and its import path.

If you're an agent: read `AGENTS.md` first, then consult the registry before generating UI code.

---

## Develop

```bash
git clone https://github.com/your-org/basil.git
cd basil
npm install

npm run storybook        # Ladle component showcase (ladle serve)
npm run typecheck        # tsc --noEmit
npm run build            # bundle with tsup
npm run build-storybook  # static Ladle build
```

- Stories live under `src/` and document the real public API — import from the barrel (`../index`), never from internal paths.
- `src/styles/globals.css` is the source of truth for tokens. No hardcoded hex in components.

---

## Contributing

PRs are welcome! Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) and open an issue for anything larger than a small fix. Bug reports, new templates, and accessibility improvements are especially appreciated.

## Roadmap

**Up next:** real i18n (English + Vietnamese) · charts on Recharts. → **[Full roadmap](./ROADMAP.md)**

Shipped: shadcn registry ✓ · MCP server ✓ · agent-native docs ✓. Coming: dashboard/POS templates, dark mode, tests + CI, a dedicated docs site.

## License

[MIT](./LICENSE) © Basil contributors.
