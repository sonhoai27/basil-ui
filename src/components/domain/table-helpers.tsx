import * as React from 'react';
import type { Column } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '../../lib/utils';
import { KebabMenu, type KebabMenuItem } from './kebab-menu';

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

/**
 * Sortable header cell for a @tanstack/react-table `ColumnDef.header`.
 * Renders a ghost sort-toggle button when the column is sortable, otherwise
 * plain header text. The arrow icon reflects the current sort direction.
 */
export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div
        className={cn(
          'text-xs font-medium uppercase tracking-wide text-muted-foreground',
          className,
        )}
        {...props}
      >
        {title}
      </div>
    );
  }

  const sorted = column.getIsSorted();

  return (
    <div className={cn('flex items-center', className)} {...props}>
      <button
        type="button"
        onClick={column.getToggleSortingHandler()}
        className={cn(
          '-ml-1 inline-flex items-center gap-1 rounded-md px-1 py-0.5',
          'text-xs font-medium uppercase tracking-wide text-muted-foreground',
          'transition-colors hover:text-foreground',
          'data-[sorted=true]:text-foreground',
        )}
        data-sorted={sorted ? 'true' : 'false'}
      >
        <span>{title}</span>
        {sorted === 'asc' ? (
          <ChevronUp className="size-4" />
        ) : sorted === 'desc' ? (
          <ChevronDown className="size-4" />
        ) : (
          <ArrowUpDown className="size-4 opacity-50" />
        )}
      </button>
    </div>
  );
}

export interface DataTableRowAction {
  label: string;
  icon?: React.ReactNode;
  onSelect: () => void;
  destructive?: boolean;
}

export interface DataTableRowActionsProps {
  actions: DataTableRowAction[];
}

/**
 * Row-level overflow menu for a @tanstack/react-table row. Renders a kebab
 * button (aligned end) listing the given actions; destructive items are
 * styled with `text-destructive`.
 */
export function DataTableRowActions({ actions }: DataTableRowActionsProps) {
  return <KebabMenu items={actions as KebabMenuItem[]} align="end" />;
}
