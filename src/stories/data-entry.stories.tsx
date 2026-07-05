import type { Story } from '@ladle/react';
import { useState } from 'react';

import { CurrencyInput, NumberField, InputOTP, FileUpload } from '../index';

export default { title: 'Data Entry' };

/** Tiny muted section label above a sub-group of variants. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </div>
  );
}

/** Monospace readout of the raw value a controlled input emitted. */
function Readout({ label, value }: { label: string; value: string }) {
  return (
    <p className="font-tabular text-xs tabular-nums text-muted-foreground">
      {label}: <span className="text-foreground">{value}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* CurrencyInput                                                       */
/* ------------------------------------------------------------------ */

export const CurrencyStory: Story = () => {
  const [empty, setEmpty] = useState<number | undefined>(undefined);
  const [preset, setPreset] = useState<number | undefined>(1250000);

  return (
    <div className="max-w-sm space-y-8">
      <div className="space-y-2">
        <Label>Trống — nhập tiền hàng</Label>
        <CurrencyInput
          value={empty}
          onChange={setEmpty}
          placeholder="0"
          aria-label="Tiền hàng"
        />
        <Readout label="Giá trị thô" value={empty === undefined ? 'undefined' : String(empty)} />
      </div>

      <div className="space-y-2">
        <Label>Có sẵn 1.250.000₫</Label>
        <CurrencyInput
          value={preset}
          onChange={setPreset}
          aria-label="Tổng đơn"
        />
        <Readout label="Giá trị thô" value={preset === undefined ? 'undefined' : String(preset)} />
      </div>

      <div className="space-y-2">
        <Label>Vô hiệu hoá</Label>
        <CurrencyInput
          value={890000}
          onChange={() => {}}
          disabled
          aria-label="Đã chốt"
        />
        <Readout label="Giá trị thô" value="890000" />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* NumberField                                                         */
/* ------------------------------------------------------------------ */

export const NumberFieldStory: Story = () => {
  const [qty, setQty] = useState<number | undefined>(12);
  const [plain, setPlain] = useState<number | undefined>(undefined);

  return (
    <div className="max-w-sm space-y-8">
      <div className="space-y-2">
        <Label>Số lượng Chả lụa (kg) — có nút −/+</Label>
        <NumberField
          value={qty}
          onChange={setQty}
          min={0}
          steppers
          suffix="kg"
          aria-label="Số lượng"
        />
        <Readout label="Giá trị thô" value={qty === undefined ? 'undefined' : String(qty)} />
      </div>

      <div className="space-y-2">
        <Label>Không có nút bấm</Label>
        <NumberField
          value={plain}
          onChange={setPlain}
          min={0}
          placeholder="Số thùng"
          aria-label="Số thùng"
        />
        <Readout label="Giá trị thô" value={plain === undefined ? 'undefined' : String(plain)} />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* InputOTP                                                            */
/* ------------------------------------------------------------------ */

export const InputOTPStory: Story = () => {
  const [code, setCode] = useState('4207');
  const [pin, setPin] = useState('');

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label>Mã xác thực — 6 ô</Label>
        <InputOTP length={6} value={code} onChange={setCode} />
        <Readout label="Mã đã nhập" value={code === '' ? '(trống)' : code} />
      </div>

      <div className="space-y-2">
        <Label>Mã PIN kho — 4 ô</Label>
        <InputOTP length={4} value={pin} onChange={setPin} ariaLabel="Mã PIN" />
        <Readout label="Mã đã nhập" value={pin === '' ? '(trống)' : pin} />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* FileUpload                                                          */
/* ------------------------------------------------------------------ */

export const FileUploadStory: Story = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="max-w-md space-y-3">
      <Label>Ảnh chứng từ giao hàng — ảnh, tối đa 5MB</Label>
      <FileUpload
        value={files}
        onChange={setFiles}
        accept="image/*"
        maxSizeMB={5}
        hint="Chỉ nhận ảnh (jpg, png…), mỗi ảnh tối đa 5 MB"
      />
      <Readout label="Số file đã chọn" value={String(files.length)} />
    </div>
  );
};
