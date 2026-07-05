import type { Story } from '@ladle/react';
import { useState } from 'react';
import { FileText, TrendingUp, TrendingDown } from 'lucide-react';
import {
  Timeline,
  TimelineItem,
  Progress,
  Stepper,
  Sparkline,
  KpiCard,
  type StepperStep,
} from '../index';

export default { title: 'Progress & History' };

/* ------------------------------------------------------------------ */
/* Timeline — lịch sử trạng thái đơn hàng                              */
/* ------------------------------------------------------------------ */

export const TimelineStory: Story = () => (
  <div className="max-w-lg p-6">
    <p className="mb-4 text-sm font-semibold text-foreground">
      Đơn DH-2412 · Lịch sử xử lý
    </p>
    <Timeline>
      <TimelineItem
        variant="muted"
        icon={FileText}
        title="Đã tạo đơn"
        timestamp="05/07 · 08:12"
        description="4 mặt hàng · 2.480.000₫"
        actor="Chị Lan (Sale)"
      />
      <TimelineItem
        variant="info"
        title="Đã duyệt"
        timestamp="05/07 · 09:05"
        description="Duyệt công nợ trong hạn mức 5.000.000₫"
      />
      <TimelineItem
        variant="warning"
        title="Đang đóng gói"
        timestamp="05/07 · 10:20"
        description="Kho Bình Tân đóng 8/12 món"
      />
      <TimelineItem
        variant="success"
        title="Đã xuất kho"
        timestamp="05/07 · 11:40"
        description="Bàn giao cho tài xế Nhà xe Phương Trang"
      />
      <TimelineItem
        variant="primary"
        title="Đang giao"
        timestamp="05/07 · 13:15"
        description="Dự kiến giao trước 17:00 hôm nay"
        isLast
      />
    </Timeline>
  </div>
);

/* ------------------------------------------------------------------ */
/* Progress — thanh tiến độ                                            */
/* ------------------------------------------------------------------ */

export const ProgressStory: Story = () => (
  <div className="flex max-w-md flex-col gap-8 p-6">
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">Giá trị · md</p>
      <Progress value={25} showValue />
      <Progress value={60} showValue />
      <Progress value={100} variant="success" showValue />
    </div>

    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">4 biến thể · sm</p>
      <Progress value={45} variant="default" size="sm" />
      <Progress value={70} variant="success" size="sm" />
      <Progress value={55} variant="warning" size="sm" />
      <Progress value={30} variant="destructive" size="sm" />
    </div>

    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">Có nhãn</p>
      <Progress
        value={8}
        max={12}
        variant="warning"
        showValue
        label="Đang đóng gói 8/12 món"
      />
    </div>

    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">Không xác định</p>
      <Progress indeterminate showValue label="Đang đồng bộ tồn kho" />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Stepper — luồng tạo đơn                                             */
/* ------------------------------------------------------------------ */

const ORDER_STEPS: StepperStep[] = [
  { label: 'Chọn khách', description: 'Chị Lan · Quán bún' },
  { label: 'Thêm sản phẩm', description: '4 mặt hàng' },
  { label: 'Giao hàng', description: 'Ship COD' },
  { label: 'Xác nhận', description: 'Duyệt & tạo đơn' },
];

export const StepperStory: Story = () => {
  const [current, setCurrent] = useState(2);

  return (
    <div className="flex flex-col gap-12 p-6">
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="text-sm font-semibold text-foreground">
          Ngang · bước 2 (Thêm sản phẩm)
        </p>
        <Stepper steps={ORDER_STEPS} current={1} orientation="horizontal" />
      </div>

      <div className="flex max-w-xs flex-col gap-4">
        <p className="text-sm font-semibold text-foreground">
          Dọc · bước 3 (Giao hàng)
        </p>
        <Stepper steps={ORDER_STEPS} current={2} orientation="vertical" />
      </div>

      <div className="flex max-w-2xl flex-col gap-4">
        <p className="text-sm font-semibold text-foreground">
          Điều hướng · bấm bước đã hoàn tất (hiện tại: {ORDER_STEPS[current]?.label})
        </p>
        <Stepper
          steps={ORDER_STEPS}
          current={current}
          orientation="horizontal"
          onStepClick={setCurrent}
        />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Sparkline — xu hướng doanh thu                                      */
/* ------------------------------------------------------------------ */

// Doanh thu 12 ngày gần nhất (triệu đồng).
const REVENUE = [18, 21, 19, 24, 22, 27, 31, 28, 34, 33, 38, 42];
const REVENUE_DOWN = [42, 40, 43, 38, 36, 37, 31, 29, 27, 24, 22, 19];

export const SparklineStory: Story = () => (
  <div className="flex flex-col gap-10 p-6">
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">Biến thể · có vùng nền</p>
      <div className="flex flex-wrap items-center gap-6">
        <Sparkline data={REVENUE} variant="primary" width={140} height={40} />
        <Sparkline data={REVENUE} variant="success" width={140} height={40} />
        <Sparkline data={REVENUE_DOWN} variant="destructive" width={140} height={40} />
        <Sparkline data={REVENUE} variant="muted" width={140} height={40} />
      </div>
    </div>

    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">
        Chỉ đường · không vùng nền, không điểm cuối
      </p>
      <div className="flex flex-wrap items-center gap-6">
        <Sparkline
          data={REVENUE}
          variant="primary"
          showArea={false}
          showEndpoint={false}
          width={140}
          height={40}
        />
        <Sparkline
          data={REVENUE}
          variant="success"
          showArea={false}
          width={140}
          height={40}
        />
      </div>
    </div>

    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">
        KpiCard · prop sparkline
      </p>
      <div className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        <KpiCard
          label="Doanh thu 12 ngày"
          value="42,0tr"
          hint="So với kỳ trước"
          trend={{ value: 18, positive: true }}
          icon={<TrendingUp className="h-5 w-5" />}
          tone="success"
          sparkline={REVENUE}
        />
        <KpiCard
          label="Công nợ quá hạn"
          value="19,0tr"
          hint="So với kỳ trước"
          trend={{ value: 12, positive: false }}
          icon={<TrendingDown className="h-5 w-5" />}
          tone="warning"
          sparkline={REVENUE_DOWN}
        />
      </div>
    </div>
  </div>
);
