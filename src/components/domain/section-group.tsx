import * as React from 'react';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';

interface SectionGroupProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  first?: boolean;
}

export function SectionGroup({
  title,
  description,
  children,
  className,
  first,
}: SectionGroupProps) {
  return (
    <section className={cn('flex flex-col gap-4 py-5', first ? 'pt-0' : '', className)}>
      {!first ? <Separator className="-mt-5 mb-1" /> : null}
      <div>
        <h3 className="text-base font-semibold text-foreground">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 text-xs text-muted-foreground/80">{description}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
