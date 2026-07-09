import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type Table as TanTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from './button';
import { SegmentedControl } from './segmented-control';
import { EmptyState, ErrorState } from './empty-state';
import { Pagination } from './pagination';
import { cn } from '../../lib/utils';
import { useMessages } from '../../i18n';

type Density = 'comfortable' | 'compact';

/** Snapshot of table state used to save/apply a saved view. */
export interface DataTableViewState {
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  globalFilter?: string;
  columnVisibility?: VisibilityState;
}

export interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: { label: string; onClick: () => void };
  pageSize?: number;
  initialSorting?: SortingState;
  /** Click the whole row (open detail). Ignored when clicking a button/checkbox/menu inside the row. */
  onRowClick?: (row: TData) => void;
  /**
   * Below the `md` breakpoint, render each row as this card instead of a table row
   * (the table scrolls out of view on narrow screens). Omit → table-only at all
   * widths (current behavior). Pairs well with the `DataCard` layout primitive.
   */
  renderMobileCard?: (row: TData) => React.ReactNode;
  getRowId?: (row: TData) => string;
  /** Enable the row-selection checkbox column. */
  enableRowSelection?: boolean;
  /** Render the bulk-actions bar when rows are selected. */
  bulkActions?: (selected: TData[], clear: () => void) => React.ReactNode;
  /** Toolbar above the table — a ReactNode, or a function receiving `table` to render a custom faceted filter / search. */
  toolbar?: React.ReactNode | ((table: TanTable<TData>) => React.ReactNode);
  /** Hidden (screen-reader) caption describing the table. */
  caption?: string;
  /** a11y label for the table when no caption is used. */
  'aria-label'?: string;

  /* --- Depth --- */
  /** Initial row density. */
  density?: Density;
  /** Show the Comfortable/Compact density toggle. */
  densityToggle?: boolean;
  /** Max height of the table area (enables vertical scroll). The header sticks while scrolling. */
  maxHeight?: number | string;
  /** Pin the header on vertical scroll (defaults on when maxHeight is set). */
  stickyHeader?: boolean;
  /** Pin the first column (order/customer id) on horizontal scroll. Includes the select column if enabled. */
  pinFirstColumn?: boolean;
  /** Enable the "Columns" button to show/hide columns. Uses column.meta.label or the header string as the label. */
  enableColumnVisibility?: boolean;
  /** Enable the global search box (client-side filter). Pass a string to change the placeholder. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Show the rows-per-page selector, e.g. [15, 30, 50]. */
  pageSizeOptions?: number[];
  /** Total number of results (shown as "N results"). For server-side, pass the true total. */
  rowCount?: number;
  /** Total page count provided by the server → enables manual (server-side) pagination. */
  pageCount?: number;
  /** Called when the page/page size changes (use for server-side fetches). */
  onPaginationChange?: (state: PaginationState) => void;

  /* --- Filtered-empty state --- */
  /** App reports filtering itself (server-side) to show the filtered-empty state instead of the true empty. */
  isFiltered?: boolean;
  filteredEmptyTitle?: string;
  filteredEmptyDescription?: string;
  /** Clear filters from the filtered-empty state (server-side). Built-in search/faceted filters clear themselves. */
  onClearFilters?: () => void;

  /* --- Select all across pages (server-side) --- */
  /** Called when "Select all N" is clicked during server-side pagination. */
  onSelectAllAcrossPages?: () => void;

  /* --- Column resizing --- */
  /** Allow resizing column widths (uses column.size / minSize / maxSize in the def). */
  enableColumnResizing?: boolean;

  /* --- Saved views --- */
  /** Seed values for filters/hidden columns/search — used with saved views. */
  initialColumnFilters?: ColumnFiltersState;
  initialColumnVisibility?: VisibilityState;
  initialGlobalFilter?: string;
  /** Emit state (sorting/filters/visibility/search) on every change — so the app can snapshot a view. */
  onStateChange?: (state: DataTableViewState) => void;
  /** Apply a saved view: when this object's reference changes, the table re-applies the state. */
  appliedView?: DataTableViewState;
}

/** Column label for the show/hide menu: column.meta.label → header string → id. */
function columnLabel<TData>(col: { id: string; columnDef: ColumnDef<TData, unknown> }): string {
  const meta = col.columnDef.meta as { label?: string } | undefined;
  if (meta?.label) return meta.label;
  const h = col.columnDef.header;
  if (typeof h === 'string') return h;
  return col.id;
}

export function DataTable<TData>({
  columns,
  data,
  isLoading,
  isError,
  onRetry,
  emptyTitle,
  emptyDescription,
  emptyAction,
  pageSize = 15,
  initialSorting,
  onRowClick,
  renderMobileCard,
  getRowId,
  enableRowSelection,
  bulkActions,
  toolbar,
  caption,
  'aria-label': ariaLabel,
  density = 'comfortable',
  densityToggle,
  maxHeight,
  stickyHeader,
  pinFirstColumn,
  enableColumnVisibility,
  searchable,
  searchPlaceholder,
  pageSizeOptions,
  rowCount,
  pageCount,
  onPaginationChange,
  isFiltered,
  filteredEmptyTitle,
  filteredEmptyDescription,
  onClearFilters,
  onSelectAllAcrossPages,
  enableColumnResizing,
  initialColumnFilters,
  initialColumnVisibility,
  initialGlobalFilter,
  onStateChange,
  appliedView,
}: DataTableProps<TData>) {
  const t = useMessages();
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting ?? []);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    initialColumnVisibility ?? {},
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    initialColumnFilters ?? [],
  );
  const [globalFilter, setGlobalFilter] = React.useState(initialGlobalFilter ?? '');
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize });
  const [densityState, setDensityState] = React.useState<Density>(density);

  // Apply the saved view when the `appliedView` reference changes (the app controls timing).
  const appliedRef = React.useRef(appliedView);
  React.useEffect(() => {
    if (appliedView && appliedView !== appliedRef.current) {
      appliedRef.current = appliedView;
      setSorting(appliedView.sorting ?? []);
      setColumnFilters(appliedView.columnFilters ?? []);
      setGlobalFilter(appliedView.globalFilter ?? '');
      setColumnVisibility(appliedView.columnVisibility ?? {});
      setPagination((p) => ({ ...p, pageIndex: 0 }));
    }
  }, [appliedView]);

  // Emit state so the app can snapshot (save the view).
  React.useEffect(() => {
    onStateChange?.({ sorting, columnFilters, globalFilter, columnVisibility });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, columnFilters, globalFilter, columnVisibility]);

  const manualPagination = pageCount !== undefined;

  const allColumns = React.useMemo<ColumnDef<TData, unknown>[]>(() => {
    if (!enableRowSelection) return columns;
    const selectCol: ColumnDef<TData, unknown> = {
      id: '__select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label={t.table.selectAllAria}
        />
      ),
      cell: ({ row }) => (
        <span onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            aria-label={t.table.selectRowAria}
          />
        </span>
      ),
      enableSorting: false,
      enableHiding: false,
    };
    return [selectCol, ...columns];
  }, [columns, enableRowSelection, t]);

  const table = useReactTable({
    data,
    columns: allColumns,
    state: { sorting, pagination, rowSelection, columnVisibility, columnFilters, globalFilter },
    getRowId,
    enableRowSelection,
    enableColumnResizing,
    columnResizeMode: 'onChange',
    manualPagination,
    pageCount: manualPagination ? pageCount : undefined,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      setPagination((old) => {
        const next = typeof updater === 'function' ? updater(old) : updater;
        onPaginationChange?.(next);
        return next;
      });
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
  });

  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original);
  const clearSelection = () => setRowSelection({});

  function handleRowClick(e: React.MouseEvent, original: TData) {
    if (!onRowClick) return;
    if ((e.target as HTMLElement).closest('button, a, input, label, [role="checkbox"], [role="menu"], [data-no-row-click]'))
      return;
    onRowClick(original);
  }

  // --- Pinning (CSS sticky with a fixed offset — select column = w-12/48px) ---
  const pinCount = pinFirstColumn ? (enableRowSelection ? 2 : 1) : 0;
  function pinProps(index: number, isHeader: boolean): { className?: string; style?: React.CSSProperties } {
    if (index >= pinCount) return {};
    const isLast = index === pinCount - 1;
    return {
      className: cn(
        'sticky bg-card',
        index === 0 ? 'left-0' : 'left-12',
        enableRowSelection && index === 0 && 'w-12',
        isLast && 'border-r border-border',
        // follow the row state so the pinned column doesn't look detached on hover/select
        !isHeader && 'group-hover:bg-accent group-data-[state=selected]:bg-primary-subtle',
      ),
      style: { zIndex: isHeader ? 11 : 2 },
    };
  }

  const sticky = stickyHeader ?? maxHeight !== undefined;
  const headRowCls = cn(
    'hover:bg-transparent',
    sticky && '[&>th]:sticky [&>th]:top-0 [&>th]:z-10 [&>th]:bg-card',
  );
  const densityCls = densityState === 'compact' ? '[&_td]:py-1.5 [&_th]:h-9' : undefined;
  const scrollStyle: React.CSSProperties | undefined =
    maxHeight !== undefined
      ? { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }
      : undefined;
  const tableStyle: React.CSSProperties | undefined = enableColumnResizing
    ? { width: table.getCenterTotalSize(), tableLayout: 'fixed' }
    : undefined;

  const hidableColumns = table.getAllColumns().filter((c) => c.getCanHide());
  const showPagination = table.getPageCount() > 1;
  const showFooter = showPagination || !!pageSizeOptions || rowCount !== undefined;

  // --- Empty / filtered-empty ---
  const rows = table.getRowModel().rows;
  const builtinFilterActive = globalFilter.trim().length > 0 || columnFilters.length > 0;
  const filterActive = isFiltered ?? builtinFilterActive;
  const showFilteredEmpty = rows.length === 0 && (filterActive || data.length > 0);
  const canClear = Boolean(onClearFilters) || builtinFilterActive;
  const clearFilters = () => {
    onClearFilters?.();
    setGlobalFilter('');
    setColumnFilters([]);
  };

  // --- Select-all-across-pages ---
  const pageRowCount = rows.length;
  const totalFiltered = manualPagination
    ? (rowCount ?? data.length)
    : table.getFilteredRowModel().rows.length;
  const allPageSelected = table.getIsAllPageRowsSelected();
  const allSelected = table.getIsAllRowsSelected();
  const moreBeyondPage = totalFiltered > pageRowCount;

  const toolbarNode = typeof toolbar === 'function' ? toolbar(table) : toolbar;
  const hasControls =
    !!searchable || !!densityToggle || (!!enableColumnVisibility && hidableColumns.length > 0);

  return (
    <div className="flex flex-col gap-3">
      {toolbarNode}

      {hasControls ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            {searchable ? (
              <div className="relative">
                <Search
                  size={15}
                  className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder={searchPlaceholder ?? t.table.searchPlaceholder}
                  className="w-full pl-8 sm:w-64"
                  aria-label={t.common.search}
                />
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            {densityToggle ? (
              <SegmentedControl
                size="sm"
                ariaLabel={t.table.density}
                value={densityState}
                onChange={(v) => setDensityState(v as Density)}
                options={[
                  { value: 'comfortable', label: t.table.densityComfortable },
                  { value: 'compact', label: t.table.densityCompact },
                ]}
              />
            ) : null}
            {enableColumnVisibility && hidableColumns.length > 0 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" leadingIcon={<SlidersHorizontal size={14} />}>
                    {t.table.columns}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>{t.table.showColumns}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {hidableColumns.map((col) => (
                    <DropdownMenuCheckboxItem
                      key={col.id}
                      checked={col.getIsVisible()}
                      onCheckedChange={(v) => col.toggleVisibility(!!v)}
                      onSelect={(e) => e.preventDefault()}
                    >
                      {columnLabel(col)}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        </div>
      ) : null}

      {bulkActions && selectedRows.length > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-primary-subtle px-4 py-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-primary">
              {allSelected ? t.table.selectedAll(totalFiltered) : t.table.selected(selectedRows.length)}
            </span>
            {!allSelected && allPageSelected && moreBeyondPage && !manualPagination ? (
              <Button variant="link" size="sm" onClick={() => table.toggleAllRowsSelected(true)}>
                {t.table.selectAllN(totalFiltered)}
              </Button>
            ) : null}
            {!allSelected && allPageSelected && manualPagination && onSelectAllAcrossPages ? (
              <Button variant="link" size="sm" onClick={onSelectAllAcrossPages}>
                {t.table.selectAllN(rowCount ?? 0)}
              </Button>
            ) : null}
          </div>
          <div className="flex items-center gap-2">{bulkActions(selectedRows, clearSelection)}</div>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {isError ? (
          <ErrorState
            description={t.table.errorDescription}
            action={onRetry ? { label: t.common.retry, onClick: onRetry } : undefined}
          />
        ) : isLoading ? (
            <Table aria-label={ariaLabel ?? caption} aria-busy className={densityCls} style={tableStyle} containerStyle={scrollStyle}>
              {caption ? <TableCaption className="sr-only">{caption}</TableCaption> : null}
              <TableHeader>
                <TableRow className={headRowCls}>
                  {table.getHeaderGroups()[0]?.headers.map((h, i) => {
                    const p = pinProps(i, true);
                    return (
                      <TableHead key={h.id} scope="col" className={p.className} style={p.style}>
                        {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 6 }).map((_, r) => (
                  <TableRow key={r} className="hover:bg-transparent">
                    {table.getVisibleLeafColumns().map((_, c) => {
                      const p = pinProps(c, false);
                      return (
                        <TableCell key={c} className={p.className} style={p.style}>
                          <Skeleton className="h-4 w-full" />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        ) : rows.length === 0 ? (
          showFilteredEmpty ? (
            <EmptyState
              title={filteredEmptyTitle ?? t.table.filteredEmptyTitle}
              description={filteredEmptyDescription ?? t.table.filteredEmptyDescription}
              action={canClear ? { label: t.table.clearFilters, onClick: clearFilters } : undefined}
            />
          ) : (
            <EmptyState title={emptyTitle ?? t.table.noData} description={emptyDescription} action={emptyAction} />
          )
        ) : (
          <>
            {/* Mobile: mỗi dòng thành 1 thẻ (bảng cuộn ngang không thân thiện màn nhỏ). */}
            {renderMobileCard ? (
              <ul className="divide-y divide-border md:hidden">
                {rows.map((row) => (
                  <li key={row.id}>
                    <div
                      role={onRowClick ? 'button' : undefined}
                      tabIndex={onRowClick ? 0 : undefined}
                      data-state={row.getIsSelected() ? 'selected' : undefined}
                      onClick={onRowClick ? (e) => handleRowClick(e, row.original) : undefined}
                      onKeyDown={
                        onRowClick
                          ? (e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onRowClick(row.original);
                              }
                            }
                          : undefined
                      }
                      className={cn(
                        'block px-4 py-3 outline-none transition-colors',
                        'data-[state=selected]:bg-primary-subtle',
                        onRowClick &&
                          'cursor-pointer hover:bg-accent focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
                      )}
                    >
                      {renderMobileCard(row.original)}
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
            <Table
              aria-label={caption ? undefined : ariaLabel}
              className={densityCls}
              style={tableStyle}
              containerStyle={scrollStyle}
              containerClassName={cn(renderMobileCard && 'max-md:hidden')}
            >
              {caption ? <TableCaption className="sr-only">{caption}</TableCaption> : null}
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id} className={headRowCls}>
                    {hg.headers.map((h, i) => {
                      const sorted = h.column.getIsSorted();
                      const p = pinProps(i, true);
                      const canResize = enableColumnResizing && h.column.getCanResize();
                      return (
                        <TableHead
                          key={h.id}
                          scope="col"
                          className={cn(p.className, canResize && 'relative')}
                          style={{
                            ...p.style,
                            ...(enableColumnResizing ? { width: h.getSize() } : {}),
                          }}
                          aria-sort={
                            h.column.getCanSort()
                              ? sorted === 'asc'
                                ? 'ascending'
                                : sorted === 'desc'
                                  ? 'descending'
                                  : 'none'
                              : undefined
                          }
                        >
                          {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                          {canResize ? (
                            <span
                              onMouseDown={h.getResizeHandler()}
                              onTouchStart={h.getResizeHandler()}
                              aria-hidden
                              data-resizing={h.column.getIsResizing() ? '' : undefined}
                              title={t.table.resize}
                              className="group/rz absolute right-0 top-0 z-[1] flex h-full w-3 cursor-col-resize touch-none select-none justify-end"
                            >
                              {/* Divider always visible → signals the column is resizable; thicker + green on hover/drag */}
                              <span className="h-full w-px bg-border-strong transition-all group-hover/rz:w-[3px] group-hover/rz:bg-primary group-data-[resizing]/rz:w-[3px] group-data-[resizing]/rz:bg-primary" />
                            </span>
                          ) : null}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    onClick={onRowClick ? (e) => handleRowClick(e, row.original) : undefined}
                    className={cn('group', onRowClick && 'cursor-pointer focus-within:bg-accent')}
                  >
                    {row.getVisibleCells().map((cell, i) => {
                      const p = pinProps(i, false);
                      return (
                        <TableCell key={cell.id} className={p.className} style={p.style}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>

      {showFooter ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            {rowCount !== undefined ? (
              <span className="font-tabular text-xs text-muted-foreground">{t.common.results(rowCount)}</span>
            ) : null}
            {pageSizeOptions ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{t.table.rows}</span>
                <Select
                  value={String(pagination.pageSize)}
                  onValueChange={(v) => table.setPageSize(Number(v))}
                >
                  <SelectTrigger className="h-8 w-[74px]" aria-label={t.table.rowsPerPage}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pageSizeOptions.map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}
          </div>
          {showPagination ? (
            <Pagination
              page={pagination.pageIndex + 1}
              pageCount={table.getPageCount()}
              onPageChange={(p) => table.setPageIndex(p - 1)}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
