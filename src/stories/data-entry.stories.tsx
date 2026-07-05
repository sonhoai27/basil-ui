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
        <Label>Empty — enter an amount</Label>
        <CurrencyInput
          value={empty}
          onChange={setEmpty}
          placeholder="0"
          aria-label="Amount"
        />
        <Readout label="Raw value" value={empty === undefined ? 'undefined' : String(empty)} />
      </div>

      <div className="space-y-2">
        <Label>Preset $1,250.00</Label>
        <CurrencyInput
          value={preset}
          onChange={setPreset}
          aria-label="Order total"
        />
        <Readout label="Raw value" value={preset === undefined ? 'undefined' : String(preset)} />
      </div>

      <div className="space-y-2">
        <Label>Disabled</Label>
        <CurrencyInput
          value={890000}
          onChange={() => {}}
          disabled
          aria-label="Locked total"
        />
        <Readout label="Raw value" value="890000" />
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
        <Label>Flour quantity (kg) — with −/+ buttons</Label>
        <NumberField
          value={qty}
          onChange={setQty}
          min={0}
          steppers
          suffix="kg"
          aria-label="Quantity"
        />
        <Readout label="Raw value" value={qty === undefined ? 'undefined' : String(qty)} />
      </div>

      <div className="space-y-2">
        <Label>Without steppers</Label>
        <NumberField
          value={plain}
          onChange={setPlain}
          min={0}
          placeholder="Number of cases"
          aria-label="Number of cases"
        />
        <Readout label="Raw value" value={plain === undefined ? 'undefined' : String(plain)} />
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
        <Label>Verification code — 6 digits</Label>
        <InputOTP length={6} value={code} onChange={setCode} />
        <Readout label="Entered code" value={code === '' ? '(empty)' : code} />
      </div>

      <div className="space-y-2">
        <Label>Warehouse PIN — 4 digits</Label>
        <InputOTP length={4} value={pin} onChange={setPin} ariaLabel="PIN code" />
        <Readout label="Entered code" value={pin === '' ? '(empty)' : pin} />
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
      <Label>Delivery proof photos — images, up to 5 MB</Label>
      <FileUpload
        value={files}
        onChange={setFiles}
        accept="image/*"
        maxSizeMB={5}
        hint="Images only (jpg, png…), each up to 5 MB"
      />
      <Readout label="Files selected" value={String(files.length)} />
    </div>
  );
};
