# Contributing to Basil

Thanks for your interest in improving **Basil** (`basil-ui`) — an open-source dashboard & POS component kit for food, retail & sales, built on Radix + Tailwind v4.

This guide covers local setup, the design rules every component must follow, how to add a component, and the conventions we use for commits and pull requests.

---

## Getting started

Basil targets **React 18/19** and **Tailwind v4**, with **Node 20+**.

```bash
# 1. Fork and clone the repo, then:
npm install

# 2. Run the Ladle component showcase (dev)
npm run storybook        # ladle serve — http://localhost:61000
```

Useful scripts:

| Script | What it does |
| --- | --- |
| `npm run storybook` | Ladle dev server — the primary way to build and review components. |
| `npm run build-storybook` | Static Ladle build (must pass before you open a PR). |
| `npm run typecheck` | `tsc --noEmit` — stories in `src/**` are typechecked too. |
| `npm run build` | Bundle the library with `tsup` (ESM + CJS + types). |
| `npm run dev` | `tsup --watch` for library builds. |

---

## Design rules ("v2")

Basil has a deliberate, tight visual language. Every contribution must respect it. `src/styles/globals.css` is the **single source of truth** for tokens — never hardcode a hex value in a component; reference a token utility (`bg-*`, `text-*`, `border-*`, `ring-*`, `rounded-*`, `shadow-*`).

- **Flat hairline surfaces.** Inline surfaces (cards, tables, toolbars, inputs) wear exactly one warm hairline border and **no shadow**. Depth is reserved for things that float.
- **Shadows only on overlays.** `--shadow-popover` / `--shadow-modal` / `--shadow-toast` are the *only* shadows — dropdowns, dialogs, sheets, toasts. Never on an inline card.
- **Borderless tinted status.** Status is a `bg-{hue}-bg text-{hue}-text` pair — no border, no dot-on-white.
- **Single crisp focus.** Two treatments, mutually exclusive:
  - **Text inputs** (`Input`, `Textarea`, date-picker triggers) use a **2px field-ring** (`focus-visible:ring-2 ring-primary`) with `outline-none`.
  - **All other controls** defer to the **global outline** (`:focus-visible { outline: 2px solid primary; outline-offset: 2px }`).
- **Warm surface.** The page background is never pure white (`#fafaf7`); cards are `#ffffff` against it.
- **Nunito** is the reference typeface, but it is **opt-in** — do not bundle it. Consumers may load `@fontsource-variable/nunito` or supply their own via `--font-sans`.
- **Tabular numbers.** Money, counts, and codes use `.font-tabular` / `.tabular` so digits line up in columns.
- **Primary green `#1b5e20`** for CTAs, active nav, brand mark, and the focus ring.
- **Light mode only.** No dark-mode variants.

For the full agent-facing rulebook (tokens, do/don't examples), see [`AGENTS.md`](./AGENTS.md).

---

## Adding a component

1. **Check the export surface first.** `src/index.ts` is the public API. Don't duplicate an existing primitive — extend it.
2. **Create the component** under `src/components/`. Follow the existing file layout and TypeScript conventions (below).
3. **Export it** from `src/index.ts` (and re-export any sub-parts, e.g. `DialogHeader`, `SelectItem`).
4. **Add a story** under `src/stories/`. One default export per file names the sidebar group (`export default { title: '<Category>' }`); each named `Story` export is one showcase. Import from the barrel (`../index`) so the story documents the real public API.
5. **Verify accessibility.** Prefer a Radix primitive as the base. Keyboard navigation, focus management, `aria-*` attributes, and visible focus are required, not optional.
6. **Document props** with JSDoc on the component's props interface.

---

## Code style

- **TypeScript, strict.** The repo runs with `strict`, `noUnusedLocals`, and `noUncheckedIndexedAccess`. Type props explicitly; avoid `any`.
- **`forwardRef` + `displayName`.** Components that render a DOM element should forward their `ref` and set a `displayName`.
- **`cn` for class merging.** Compose classes with the exported `cn` helper (`clsx` + `tailwind-merge`) so consumer `className` overrides merge predictably. Always spread `...props` and merge incoming `className` last.
- **Variants via `cva`.** Use `class-variance-authority` for variant/size APIs, matching existing components.
- **Tokens, not hex.** Reference token utilities only — see the design rules above.
- **Icons.** Use `lucide-react`.

A typical component skeleton:

```tsx
import * as React from 'react';
import { cn } from '../lib/utils';

export interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short description of what this prop does. */
  tone?: 'default' | 'muted';
}

export const Widget = React.forwardRef<HTMLDivElement, WidgetProps>(
  ({ className, tone = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-lg border bg-card', tone === 'muted' && 'bg-muted', className)}
      {...props}
    />
  ),
);
Widget.displayName = 'Widget';
```

---

## Commit & PR conventions

- **Conventional Commits.** Prefix messages with `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `test:`, etc.
  Example: `feat(data-table): add column resizing handle`.
- **One logical change per PR.** Keep diffs focused and reviewable.
- **Before you open a PR, run and pass:**

  ```bash
  npm run typecheck
  npm run build-storybook
  ```

  CI runs these on every push and pull request; a red pipeline blocks merge.
- **Fill out the PR template** (checklist for typecheck, story added, a11y, and design rules).
- **Link the issue** your PR closes (`Closes #123`).

---

## Reporting bugs & requesting features

Use the issue templates:

- **Bug report** — steps to reproduce, expected vs actual, environment.
- **Feature request** — the problem, your proposed API, and alternatives.

For security issues, do **not** open a public issue — see [`SECURITY.md`](./SECURITY.md).

---

## Code of conduct

Participation in this project is governed by our [Code of Conduct](./CODE_OF_CONDUCT.md). By contributing, you agree to uphold it.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
