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

/** Nhãn nhỏ, muted đặt trên mỗi nhóm biến thể. */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </p>
  );
}

// ── Combobox: chọn khách hàng ────────────────────────────────────────────────
const KHACH_HANG: ComboboxItem[] = [
  { value: 'kh-01', label: 'Chị Lan · Quán bún', description: '0912 345 678' },
  { value: 'kh-02', label: 'Anh Dũng · Tạp hoá Dũng Hà', description: '0987 111 222' },
  { value: 'kh-03', label: 'Cô Tám · Bếp ăn công nhân', description: '0903 555 090' },
  { value: 'kh-04', label: 'Chị Hoa · Bún chả Hoa Béo', description: '0938 246 810' },
  { value: 'kh-05', label: 'Anh Phúc · Nhà hàng Phúc Lộc', description: '0166 777 333' },
  { value: 'kh-06', label: 'Cô Bảy · Xe bánh mì đầu ngõ', description: '0944 020 020' },
];

export const ComboboxStory: Story = () => {
  const [khachClear, setKhachClear] = useState<string | undefined>('kh-01');
  const [khachCreate, setKhachCreate] = useState<string | undefined>();
  const [created, setCreated] = useState<string | null>(null);

  return (
    <div className="max-w-sm space-y-6">
      <div className="space-y-2">
        <GroupLabel>Chọn khách hàng · allowClear</GroupLabel>
        <Combobox
          items={KHACH_HANG}
          value={khachClear}
          onChange={setKhachClear}
          allowClear
          placeholder="Chọn khách hàng"
          searchPlaceholder="Tìm theo tên / SĐT..."
          emptyText="Không tìm thấy khách hàng."
        />
      </div>

      <div className="space-y-2">
        <GroupLabel>Chọn khách hàng · onCreate</GroupLabel>
        <Combobox
          items={KHACH_HANG}
          value={khachCreate}
          onChange={setKhachCreate}
          placeholder="Chọn hoặc tạo khách hàng"
          searchPlaceholder="Nhập tên khách..."
          onCreate={(q) => setCreated(q)}
          createLabel={(q) => <>+ Tạo mới &ldquo;{q}&rdquo;</>}
        />
        {created ? (
          <p className="text-xs text-muted-foreground">
            Đã yêu cầu tạo: <span className="text-foreground">{created}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
};

// ── MultiSelect: trạng thái / danh mục ───────────────────────────────────────
const DANH_MUC: MultiSelectItem[] = [
  { value: 'cha-lua', label: 'Chả lụa', description: 'Giò lụa truyền thống' },
  { value: 'nem-chua', label: 'Nem chua', description: 'Đặc sản Thanh Hoá' },
  { value: 'gio-thu', label: 'Giò thủ', description: 'Giò tai, giò xào' },
  { value: 'cha-que', label: 'Chả quế', description: 'Chả quế nướng' },
  { value: 'pate', label: 'Pate gan', description: 'Pate khối / pate hộp' },
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
        <GroupLabel>Lọc danh mục · maxDisplay 2</GroupLabel>
        <MultiSelect
          items={DANH_MUC}
          value={danhMuc}
          onChange={setDanhMuc}
          maxDisplay={2}
          placeholder="Chọn danh mục"
          searchPlaceholder="Tìm danh mục..."
        />
        <p className="text-xs text-muted-foreground">
          Đã chọn {danhMuc.length} danh mục
        </p>
      </div>

      <div className="space-y-2">
        <GroupLabel>Hiển thị tất cả chip (không maxDisplay)</GroupLabel>
        <MultiSelect
          items={DANH_MUC}
          value={danhMuc}
          onChange={setDanhMuc}
          placeholder="Chọn danh mục"
          searchPlaceholder="Tìm danh mục..."
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

const DON_HANG_PRESETS: DateRangePickerPreset[] = [
  {
    label: 'Tuần này',
    getRange: () => ({ from: new Date(2026, 0, 12), to: new Date(2026, 0, 18) }),
  },
  {
    label: 'Tháng 1',
    getRange: () => ({ from: new Date(2026, 0, 1), to: new Date(2026, 0, 31) }),
  },
  {
    label: 'Quý I',
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
        <GroupLabel>Khoảng ngày đơn hàng</GroupLabel>
        <DateRangePicker
          value={plain}
          onChange={setPlain}
          numberOfMonths={1}
          placeholder="Chọn khoảng ngày"
        />
      </div>

      <div className="space-y-2">
        <GroupLabel>Có preset tuỳ biến</GroupLabel>
        <DateRangePicker
          value={withPresets}
          onChange={setWithPresets}
          presets={DON_HANG_PRESETS}
          placeholder="Chọn khoảng ngày"
        />
      </div>
    </div>
  );
};

// ── SegmentedControl ─────────────────────────────────────────────────────────
const TRANG_THAI: SegmentedControlOption[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chưa xử lý' },
  { value: 'delivered', label: 'Đã giao' },
];

const TRANG_THAI_ICON: SegmentedControlOption[] = [
  { value: 'all', label: 'Tất cả', icon: <ListFilter /> },
  { value: 'pending', label: 'Chờ thanh toán', icon: <Clock /> },
  { value: 'paid', label: 'Đã thanh toán', icon: <CheckCircle2 /> },
  { value: 'cancelled', label: 'Đã huỷ', icon: <XCircle /> },
];

export const SegmentedStory: Story = () => {
  const [view, setView] = useState('all');
  const [viewSm, setViewSm] = useState('pending');
  const [viewIcon, setViewIcon] = useState('all');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <GroupLabel>Bộ lọc đơn hàng · md</GroupLabel>
        <SegmentedControl
          options={TRANG_THAI}
          value={view}
          onChange={setView}
          ariaLabel="Lọc theo trạng thái đơn"
        />
      </div>

      <div className="space-y-2">
        <GroupLabel>Kích thước sm</GroupLabel>
        <SegmentedControl
          options={TRANG_THAI}
          value={viewSm}
          onChange={setViewSm}
          size="sm"
          ariaLabel="Lọc theo trạng thái đơn (nhỏ)"
        />
      </div>

      <div className="space-y-2">
        <GroupLabel>Kèm icon</GroupLabel>
        <SegmentedControl
          options={TRANG_THAI_ICON}
          value={viewIcon}
          onChange={setViewIcon}
          ariaLabel="Lọc theo trạng thái thanh toán"
        />
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <PackageCheck className="size-3.5" />
          Đang xem: {TRANG_THAI_ICON.find((o) => o.value === viewIcon)?.label}
        </p>
      </div>
    </div>
  );
};
