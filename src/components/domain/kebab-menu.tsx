import * as React from 'react';
import { MoreHorizontal } from 'lucide-react';

import { cn } from '../../lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export interface KebabMenuItem {
  label: string;
  icon?: React.ReactNode;
  onSelect: () => void;
  destructive?: boolean;
}

export interface KebabMenuProps {
  items: KebabMenuItem[];
  align?: 'start' | 'center' | 'end';
}

/**
 * Standalone reusable "more" menu — a kebab icon-button that opens a
 * DropdownMenu listing the given actions. Use anywhere a row/card/section
 * needs an overflow menu.
 */
export function KebabMenu({ items, align = 'end' }: KebabMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open menu"
        className={cn(
          'inline-flex size-8 items-center justify-center rounded-md text-muted-foreground',
          'transition-colors hover:bg-muted hover:text-foreground',
          'disabled:pointer-events-none disabled:opacity-50',
          'data-[state=open]:bg-muted data-[state=open]:text-foreground',
        )}
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {items.map((item, i) => (
          <DropdownMenuItem
            key={i}
            onSelect={item.onSelect}
            className={cn(item.destructive && 'text-destructive focus:text-destructive')}
          >
            {item.icon}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
