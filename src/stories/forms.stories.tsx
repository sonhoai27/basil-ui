import type { Story } from '@ladle/react';
import { useState } from 'react';
import {
  Input,
  Textarea,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Slider,
  DatePicker,
  QuantityStepper,
  FieldHint,
  RequiredHint,
} from '../index';

export default { title: 'Forms' };

/** Small muted label placed above each group of variants. */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

// ── Text inputs ────────────────────────────────────────────────────────────
export const TextInputs: Story = () => (
  <div className="max-w-md space-y-6">
    <div className="space-y-2">
      <Label htmlFor="ten-kh">
        Customer name
        <RequiredHint />
      </Label>
      <Input id="ten-kh" defaultValue="Green Bowl Cafe" />
      <FieldHint>Name shown on orders &amp; invoices.</FieldHint>
    </div>

    <div className="space-y-2">
      <Label htmlFor="sdt">Phone number</Label>
      <Input id="sdt" placeholder="e.g. (555) 234-5678" />
    </div>

    <div className="space-y-2">
      <Label htmlFor="ma-dh-error">Order code</Label>
      <Input id="ma-dh-error" defaultValue="#2401" aria-invalid />
      <FieldHint error>This order code already exists, please choose another.</FieldHint>
    </div>

    <div className="space-y-2">
      <Label htmlFor="ma-kho">Warehouse code (locked)</Label>
      <Input id="ma-kho" defaultValue="WH-NYC-01" disabled />
      <FieldHint>System field — cannot be edited.</FieldHint>
    </div>

    <div className="space-y-2">
      <Label htmlFor="ghi-chu">Delivery notes</Label>
      <Textarea
        id="ghi-chu"
        rows={4}
        placeholder="e.g. Deliver before 8 AM, call on arrival, leave with the front desk…"
      />
      <FieldHint>Up to 500 characters.</FieldHint>
    </div>
  </div>
);

// ── Select ─────────────────────────────────────────────────────────────────
export const SelectControl: Story = () => (
  <div className="max-w-md space-y-6">
    <div className="space-y-2">
      <Label htmlFor="sale">
        Sales rep
        <RequiredHint />
      </Label>
      <Select defaultValue="lan">
        <SelectTrigger id="sale">
          <SelectValue placeholder="Select a sales rep" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>West region</SelectLabel>
            <SelectItem value="lan">Nina Alvarez</SelectItem>
            <SelectItem value="hung">Marcus Bell</SelectItem>
            <SelectItem value="mai">Priya Nair</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>East region</SelectLabel>
            <SelectItem value="son">Daniel Foster</SelectItem>
            <SelectItem value="tuan" disabled>
              Owen Reed (on leave)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldHint>The rep earns commission on this order.</FieldHint>
    </div>

    <div className="space-y-2">
      <Label htmlFor="trang-thai">Order status</Label>
      <Select>
        <SelectTrigger id="trang-thai">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cho">Pending payment</SelectItem>
          <SelectItem value="da-tt">Paid</SelectItem>
          <SelectItem value="dang-giao">Shipping</SelectItem>
          <SelectItem value="da-huy">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label htmlFor="kho-disabled">Fulfillment warehouse (locked)</Label>
      <Select defaultValue="hcm" disabled>
        <SelectTrigger id="kho-disabled">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hcm">Midtown Warehouse · NYC</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

// ── Checkbox + Radio ───────────────────────────────────────────────────────
export const CheckboxAndRadio: Story = () => (
  <div className="flex max-w-2xl flex-col gap-8 sm:flex-row">
    <div className="space-y-3">
      <GroupLabel>Order options</GroupLabel>
      <div className="flex items-center gap-2">
        <Checkbox id="xuat-vat" defaultChecked />
        <Label htmlFor="xuat-vat">Issue a tax invoice</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="giao-tan-noi" />
        <Label htmlFor="giao-tan-noi">Deliver to door</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="uu-tien" />
        <Label htmlFor="uu-tien">Priority order (rush)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cong-no" disabled />
        <Label htmlFor="cong-no" className="opacity-70">
          Charge to account (not enabled)
        </Label>
      </div>
    </div>

    <div className="space-y-3">
      <GroupLabel>Payment method</GroupLabel>
      <RadioGroup defaultValue="chuyen-khoan">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="tien-mat" id="tt-tien-mat" />
          <Label htmlFor="tt-tien-mat">Cash on delivery</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="chuyen-khoan" id="tt-ck" />
          <Label htmlFor="tt-ck">Bank transfer</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="cong-no" id="tt-cong-no" />
          <Label htmlFor="tt-cong-no">Charge to end-of-month account</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="tra-gop" id="tt-tra-gop" disabled />
          <Label htmlFor="tt-tra-gop" className="opacity-70">
            Installments (unavailable)
          </Label>
        </div>
      </RadioGroup>
    </div>
  </div>
);

// ── Switch ─────────────────────────────────────────────────────────────────
export const SwitchControl: Story = () => (
  <div className="max-w-md space-y-4">
    <GroupLabel>Customer settings</GroupLabel>
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor="sw-active">Customer is active</Label>
      <Switch id="sw-active" defaultChecked />
    </div>
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor="sw-nhac-no">Automatic payment reminders</Label>
      <Switch id="sw-nhac-no" />
    </div>
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor="sw-vip" className="opacity-70">
        VIP wholesale pricing (locked)
      </Label>
      <Switch id="sw-vip" defaultChecked disabled />
    </div>
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor="sw-block" className="opacity-70">
        Block ordering (locked)
      </Label>
      <Switch id="sw-block" disabled />
    </div>
  </div>
);

// ── Slider ─────────────────────────────────────────────────────────────────
function DiscountSlider() {
  const [value, setValue] = useState([10]);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Order discount</Label>
        <span className="font-tabular text-sm font-semibold tabular-nums">
          {value[0]}%
        </span>
      </div>
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={30}
        step={1}
      />
      <FieldHint>Applied to the pre-tax order subtotal.</FieldHint>
    </div>
  );
}

export const SliderControl: Story = () => (
  <div className="max-w-md space-y-8">
    <DiscountSlider />
    <div className="space-y-3">
      <GroupLabel>Fixed (read-only / disabled)</GroupLabel>
      <Slider defaultValue={[65]} max={100} step={5} disabled />
    </div>
  </div>
);

// ── DatePicker ─────────────────────────────────────────────────────────────
function DateField({
  label,
  initial,
  hint,
}: {
  label: string;
  initial?: Date;
  hint?: string;
}) {
  const [date, setDate] = useState<Date | undefined>(initial);
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <DatePicker value={date} onChange={setDate} />
      {hint ? <FieldHint>{hint}</FieldHint> : null}
    </div>
  );
}

export const DatePickerControl: Story = () => (
  <div className="max-w-xs space-y-6">
    <DateField
      label="Delivery date"
      hint="Leave empty for same-day delivery."
    />
    <DateField
      label="Payment due date"
      initial={new Date(2026, 0, 15)}
      hint="Selected Jan 15, 2026 — click the ✕ in the field to clear the date."
    />
    <div className="space-y-2">
      <Label>Order created date (locked)</Label>
      <DatePicker value={new Date(2026, 0, 5)} disabled />
    </div>
  </div>
);

// ── QuantityStepper ────────────────────────────────────────────────────────
function StepperRow({
  label,
  price,
  initial,
  step = 1,
  min = 0,
  max = 999,
  size = 'md',
}: {
  label: string;
  price: string;
  initial: number;
  step?: number;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}) {
  const [qty, setQty] = useState(initial);
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="font-tabular text-xs text-muted-foreground">{price}</p>
      </div>
      <QuantityStepper
        value={qty}
        onChange={setQty}
        step={step}
        min={min}
        max={max}
        size={size}
      />
    </div>
  );
}

export const QuantityStepperControl: Story = () => (
  <div className="max-w-md space-y-6">
    <div className="space-y-4">
      <GroupLabel>Cart (size md)</GroupLabel>
      <StepperRow label="Sourdough loaf" price="$4.50 / loaf" initial={2} />
      <StepperRow
        label="Ciabatta (case of 10)"
        price="$32.00 / case"
        initial={10}
        step={10}
        min={10}
      />
    </div>
    <div className="space-y-4">
      <GroupLabel>Compact row (size sm)</GroupLabel>
      <StepperRow
        label="Baguette"
        price="$3.00 / each"
        initial={1}
        size="sm"
      />
      <StepperRow
        label="Croissant box (max 5)"
        price="$12.00 / box"
        initial={5}
        max={5}
        size="sm"
      />
    </div>
    <div className="space-y-2">
      <GroupLabel>Disabled</GroupLabel>
      <div className="flex items-center gap-3">
        <QuantityStepper value={3} onChange={() => {}} disabled />
        <span className="text-xs text-muted-foreground">Out of stock — quantity locked</span>
      </div>
    </div>
  </div>
);

// ── Field helpers ──────────────────────────────────────────────────────────
export const FieldHelpers: Story = () => (
  <div className="max-w-md space-y-6">
    <div className="space-y-2">
      <GroupLabel>RequiredHint — dot next to the label</GroupLabel>
      <Label htmlFor="fh-required">
        Order quantity
        <RequiredHint />
      </Label>
      <Input id="fh-required" defaultValue="2" className="font-tabular" />
    </div>

    <div className="space-y-2">
      <GroupLabel>FieldHint — muted caption</GroupLabel>
      <Label htmlFor="fh-hint">Unit price</Label>
      <Input id="fh-hint" defaultValue="$1,250.00" className="font-tabular" />
      <FieldHint>Includes 8% tax.</FieldHint>
    </div>

    <div className="space-y-2">
      <GroupLabel>FieldHint error — destructive caption</GroupLabel>
      <Label htmlFor="fh-error">Total</Label>
      <Input id="fh-error" defaultValue="$0.00" aria-invalid className="font-tabular" />
      <FieldHint error>Total must be greater than $0.00.</FieldHint>
    </div>
  </div>
);
