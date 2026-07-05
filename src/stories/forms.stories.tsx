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

/** Nhãn nhỏ, muted đặt trên mỗi nhóm biến thể. */
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
        Tên khách hàng
        <RequiredHint />
      </Label>
      <Input id="ten-kh" defaultValue="Chị Lan · Quán bún" />
      <FieldHint>Tên hiển thị trên đơn hàng &amp; hoá đơn.</FieldHint>
    </div>

    <div className="space-y-2">
      <Label htmlFor="sdt">Số điện thoại</Label>
      <Input id="sdt" placeholder="VD: 0901 234 567" />
    </div>

    <div className="space-y-2">
      <Label htmlFor="ma-dh-error">Mã đơn hàng</Label>
      <Input id="ma-dh-error" defaultValue="DH-2401" aria-invalid />
      <FieldHint error>Mã đơn hàng đã tồn tại, vui lòng chọn mã khác.</FieldHint>
    </div>

    <div className="space-y-2">
      <Label htmlFor="ma-kho">Mã kho (khoá)</Label>
      <Input id="ma-kho" defaultValue="KHO-HCM-01" disabled />
      <FieldHint>Trường hệ thống — không thể chỉnh sửa.</FieldHint>
    </div>

    <div className="space-y-2">
      <Label htmlFor="ghi-chu">Ghi chú giao hàng</Label>
      <Textarea
        id="ghi-chu"
        rows={4}
        placeholder="VD: Giao trước 8h sáng, gọi trước khi tới, để hàng ở quầy lễ tân…"
      />
      <FieldHint>Tối đa 500 ký tự.</FieldHint>
    </div>
  </div>
);

// ── Select ─────────────────────────────────────────────────────────────────
export const SelectControl: Story = () => (
  <div className="max-w-md space-y-6">
    <div className="space-y-2">
      <Label htmlFor="sale">
        Sale phụ trách
        <RequiredHint />
      </Label>
      <Select defaultValue="lan">
        <SelectTrigger id="sale">
          <SelectValue placeholder="Chọn nhân viên sale" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Khu vực HCM</SelectLabel>
            <SelectItem value="lan">Nguyễn Thị Lan</SelectItem>
            <SelectItem value="hung">Trần Văn Hùng</SelectItem>
            <SelectItem value="mai">Phạm Thị Mai</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Khu vực Hà Nội</SelectLabel>
            <SelectItem value="son">Lê Hoài Sơn</SelectItem>
            <SelectItem value="tuan" disabled>
              Đỗ Anh Tuấn (nghỉ phép)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldHint>Sale sẽ nhận hoa hồng trên đơn này.</FieldHint>
    </div>

    <div className="space-y-2">
      <Label htmlFor="trang-thai">Trạng thái đơn</Label>
      <Select>
        <SelectTrigger id="trang-thai">
          <SelectValue placeholder="Chọn trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cho">Chờ thanh toán</SelectItem>
          <SelectItem value="da-tt">Đã thanh toán</SelectItem>
          <SelectItem value="dang-giao">Đang giao</SelectItem>
          <SelectItem value="da-huy">Đã huỷ</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label htmlFor="kho-disabled">Kho xuất hàng (khoá)</Label>
      <Select defaultValue="hcm" disabled>
        <SelectTrigger id="kho-disabled">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hcm">Kho Tân Bình · HCM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

// ── Checkbox + Radio ───────────────────────────────────────────────────────
export const CheckboxAndRadio: Story = () => (
  <div className="flex max-w-2xl flex-col gap-8 sm:flex-row">
    <div className="space-y-3">
      <GroupLabel>Tuỳ chọn đơn hàng</GroupLabel>
      <div className="flex items-center gap-2">
        <Checkbox id="xuat-vat" defaultChecked />
        <Label htmlFor="xuat-vat">Xuất hoá đơn VAT</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="giao-tan-noi" />
        <Label htmlFor="giao-tan-noi">Giao hàng tận nơi</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="uu-tien" />
        <Label htmlFor="uu-tien">Đơn ưu tiên (giao gấp)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cong-no" disabled />
        <Label htmlFor="cong-no" className="opacity-70">
          Ghi công nợ (chưa mở)
        </Label>
      </div>
    </div>

    <div className="space-y-3">
      <GroupLabel>Hình thức thanh toán</GroupLabel>
      <RadioGroup defaultValue="chuyen-khoan">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="tien-mat" id="tt-tien-mat" />
          <Label htmlFor="tt-tien-mat">Tiền mặt khi nhận</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="chuyen-khoan" id="tt-ck" />
          <Label htmlFor="tt-ck">Chuyển khoản ngân hàng</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="cong-no" id="tt-cong-no" />
          <Label htmlFor="tt-cong-no">Ghi công nợ cuối tháng</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="tra-gop" id="tt-tra-gop" disabled />
          <Label htmlFor="tt-tra-gop" className="opacity-70">
            Trả góp (không khả dụng)
          </Label>
        </div>
      </RadioGroup>
    </div>
  </div>
);

// ── Switch ─────────────────────────────────────────────────────────────────
export const SwitchControl: Story = () => (
  <div className="max-w-md space-y-4">
    <GroupLabel>Cấu hình khách hàng</GroupLabel>
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor="sw-active">Khách đang hoạt động</Label>
      <Switch id="sw-active" defaultChecked />
    </div>
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor="sw-nhac-no">Nhắc công nợ tự động</Label>
      <Switch id="sw-nhac-no" />
    </div>
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor="sw-vip" className="opacity-70">
        Giá sỉ VIP (khoá quyền)
      </Label>
      <Switch id="sw-vip" defaultChecked disabled />
    </div>
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor="sw-block" className="opacity-70">
        Chặn đặt hàng (khoá quyền)
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
        <Label>Chiết khấu đơn hàng</Label>
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
      <FieldHint>Áp dụng trên tổng tiền hàng trước thuế.</FieldHint>
    </div>
  );
}

export const SliderControl: Story = () => (
  <div className="max-w-md space-y-8">
    <DiscountSlider />
    <div className="space-y-3">
      <GroupLabel>Cố định (chỉ đọc / disabled)</GroupLabel>
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
      label="Ngày giao hàng"
      hint="Bỏ trống nếu giao ngay trong ngày."
    />
    <DateField
      label="Hạn thanh toán công nợ"
      initial={new Date(2026, 0, 15)}
      hint="Đã chọn 15/01/2026 — nhấn nút ✕ trong ô để xoá ngày."
    />
    <div className="space-y-2">
      <Label>Ngày tạo đơn (khoá)</Label>
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
      <GroupLabel>Giỏ hàng (size md)</GroupLabel>
      <StepperRow label="Chả lụa" price="180.000₫ / kg" initial={2} />
      <StepperRow
        label="Nem chua (thùng 10)"
        price="250.000₫ / thùng"
        initial={10}
        step={10}
        min={10}
      />
    </div>
    <div className="space-y-4">
      <GroupLabel>Dòng gọn (size sm)</GroupLabel>
      <StepperRow
        label="Giò thủ"
        price="150.000₫ / kg"
        initial={1}
        size="sm"
      />
      <StepperRow
        label="Bánh chưng (tối đa 5)"
        price="80.000₫ / cái"
        initial={5}
        max={5}
        size="sm"
      />
    </div>
    <div className="space-y-2">
      <GroupLabel>Disabled</GroupLabel>
      <div className="flex items-center gap-3">
        <QuantityStepper value={3} onChange={() => {}} disabled />
        <span className="text-xs text-muted-foreground">Hết hàng — khoá số lượng</span>
      </div>
    </div>
  </div>
);

// ── Field helpers ──────────────────────────────────────────────────────────
export const FieldHelpers: Story = () => (
  <div className="max-w-md space-y-6">
    <div className="space-y-2">
      <GroupLabel>RequiredHint — dot cạnh Label</GroupLabel>
      <Label htmlFor="fh-required">
        Số lượng đặt
        <RequiredHint />
      </Label>
      <Input id="fh-required" defaultValue="2" className="font-tabular" />
    </div>

    <div className="space-y-2">
      <GroupLabel>FieldHint — caption muted</GroupLabel>
      <Label htmlFor="fh-hint">Đơn giá</Label>
      <Input id="fh-hint" defaultValue="1.250.000₫" className="font-tabular" />
      <FieldHint>Đã bao gồm VAT 8%.</FieldHint>
    </div>

    <div className="space-y-2">
      <GroupLabel>FieldHint error — caption destructive</GroupLabel>
      <Label htmlFor="fh-error">Tổng tiền</Label>
      <Input id="fh-error" defaultValue="0₫" aria-invalid className="font-tabular" />
      <FieldHint error>Tổng tiền phải lớn hơn 0₫.</FieldHint>
    </div>
  </div>
);
