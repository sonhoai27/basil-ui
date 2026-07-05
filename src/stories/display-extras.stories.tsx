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
      <p className="text-sm font-semibold text-foreground">Đơn DH-2401 · 1 cột</p>
      <DescriptionList columns={1}>
        <DescriptionItem term="SĐT">0912 345 678</DescriptionItem>
        <DescriptionItem term="Địa chỉ">
          128 Nguyễn Trãi, P. Bến Thành, Q.1, TP.HCM
        </DescriptionItem>
        <DescriptionItem term="Tổng tiền" numeric>
          1.250.000₫
        </DescriptionItem>
        <DescriptionItem term="Trạng thái">
          <span className="rounded-md bg-warning-bg px-2 py-0.5 text-xs font-medium text-warning-text">
            Chờ thanh toán
          </span>
        </DescriptionItem>
      </DescriptionList>
    </div>

    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-foreground">
        Đơn DH-2402 · 2 cột + divided
      </p>
      <DescriptionList columns={2} divided>
        <DescriptionItem term="SĐT">0987 654 321</DescriptionItem>
        <DescriptionItem term="Địa chỉ">
          45 Lê Lợi, P. Phú Nhuận, TP.HCM
        </DescriptionItem>
        <DescriptionItem term="Tổng tiền" numeric>
          3.480.000₫
        </DescriptionItem>
        <DescriptionItem term="Trạng thái">
          <span className="rounded-md bg-success-bg px-2 py-0.5 text-xs font-medium text-success-text">
            Đã thanh toán
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
      <Banner variant="info" title="Đợt nhập hàng mới">
        <p>Lô Chả lụa và Giò thủ sẽ về kho lúc 14:00 ngày 15/01/2026.</p>
      </Banner>

      <Banner variant="success" title="Đã thanh toán">
        <p>Đơn DH-2401 của Chị Lan · Quán bún đã thanh toán đủ 1.250.000₫.</p>
      </Banner>

      <Banner variant="warning" title="Sắp hết hàng">
        <p>Nem chua chỉ còn 12 phần trong kho — cân nhắc nhập thêm.</p>
      </Banner>

      <Banner variant="destructive" title="Đơn đã huỷ">
        <p>Đơn DH-2399 đã bị huỷ do khách không xác nhận trong 48 giờ.</p>
      </Banner>

      {showDismissable ? (
        <Banner
          variant="info"
          title="Nhắc nhở công nợ"
          action={
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md bg-info-text/10 px-2.5 py-1 text-xs font-semibold text-info-text transition-colors hover:bg-info-text/20"
            >
              Xem chi tiết
              <ExternalLink className="size-3.5" aria-hidden />
            </button>
          }
          onDismiss={() => setShowDismissable(false)}
        >
          <p>Anh Tuấn · Tạp hoá còn nợ 2.100.000₫, hạn 20/01/2026.</p>
        </Banner>
      ) : (
        <p className="text-sm text-muted-foreground">Đã đóng banner nhắc nợ.</p>
      )}
    </div>
  );
};

export const FilterChipsStory: Story = () => {
  const initialFilters: FilterChip[] = [
    { id: 'status', label: 'Trạng thái', value: 'Chờ thanh toán' },
    { id: 'sale', label: 'Sale', value: 'Anh Tuấn' },
    { id: 'range', label: 'Khoảng ngày', value: '01–15/01' },
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
          Không còn bộ lọc — hiển thị tất cả 128 đơn.
        </p>
      ) : null}
    </div>
  );
};
