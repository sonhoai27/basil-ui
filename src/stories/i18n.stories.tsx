import type { Story } from '@ladle/react';
import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  BasilProvider,
  Combobox,
  DataTable,
  DatePicker,
  SegmentedControl,
  StatusPill,
  en,
  vi,
} from '../index';

export default { title: 'i18n' };

type Row = { code: string; customer: string };
const COLUMNS: ColumnDef<Row, unknown>[] = [
  { accessorKey: 'code', header: 'Code' },
  { accessorKey: 'customer', header: 'Customer' },
];

/**
 * All default strings below (empty-state, date placeholder, status labels,
 * combobox placeholder, table search/rows) come from the locale — no props set.
 * Toggle EN ⇄ VI to see every default string switch at once.
 */
export const LocaleSwitch: Story = () => {
  const [locale, setLocale] = useState<'en' | 'vi'>('en');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [picked, setPicked] = useState<string | undefined>(undefined);

  return (
    <BasilProvider messages={locale === 'vi' ? vi : en}>
      <div className="max-w-2xl space-y-5">
        <SegmentedControl
          value={locale}
          onChange={(v) => setLocale(v as 'en' | 'vi')}
          options={[
            { value: 'en', label: 'English' },
            { value: 'vi', label: 'Tiếng Việt' },
          ]}
          ariaLabel="Locale"
        />

        <div className="flex flex-wrap gap-2">
          <StatusPill status="pending_payment" />
          <StatusPill status="paid" />
          <StatusPill status="packing" />
          <StatusPill status="sent" />
          <StatusPill status="cancelled" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DatePicker value={date} onChange={setDate} />
          <Combobox
            items={[
              { value: '1', label: 'Green Bowl Cafe' },
              { value: '2', label: 'Sunrise Diner' },
            ]}
            value={picked}
            onChange={setPicked}
            allowClear
          />
        </div>

        {/* Empty + searchable table → shows the localized "No data" + search placeholder */}
        <DataTable columns={COLUMNS} data={[]} searchable pageSizeOptions={[10, 20]} rowCount={0} />
      </div>
    </BasilProvider>
  );
};
