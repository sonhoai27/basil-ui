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

type Density = 'comfortable' | 'compact';

/** Ảnh chụp trạng thái bảng để lưu/áp dụng saved view. */
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
  /** Click cả dòng (mở chi tiết). Bỏ qua khi bấm vào button/checkbox/menu trong dòng. */
  onRowClick?: (row: TData) => void;
  getRowId?: (row: TData) => string;
  /** Bật cột checkbox chọn dòng. */
  enableRowSelection?: boolean;
  /** Render thanh hành động hàng loạt khi có dòng được chọn. */
  bulkActions?: (selected: TData[], clear: () => void) => React.ReactNode;
  /** Toolbar trên bảng — ReactNode, hoặc hàm nhận `table` để render faceted filter / search tuỳ biến. */
  toolbar?: React.ReactNode | ((table: TanTable<TData>) => React.ReactNode);
  /** Caption ẩn (screen-reader) mô tả bảng. */
  caption?: string;
  /** Nhãn a11y cho bảng khi không dùng caption. */
  'aria-label'?: string;

  /* --- Depth --- */
  /** Mật độ dòng ban đầu. */
  density?: Density;
  /** Hiện nút chuyển mật độ Thoáng/Gọn. */
  densityToggle?: boolean;
  /** Chiều cao tối đa vùng bảng (bật cuộn dọc). Header sẽ dính khi cuộn. */
  maxHeight?: number | string;
  /** Ghim header khi cuộn dọc (mặc định bật khi có maxHeight). */
  stickyHeader?: boolean;
  /** Ghim cột đầu (mã đơn/khách) khi cuộn ngang. Gồm cả cột chọn nếu bật. */
  pinFirstColumn?: boolean;
  /** Bật nút "Cột" để ẩn/hiện cột. Dùng column.meta.label hoặc header string làm nhãn. */
  enableColumnVisibility?: boolean;
  /** Bật ô tìm kiếm chung (lọc client). Truyền chuỗi để đổi placeholder. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Hiện ô chọn số dòng/trang, ví dụ [15, 30, 50]. */
  pageSizeOptions?: number[];
  /** Tổng số kết quả (hiển thị "N kết quả"). Với server-side, truyền tổng thật. */
  rowCount?: number;
  /** Số trang tổng do server cung cấp → bật chế độ phân trang server (manual). */
  pageCount?: number;
  /** Gọi khi trang/kích thước trang đổi (dùng cho fetch server-side). */
  onPaginationChange?: (state: PaginationState) => void;

  /* --- Trạng thái rỗng do lọc --- */
  /** App tự báo đang lọc (server-side) để hiện empty-đã-lọc thay vì empty thật. */
  isFiltered?: boolean;
  filteredEmptyTitle?: string;
  filteredEmptyDescription?: string;
  /** Xoá bộ lọc từ trạng thái empty-đã-lọc (server-side). Search/faceted nội bộ tự xoá. */
  onClearFilters?: () => void;

  /* --- Chọn tất cả xuyên trang (server-side) --- */
  /** Gọi khi bấm "Chọn tất cả N" lúc phân trang server. */
  onSelectAllAcrossPages?: () => void;

  /* --- Kéo giãn cột --- */
  /** Cho kéo giãn độ rộng cột (dùng column.size / minSize / maxSize trong def). */
  enableColumnResizing?: boolean;

  /* --- Saved views --- */
  /** Giá trị khởi tạo (seed) cho bộ lọc/ẩn cột/tìm kiếm — dùng với saved views. */
  initialColumnFilters?: ColumnFiltersState;
  initialColumnVisibility?: VisibilityState;
  initialGlobalFilter?: string;
  /** Emit trạng thái (sorting/filters/visibility/search) mỗi khi đổi — để app snapshot lưu view. */
  onStateChange?: (state: DataTableViewState) => void;
  /** Áp một saved view: khi đối tượng này đổi tham chiếu, bảng áp lại trạng thái. */
  appliedView?: DataTableViewState;
}

/** Nhãn cột cho menu ẩn/hiện: column.meta.label → header string → id. */
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
  emptyTitle = 'Không có dữ liệu',
  emptyDescription,
  emptyAction,
  pageSize = 15,
  initialSorting,
  onRowClick,
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

  // Áp saved view khi tham chiếu `appliedView` đổi (app điều khiển thời điểm).
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

  // Emit trạng thái để app snapshot (lưu view).
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
          aria-label="Chọn tất cả"
        />
      ),
      cell: ({ row }) => (
        <span onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            aria-label="Chọn dòng"
          />
        </span>
      ),
      enableSorting: false,
      enableHiding: false,
    };
    return [selectCol, ...columns];
  }, [columns, enableRowSelection]);

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

  // --- Pinning (CSS sticky với offset cố định — cột chọn = w-12/48px) ---
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
        // theo trạng thái dòng để cột ghim không "trơ" khi hover/chọn
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
                  placeholder={searchPlaceholder ?? 'Tìm kiếm…'}
                  className="w-full pl-8 sm:w-64"
                  aria-label="Tìm kiếm"
                />
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            {densityToggle ? (
              <SegmentedControl
                size="sm"
                ariaLabel="Mật độ hiển thị"
                value={densityState}
                onChange={(v) => setDensityState(v as Density)}
                options={[
                  { value: 'comfortable', label: 'Thoáng' },
                  { value: 'compact', label: 'Gọn' },
                ]}
              />
            ) : null}
            {enableColumnVisibility && hidableColumns.length > 0 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" leadingIcon={<SlidersHorizontal size={14} />}>
                    Cột
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Hiện cột</DropdownMenuLabel>
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
              {allSelected ? `Đã chọn tất cả ${totalFiltered}` : `Đã chọn ${selectedRows.length}`}
            </span>
            {!allSelected && allPageSelected && moreBeyondPage && !manualPagination ? (
              <Button variant="link" size="sm" onClick={() => table.toggleAllRowsSelected(true)}>
                Chọn tất cả {totalFiltered}
              </Button>
            ) : null}
            {!allSelected && allPageSelected && manualPagination && onSelectAllAcrossPages ? (
              <Button variant="link" size="sm" onClick={onSelectAllAcrossPages}>
                Chọn tất cả {rowCount}
              </Button>
            ) : null}
          </div>
          <div className="flex items-center gap-2">{bulkActions(selectedRows, clearSelection)}</div>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {isError ? (
          <ErrorState
            description="Không tải được dữ liệu. Kiểm tra kết nối rồi thử lại."
            action={onRetry ? { label: 'Thử lại', onClick: onRetry } : undefined}
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
              title={filteredEmptyTitle ?? 'Không tìm thấy kết quả phù hợp'}
              description={filteredEmptyDescription ?? 'Thử đổi từ khoá hoặc bỏ bớt bộ lọc.'}
              action={canClear ? { label: 'Xoá bộ lọc', onClick: clearFilters } : undefined}
            />
          ) : (
            <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
          )
        ) : (
            <Table aria-label={caption ? undefined : ariaLabel} className={densityCls} style={tableStyle} containerStyle={scrollStyle}>
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
                              title="Kéo để giãn cột"
                              className="group/rz absolute right-0 top-0 z-[1] flex h-full w-3 cursor-col-resize touch-none select-none justify-end"
                            >
                              {/* Vạch chia luôn hiển thị → biết cột kéo được; đậm + xanh khi hover/kéo */}
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
        )}
      </div>

      {showFooter ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            {rowCount !== undefined ? (
              <span className="font-tabular text-xs text-muted-foreground">{rowCount} kết quả</span>
            ) : null}
            {pageSizeOptions ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Số dòng</span>
                <Select
                  value={String(pagination.pageSize)}
                  onValueChange={(v) => table.setPageSize(Number(v))}
                >
                  <SelectTrigger className="h-8 w-[74px]" aria-label="Số dòng mỗi trang">
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
