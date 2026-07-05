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
/* Timeline — order status history                                    */
/* ------------------------------------------------------------------ */

export const TimelineStory: Story = () => (
  <div className="max-w-lg p-6">
    <p className="mb-4 text-sm font-semibold text-foreground">
      Order ORD-2412 · Processing history
    </p>
    <Timeline>
      <TimelineItem
        variant="muted"
        icon={FileText}
        title="Order created"
        timestamp="Jul 05 · 08:12"
        description="4 items · $2,480.00"
        actor="Emma Carter (Sales)"
      />
      <TimelineItem
        variant="info"
        title="Approved"
        timestamp="Jul 05 · 09:05"
        description="Credit approved within the $5,000.00 limit"
      />
      <TimelineItem
        variant="warning"
        title="Packing"
        timestamp="Jul 05 · 10:20"
        description="East Side warehouse packed 8/12 items"
      />
      <TimelineItem
        variant="success"
        title="Shipped from warehouse"
        timestamp="Jul 05 · 11:40"
        description="Handed to the Express Lines driver"
      />
      <TimelineItem
        variant="primary"
        title="Out for delivery"
        timestamp="Jul 05 · 13:15"
        description="Expected before 17:00 today"
        isLast
      />
    </Timeline>
  </div>
);

/* ------------------------------------------------------------------ */
/* Progress — progress bar                                            */
/* ------------------------------------------------------------------ */

export const ProgressStory: Story = () => (
  <div className="flex max-w-md flex-col gap-8 p-6">
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">Value · md</p>
      <Progress value={25} showValue />
      <Progress value={60} showValue />
      <Progress value={100} variant="success" showValue />
    </div>

    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">4 variants · sm</p>
      <Progress value={45} variant="default" size="sm" />
      <Progress value={70} variant="success" size="sm" />
      <Progress value={55} variant="warning" size="sm" />
      <Progress value={30} variant="destructive" size="sm" />
    </div>

    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">With label</p>
      <Progress
        value={8}
        max={12}
        variant="warning"
        showValue
        label="Packing 8/12 items"
      />
    </div>

    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">Indeterminate</p>
      <Progress indeterminate showValue label="Syncing inventory" />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Stepper — order creation flow                                      */
/* ------------------------------------------------------------------ */

const ORDER_STEPS: StepperStep[] = [
  { label: 'Choose customer', description: 'Emma Carter · The Noodle Bar' },
  { label: 'Add products', description: '4 items' },
  { label: 'Delivery', description: 'COD shipping' },
  { label: 'Confirm', description: 'Approve & create order' },
];

export const StepperStory: Story = () => {
  const [current, setCurrent] = useState(2);

  return (
    <div className="flex flex-col gap-12 p-6">
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="text-sm font-semibold text-foreground">
          Horizontal · step 2 (Add products)
        </p>
        <Stepper steps={ORDER_STEPS} current={1} orientation="horizontal" />
      </div>

      <div className="flex max-w-xs flex-col gap-4">
        <p className="text-sm font-semibold text-foreground">
          Vertical · step 3 (Delivery)
        </p>
        <Stepper steps={ORDER_STEPS} current={2} orientation="vertical" />
      </div>

      <div className="flex max-w-2xl flex-col gap-4">
        <p className="text-sm font-semibold text-foreground">
          Navigable · click a completed step (current: {ORDER_STEPS[current]?.label})
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
/* Sparkline — revenue trend                                          */
/* ------------------------------------------------------------------ */

// Revenue over the last 12 days (in thousands).
const REVENUE = [18, 21, 19, 24, 22, 27, 31, 28, 34, 33, 38, 42];
const REVENUE_DOWN = [42, 40, 43, 38, 36, 37, 31, 29, 27, 24, 22, 19];

export const SparklineStory: Story = () => (
  <div className="flex flex-col gap-10 p-6">
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">Variants · with area fill</p>
      <div className="flex flex-wrap items-center gap-6">
        <Sparkline data={REVENUE} variant="primary" width={140} height={40} />
        <Sparkline data={REVENUE} variant="success" width={140} height={40} />
        <Sparkline data={REVENUE_DOWN} variant="destructive" width={140} height={40} />
        <Sparkline data={REVENUE} variant="muted" width={140} height={40} />
      </div>
    </div>

    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">
        Line only · no area fill, no endpoint
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
        KpiCard · sparkline prop
      </p>
      <div className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        <KpiCard
          label="Revenue, 12 days"
          value="$42.0K"
          hint="vs. previous period"
          trend={{ value: 18, positive: true }}
          icon={<TrendingUp className="h-5 w-5" />}
          tone="success"
          sparkline={REVENUE}
        />
        <KpiCard
          label="Overdue balance"
          value="$19.0K"
          hint="vs. previous period"
          trend={{ value: 12, positive: false }}
          icon={<TrendingDown className="h-5 w-5" />}
          tone="warning"
          sparkline={REVENUE_DOWN}
        />
      </div>
    </div>
  </div>
);
