// Basil ships design tokens in `basil-ui/styles.css`. The default typeface is
// Nunito, but the font is NOT bundled — load it yourself (opt-in), e.g.:
//   npm i @fontsource-variable/nunito && import '@fontsource-variable/nunito'
// or supply your own via the `--font-sans` token. See the README.

export { cn } from './lib/utils';

// i18n — BasilProvider + useMessages + en/vi locale packs (components default to English)
export * from './i18n';

// shadcn ui official primitives — re-export TRỰC TIẾP
export * from './components/ui/accordion';
export * from './components/ui/alert';
export * from './components/ui/alert-dialog';
export * from './components/ui/avatar';
export * from './components/ui/badge';
export * from './components/ui/breadcrumb';
export * from './components/ui/calendar';
export * from './components/ui/card';
export * from './components/ui/checkbox';
export * from './components/ui/command';
export * from './components/ui/dialog';
export * from './components/ui/dropdown-menu';
export * from './components/ui/form';
export * from './components/ui/input';
export * from './components/ui/label';
export * from './components/ui/popover';
export * from './components/ui/radio-group';
export * from './components/ui/scroll-area';
export * from './components/ui/select';
export * from './components/ui/separator';
export * from './components/ui/sheet';
export * from './components/ui/skeleton';
export { Toaster, toast } from './components/ui/sonner';
export * from './components/ui/switch';
export * from './components/ui/table';
export * from './components/ui/tabs';
export * from './components/ui/textarea';
export * from './components/ui/tooltip';

// Domain — chỉ những thứ shadcn KHÔNG có hoặc Basil-specific
export { Button, type ButtonProps } from './components/domain/button'; // thin wrapper, only isLoading/leadingIcon/trailingIcon/fullWidth ergonomic props
export * from './components/domain/field-helpers'; // FieldHint + RequiredHint
export * from './components/domain/domain-badges'; // VatBadge, OutOfStockBadge
export * from './components/domain/status-pill';
export * from './components/domain/empty-state';
export * from './components/domain/kpi-card';
export * from './components/domain/quantity-stepper';
export * from './components/domain/confirm-dialog';
export * from './components/domain/pagination';
export * from './components/domain/data-table';
export * from './components/domain/data-card';
export * from './components/domain/data-table-faceted-filter';
export * from './components/domain/editable-cell';
export * from './components/domain/saved-views';
export * from './components/domain/entity-sheet';
export * from './components/domain/section-group';
export * from './components/domain/brand-mark';
export * from './components/domain/wordmark';

// Primitives bổ sung (2026-07): slider, drawer, spinner, date-picker, kebab, table helpers, toolbar
export * from './components/ui/slider';
export * from './components/ui/drawer';
export * from './components/domain/spinner';
export * from './components/domain/date-picker';
export * from './components/domain/kebab-menu';
export * from './components/domain/table-helpers';
export * from './components/domain/toolbar';

// Data-entry & display (2026-07): combobox, multi-select, date-range, currency/number,
// otp, file-upload, description-list, banner, segmented-control
export * from './components/domain/combobox';
export * from './components/domain/multi-select';
export * from './components/domain/date-range-picker';
export * from './components/domain/currency-input';
export * from './components/ui/input-otp';
export * from './components/domain/file-upload';
export * from './components/domain/description-list';
export * from './components/ui/banner';
export * from './components/domain/segmented-control';
export * from './components/domain/filter-chips';
export * from './lib/csv';

// P2 (2026-07): timeline, progress, stepper, sparkline (+ KpiCard.sparkline prop)
export * from './components/domain/timeline';
export * from './components/ui/progress';
export * from './components/domain/stepper';
export * from './components/domain/sparkline';

// Charts (Recharts, token-driven) — bar / line / area / donut + shared primitives
export * from './components/charts/chart-primitives';
export * from './components/charts/bar-chart';
export * from './components/charts/line-chart';
export * from './components/charts/area-chart';
export * from './components/charts/donut-chart';
