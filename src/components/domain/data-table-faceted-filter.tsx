import * as React from 'react';
import type { Column } from '@tanstack/react-table';
import { Check, PlusCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import { useMessages } from '../../i18n';

export interface FacetedFilterOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface DataTableFacetedFilterProps<TData> {
  /** Column from `table.getColumn(id)` (use the DataTable toolbar render prop). */
  column?: Column<TData, unknown>;
  title: string;
  options: FacetedFilterOption[];
}

/**
 * Faceted filter for a single column (multi-select) — filter chips + a count per value.
 * The column needs a filterFn that accepts an array, e.g.:
 *   filterFn: (row, id, val) => (val as string[]).includes(row.getValue(id))
 */
export function DataTableFacetedFilter<TData>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData>) {
  const t = useMessages();
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set((column?.getFilterValue() as string[] | undefined) ?? []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed" leadingIcon={<PlusCircle size={14} />}>
          {title}
          {selectedValues.size > 0 ? (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="soft-primary" size="sm" className="font-tabular lg:hidden">
                {selectedValues.size}
              </Badge>
              <div className="hidden gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge variant="soft-primary" size="sm" className="font-tabular">
                    {selectedValues.size} {t.facetedFilter.selected}
                  </Badge>
                ) : (
                  options
                    .filter((o) => selectedValues.has(o.value))
                    .map((o) => (
                      <Badge key={o.value} variant="soft-primary" size="sm">
                        {o.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>{t.facetedFilter.empty}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const next = new Set(selectedValues);
                      if (isSelected) next.delete(option.value);
                      else next.add(option.value);
                      const arr = Array.from(next);
                      column?.setFilterValue(arr.length ? arr : undefined);
                    }}
                  >
                    <span
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {option.icon ? (
                      <span className="mr-2 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
                        {option.icon}
                      </span>
                    ) : null}
                    <span className="flex-1">{option.label}</span>
                    {facets?.get(option.value) ? (
                      <span className="font-tabular ml-auto flex h-4 items-center text-xs text-muted-foreground">
                        {facets.get(option.value)}
                      </span>
                    ) : null}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 ? (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    {t.facetedFilter.clearFilters}
                  </CommandItem>
                </CommandGroup>
              </>
            ) : null}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
