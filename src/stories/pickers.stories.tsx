import type { Story } from '@ladle/react';
import { useState } from 'react';
import {
  Combobox,
  type ComboboxItem,
  MultiSelect,
  type MultiSelectItem,
  DateRangePicker,
  type DateRange,
  type DateRangePickerPreset,
  SegmentedControl,
  type SegmentedControlOption,
} from '../index';
import {
  CheckCircle2,
  Clock,
  ListFilter,
  PackageCheck,
  XCircle,
} from 'lucide-react';

export default { title: 'Pickers' };

/** Small muted label placed above each group of variants. */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

// ── Combobox: select a customer ──────────────────────────────────────────────
const CUSTOMERS: ComboboxItem[] = [
  { value: 'kh-01', label: 'Green Bowl Cafe', description: '(555) 234-5678' },
  { value: 'kh-02', label: 'Dunn & Hall Grocery', description: '(555) 987-1122' },
  { value: 'kh-03', label: 'Foundry Staff Canteen', description: '(555) 903-5590' },
  { value: 'kh-04', label: 'Hazel & Fig Bistro', description: '(555) 938-2468' },
  { value: 'kh-05', label: 'Lucky Fortune Restaurant', description: '(555) 166-7773' },
  { value: 'kh-06', label: 'Corner Sandwich Cart', description: '(555) 944-0202' },
];

export const ComboboxStory: Story = () => {
  const [khachClear, setKhachClear] = useState<string | undefined>('kh-01');
  const [khachCreate, setKhachCreate] = useState<string | undefined>();
  const [created, setCreated] = useState<string | null>(null);

  return (
    <div className="max-w-sm space-y-6">
      <div className="space-y-2">
        <GroupLabel>Select a customer · allowClear</GroupLabel>
        <Combobox
          items={CUSTOMERS}
          value={khachClear}
          onChange={setKhachClear}
          allowClear
          placeholder="Select a customer"
          searchPlaceholder="Search by name / phone..."
          emptyText="No customers found."
        />
      </div>

      <div className="space-y-2">
        <GroupLabel>Select a customer · onCreate</GroupLabel>
        <Combobox
          items={CUSTOMERS}
          value={khachCreate}
          onChange={setKhachCreate}
          placeholder="Select or create a customer"
          searchPlaceholder="Type a customer name..."
          onCreate={(q) => setCreated(q)}
          createLabel={(q) => <>+ Create &ldquo;{q}&rdquo;</>}
        />
        {created ? (
          <p className="text-xs text-muted-foreground">
            Create requested: <span className="text-foreground">{created}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
};

// ── MultiSelect: status / category ───────────────────────────────────────────
const CATEGORIES: MultiSelectItem[] = [
  { value: 'cha-lua', label: 'Breads', description: 'Loaves, rolls, baguettes' },
  { value: 'nem-chua', label: 'Pastries', description: 'Croissants, danishes' },
  { value: 'gio-thu', label: 'Cold cuts', description: 'Ham, salami, terrine' },
  { value: 'cha-que', label: 'Cheeses', description: 'Aged and fresh' },
  { value: 'pate', label: 'Spreads', description: 'Pâté, tapenade' },
];

export const MultiSelectStory: Story = () => {
  const [danhMuc, setDanhMuc] = useState<string[]>([
    'cha-lua',
    'nem-chua',
    'gio-thu',
  ]);

  return (
    <div className="max-w-sm space-y-6">
      <div className="space-y-2">
        <GroupLabel>Filter categories · maxDisplay 2</GroupLabel>
        <MultiSelect
          items={CATEGORIES}
          value={danhMuc}
          onChange={setDanhMuc}
          maxDisplay={2}
          placeholder="Select categories"
          searchPlaceholder="Search categories..."
        />
        <p className="text-xs text-muted-foreground">
          {danhMuc.length} categories selected
        </p>
      </div>

      <div className="space-y-2">
        <GroupLabel>Show all chips (no maxDisplay)</GroupLabel>
        <MultiSelect
          items={CATEGORIES}
          value={danhMuc}
          onChange={setDanhMuc}
          placeholder="Select categories"
          searchPlaceholder="Search categories..."
        />
      </div>
    </div>
  );
};

// ── DateRangePicker ──────────────────────────────────────────────────────────
const FIXED_RANGE: DateRange = {
  from: new Date(2026, 0, 10),
  to: new Date(2026, 0, 17),
};

const ORDER_PRESETS: DateRangePickerPreset[] = [
  {
    label: 'This week',
    getRange: () => ({ from: new Date(2026, 0, 12), to: new Date(2026, 0, 18) }),
  },
  {
    label: 'January',
    getRange: () => ({ from: new Date(2026, 0, 1), to: new Date(2026, 0, 31) }),
  },
  {
    label: 'Q1',
    getRange: () => ({ from: new Date(2026, 0, 1), to: new Date(2026, 2, 31) }),
  },
];

export const DateRangeStory: Story = () => {
  const [plain, setPlain] = useState<DateRange | undefined>(FIXED_RANGE);
  const [withPresets, setWithPresets] = useState<DateRange | undefined>(
    FIXED_RANGE,
  );

  return (
    <div className="max-w-md space-y-6">
      <div className="space-y-2">
        <GroupLabel>Order date range</GroupLabel>
        <DateRangePicker
          value={plain}
          onChange={setPlain}
          numberOfMonths={1}
          placeholder="Select a date range"
        />
      </div>

      <div className="space-y-2">
        <GroupLabel>With custom presets</GroupLabel>
        <DateRangePicker
          value={withPresets}
          onChange={setWithPresets}
          presets={ORDER_PRESETS}
          placeholder="Select a date range"
        />
      </div>
    </div>
  );
};

// ── SegmentedControl ─────────────────────────────────────────────────────────
const STATUSES: SegmentedControlOption[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Unprocessed' },
  { value: 'delivered', label: 'Delivered' },
];

const STATUSES_ICON: SegmentedControlOption[] = [
  { value: 'all', label: 'All', icon: <ListFilter /> },
  { value: 'pending', label: 'Pending payment', icon: <Clock /> },
  { value: 'paid', label: 'Paid', icon: <CheckCircle2 /> },
  { value: 'cancelled', label: 'Cancelled', icon: <XCircle /> },
];

export const SegmentedStory: Story = () => {
  const [view, setView] = useState('all');
  const [viewSm, setViewSm] = useState('pending');
  const [viewIcon, setViewIcon] = useState('all');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <GroupLabel>Order filter · md</GroupLabel>
        <SegmentedControl
          options={STATUSES}
          value={view}
          onChange={setView}
          ariaLabel="Filter by order status"
        />
      </div>

      <div className="space-y-2">
        <GroupLabel>Size sm</GroupLabel>
        <SegmentedControl
          options={STATUSES}
          value={viewSm}
          onChange={setViewSm}
          size="sm"
          ariaLabel="Filter by order status (small)"
        />
      </div>

      <div className="space-y-2">
        <GroupLabel>With icons</GroupLabel>
        <SegmentedControl
          options={STATUSES_ICON}
          value={viewIcon}
          onChange={setViewIcon}
          ariaLabel="Filter by payment status"
        />
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <PackageCheck className="size-3.5" />
          Viewing: {STATUSES_ICON.find((o) => o.value === viewIcon)?.label}
        </p>
      </div>
    </div>
  );
};
