# Basil Roadmap 🌿

Basil is an open-source dashboard & POS component kit for **sales, F&B & retail**.
This is a living document — priorities may shift; contributions welcome.

Legend: 🔴 P0 (adoption make-or-break) · 🟡 P1 (trust) · 🟢 P2 (breadth).
⚠️ = shipped but **not yet verified end-to-end**.

---

## 🎯 Up next

**Shipped in v0.2:** ✅ **i18n** (`BasilProvider` + `useMessages` + EN/VI locale packs) · ✅ **charts on Recharts** (`BarChart`/`LineChart`/`AreaChart`/`DonutChart`, token-driven, flat).

Next focus → **P0 #1 & #2** below: verify consumer install and ship a Sales dashboard template.

---

## 🔴 P0 — Adoption make-or-break

1. **Verified consumer install** ⚠️ — prove a fresh app (Vite + Tailwind v4, and Next.js) can
   `npm i basil-ui` → `import 'basil-ui/styles.css'` → render components with the **correct
   classes**. Nail the Tailwind v4 `@source` scanning of `basil-ui/dist` + the opt-in Nunito font.
   Ship a "Setup with Vite / Next" guide + a StackBlitz/CodeSandbox starter.
2. **Dashboard templates** — deliver the positioning: ≥1 polished, deployable **Sales / CMS admin**
   starter (then F&B/KDS and POS). Basil is currently the library only.
3. **Verify AI-native distribution** ⚠️ — test `npx shadcn add <raw-url>` end-to-end in a clean
   project; **publish `basil-ui-mcp`** to npm so agents can `npx basil-ui-mcp`.

## 🟡 P1 — Trust (target: v0.2)

4. **Tests** — currently none. Add Vitest + Testing Library for interactive components
   (Combobox, DataTable, CurrencyInput, InputOTP) and **axe** a11y assertions.
5. **Restore CI** once the account billing lock is cleared (typecheck / build / a11y on PRs) +
   auto docs deploy + **npm provenance** + **Changesets / CHANGELOG**.
6. **Dark mode** (currently light-only — blocks many dashboards) + a **theming guide**
   (brand-color swap via one token).
7. **Dedicated docs site** (Fumadocs / Starlight) beyond the Ladle explorer: MDX guides,
   auto prop tables, **recipes** (orders table + faceted filters + saved views; order-entry form),
   theming + migration guides.

## 🟢 P2 — Breadth (v0.3 → v1.0)

8. **Charts (Recharts)** — see *Up next*.
9. **Real i18n (EN + VI)** — see *Up next*.
10. **More templates** — F&B / KDS (kitchen display), POS.
11. **Ecosystem** — Figma kit (tokens → Figma), a `npx basil-ui init` CLI, framework guides.
12. **Visual regression** (Playwright / Chromatic snapshots) + **bundle-size CI**.
13. **v1.0** — API-stability commitment (semver), once tests + templates + docs are in place.

## ✨ Quick wins (cheap, high signal)

- README **hero GIF / screenshot** + **OG social image** (first impression).
- `good first issue` labels + a few starter issues to invite contributors.

---

## ✅ Done (0.1.x)

- ~68 accessible components on Radix + Tailwind v4; flat-hairline design; WCAG-checked contrast.
- Deep `DataTable` (sort, faceted filters, saved views, inline edit, column resize, sticky, CSV).
- Extracted, de-branded, English JSDoc + default strings.
- **shadcn-compatible registry** (70 items) + human catalog (`registry/components.json`).
- **MCP server** (`mcp/`), `AGENTS.md`, `llms.txt` — agent-native foundation.
- Published to npm (`basil-ui@0.1.1`); docs live at <https://sonhoai27.github.io/basil-ui/>.
