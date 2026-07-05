import type { Story } from '@ladle/react';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import {
  DescriptionList,
  DescriptionItem,
  Banner,
  FilterChips,
  type FilterChip,
} from '../index';

export default { title: 'Display Extras' };

export const DescriptionListStory: Story = () => (
  <div className="flex max-w-2xl flex-col gap-8 p-6">
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-foreground">Order #2401 · 1 column</p>
      <DescriptionList columns={1}>
        <DescriptionItem term="Phone">(555) 234-5678</DescriptionItem>
        <DescriptionItem term="Address">
          128 Market St, Suite 4, San Francisco, CA
        </DescriptionItem>
        <DescriptionItem term="Total" numeric>
          $1,250.00
        </DescriptionItem>
        <DescriptionItem term="Status">
          <span className="rounded-md bg-warning-bg px-2 py-0.5 text-xs font-medium text-warning-text">
            Pending payment
          </span>
        </DescriptionItem>
      </DescriptionList>
    </div>

    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-foreground">
        Order #2402 · 2 columns + divided
      </p>
      <DescriptionList columns={2} divided>
        <DescriptionItem term="Phone">(555) 987-6543</DescriptionItem>
        <DescriptionItem term="Address">
          45 Union Ave, Brooklyn, NY
        </DescriptionItem>
        <DescriptionItem term="Total" numeric>
          $3,480.00
        </DescriptionItem>
        <DescriptionItem term="Status">
          <span className="rounded-md bg-success-bg px-2 py-0.5 text-xs font-medium text-success-text">
            Paid
          </span>
        </DescriptionItem>
      </DescriptionList>
    </div>
  </div>
);

export const BannerStory: Story = () => {
  const [showDismissable, setShowDismissable] = useState(true);
  return (
    <div className="flex max-w-2xl flex-col gap-4 p-6">
      <Banner variant="info" title="New stock arriving">
        <p>A batch of breads and cold cuts arrives at the warehouse at 2:00 PM on Jan 15, 2026.</p>
      </Banner>

      <Banner variant="success" title="Paid">
        <p>Order #2401 for Green Bowl Cafe was paid in full: $1,250.00.</p>
      </Banner>

      <Banner variant="warning" title="Low stock">
        <p>Only 12 pastries left in the warehouse — consider restocking.</p>
      </Banner>

      <Banner variant="destructive" title="Order cancelled">
        <p>Order #2399 was cancelled because the customer did not confirm within 48 hours.</p>
      </Banner>

      {showDismissable ? (
        <Banner
          variant="info"
          title="Payment reminder"
          action={
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md bg-info-text/10 px-2.5 py-1 text-xs font-semibold text-info-text transition-colors hover:bg-info-text/20"
            >
              View details
              <ExternalLink className="size-3.5" aria-hidden />
            </button>
          }
          onDismiss={() => setShowDismissable(false)}
        >
          <p>Corner Grocery still owes $2,100.00, due Jan 20, 2026.</p>
        </Banner>
      ) : (
        <p className="text-sm text-muted-foreground">Payment reminder banner dismissed.</p>
      )}
    </div>
  );
};

export const FilterChipsStory: Story = () => {
  const initialFilters: FilterChip[] = [
    { id: 'status', label: 'Status', value: 'Pending payment' },
    { id: 'sale', label: 'Rep', value: 'Owen Reed' },
    { id: 'range', label: 'Date range', value: 'Jan 1–15' },
  ];
  const [filters, setFilters] = useState<FilterChip[]>(initialFilters);

  return (
    <div className="max-w-2xl p-6">
      <FilterChips
        filters={filters}
        onRemove={(id) => setFilters((prev) => prev.filter((f) => f.id !== id))}
        onClearAll={() => setFilters([])}
        resultCount={filters.length === 0 ? 128 : 17}
      />
      {filters.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No filters left — showing all 128 orders.
        </p>
      ) : null}
    </div>
  );
};
