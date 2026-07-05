# AGENTS.md

Guide for coding agents working in the **Basil** repo (`basil-ui`). Read this
before making changes. It encodes the design rules and conventions that reviews
enforce — following them keeps a PR mergeable.

## Project

Basil is an **open-source dashboard & POS component kit** for food, retail, and
sales apps — ~68 accessible React components, extracted from a real F&B wholesale
ordering tool and de-branded for general use.

Tech stack:

- **React 18 / 19** (peer dependency — never bundle React).
- **Radix UI** primitives for accessible behavior (dialog, popover, select, …).
- **Tailwind CSS v4** — CSS-first `@theme` tokens, no `tailwind.config.js`.
- **CVA** (`class-variance-authority`) for component variants, `clsx` +
  `tailwind-merge` via the `cn` helper.
- **TanStack Table** powers the flagship `DataTable`.
- **tsup** builds ESM + CJS + `.d.ts` to `dist/`.
- **Ladle** (`@ladle/react`) runs the component stories (Basil's Storybook).
- **Light mode only.** No dark theme.

## Setup & commands

```bash
npm install            # install deps
npm run build          # tsup → dist/ (ESM + CJS + types)
npm run typecheck      # tsc --noEmit — must pass, no errors
npm run storybook      # ladle serve — interactive component explorer
npm run build-storybook # ladle build — static story build (CI parity)
```

Before opening a PR, run **`npm run typecheck`** and **`npm run build-storybook`**.
Both must succeed.

## Repo layout

| Path | What it is |
| --- | --- |
| `src/index.ts` | **Barrel.** Every public export lives here. If it isn't exported from this file, it isn't part of the package. |
| `src/components/ui/*` | shadcn / Radix primitives (Button, Dialog, Select, Table, Input, …). Thin, unopinionated, mostly re-exported directly. |
| `src/components/domain/*` | Composed app components (DataTable, StatusPill, KpiCard, EntitySheet, Toolbar, …). Basil's value-add over raw shadcn. |
| `src/lib/utils.ts` | The `cn` helper (`twMerge(clsx(...))`). Use it for all className merging. |
| `src/lib/csv.ts` | CSV helpers used by DataTable export. |
| `src/styles/globals.css` | **Tailwind v4 `@theme`** — the ONLY place tokens, colors, radii, and shadows are defined. Consumers import this as `basil-ui/styles.css`. |
| `src/stories/*` | Ladle stories — one file per component group (e.g. `data.stories.tsx`, `forms.stories.tsx`). Living examples + visual QA. |
| `registry/` | Machine-readable component catalog (built via `npm run registry`). |

## Design rules (MUST follow)

These are non-negotiable — they are the whole point of the "v2" design language.

1. **Flat hairline surfaces.** Inline surfaces (cards, tables, inputs, alerts)
   wear exactly one hairline border (`border-border`) and **no shadow**. Shadows
   exist ONLY on floating overlays, and only via the tokens
   `shadow-popover` (dropdown/popover), `shadow-modal` (dialog/sheet/drawer),
   `shadow-toast`. Never add `shadow-sm/md/lg` or inline `box-shadow` to an
   inline element.

2. **Borderless tinted status.** Status colors use the tinted `bg-{hue}-bg` +
   `text-{hue}-text` token pairs with a transparent border — never a colored
   border. Hues: `success`, `warning`, `info`, `destructive`, plus
   `primary-subtle`/`muted`. See the `soft-*` variants in `badge.tsx`.

3. **Two-treatment focus — pick by control type.**
   - **Text-entry controls** (input, textarea, currency input, OTP): use
     `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`
     — a 2px field ring.
   - **Everything else** (buttons, links, tabs, switches, checkboxes, menu
     items): rely on the **global `:focus-visible` outline** defined in
     `globals.css` (`outline: 2px solid var(--color-primary)`). Do NOT hand-roll
     a ring on these — a hand-rolled ring on top of the global outline produces
     a double focus ring.

4. **Radius scale** (from `@theme`): `rounded-sm` = 6px (chips/badges),
   `rounded-md` = 8px (buttons/inputs), `rounded-lg` = 10px
   (cards/panels/tables/alerts), `rounded-xl` = 12px (modals). Don't invent
   arbitrary radii.

5. **Tabular numbers.** Money, quantities, and counts use the `tabular` (or
   `font-tabular`) utility so digits align in columns.

6. **No hardcoded hex.** All colors, radii, and shadows come from tokens in
   `globals.css`. If a value you need doesn't exist, add a token there — never
   inline a hex value in a component.

## How to add a component

1. Create the file under `src/components/ui/` (a low-level primitive) or
   `src/components/domain/` (a composed, opinionated component).
2. Use `React.forwardRef` and set an explicit `displayName`.
3. Type props with an **exported interface** (e.g.
   `export interface FooProps extends React.HTMLAttributes<HTMLDivElement> {}`).
4. Merge incoming `className` with `cn(...)` so consumers can override.
5. Add variants with **CVA** where the component has meaningful visual variants
   (see `badge.tsx` for the pattern). Reference tokens via Tailwind utilities,
   not hex.
6. **Export it from `src/index.ts`** — the barrel is the public surface.
7. Add a Ladle **story** in `src/stories/*` demonstrating the main states.
8. Keep accessibility intact: correct ARIA roles/labels, full keyboard support,
   and **≥40px touch targets** on primary interactive controls.
9. Run `npm run typecheck` and `npm run build-storybook` before finishing.

## Gotchas

- **Font is opt-in, not bundled.** The default `--font-sans` names
  `Nunito Variable`, but Basil never ships the font files. Consumers load it
  themselves (`@fontsource-variable/nunito`) or override `--font-sans`. Don't
  add a font `@import`/`@font-face` to `globals.css`.
- **`StatusPill` is opinionated.** It maps a fixed `OrderStatus` union
  (`pending_payment | paid | packing | sent | cancelled`) to soft badge
  variants. If you need different states, extend/override its config or fork the
  file — don't quietly widen the union in ways that break existing consumers.
- **`DataTable` is the flagship.** It's built on TanStack Table with many
  *optional* depth props (faceted filters, saved views, editable cells,
  pagination, CSV export via `src/lib/csv.ts`). Prefer composing the existing
  helpers over reimplementing table behavior.
- **`tw-animate-css` is `@import`-ed** at the top of `globals.css` — animation
  utilities (accordion, fade, etc.) come from there plus the `@keyframes` /
  `--animate-*` tokens in `@theme`. Respect `prefers-reduced-motion`
  (already handled globally in `globals.css`).
- **Tailwind v4 quirk:** v4 defaults `border-color` to `currentColor`;
  `globals.css` forces `* { @apply border-border }`. And the global focus rule
  lives in `@layer base` on purpose — moving it out of that layer breaks the
  input `outline-none` override and reintroduces double focus rings.
- **Some domain files are commerce-specific** (e.g. `mocchinh-badges.tsx` →
  `VatBadge`, `OutOfStockBadge`). Treat them as examples of the pattern, not as
  a general API to bend.
