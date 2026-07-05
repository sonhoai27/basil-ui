import type { Story } from '@ladle/react';
import { AreaChart, BarChart, DonutChart, LineChart } from '../index';

export default { title: 'Charts' };

const REVENUE = [
  { month: 'Jan', online: 4200, store: 2400 },
  { month: 'Feb', online: 3800, store: 2210 },
  { month: 'Mar', online: 5100, store: 2600 },
  { month: 'Apr', online: 4700, store: 2900 },
  { month: 'May', online: 6200, store: 3100 },
  { month: 'Jun', online: 5900, store: 3500 },
  { month: 'Jul', online: 7100, store: 3800 },
  { month: 'Aug', online: 6800, store: 4200 },
];

const CHANNELS = [
  { name: 'Online', value: 6800 },
  { name: 'In-store', value: 4200 },
  { name: 'Phone', value: 1900 },
  { name: 'App', value: 1400 },
];

const usd = (v: number) => `$${v.toLocaleString('en-US')}`;

export const Bars: Story = () => (
  <div className="max-w-2xl space-y-8">
    <BarChart data={REVENUE} index="month" categories={['online', 'store']} valueFormatter={usd} showLegend />
    <BarChart data={REVENUE} index="month" categories={['online', 'store']} stacked valueFormatter={usd} showLegend />
  </div>
);

export const Lines: Story = () => (
  <div className="max-w-2xl">
    <LineChart data={REVENUE} index="month" categories={['online', 'store']} valueFormatter={usd} showLegend />
  </div>
);

export const Areas: Story = () => (
  <div className="max-w-2xl">
    <AreaChart data={REVENUE} index="month" categories={['online', 'store']} valueFormatter={usd} showLegend />
  </div>
);

export const Donut: Story = () => (
  <div className="max-w-md">
    <DonutChart data={CHANNELS} valueFormatter={usd} showLegend ariaLabel="Revenue by channel" />
  </div>
);
