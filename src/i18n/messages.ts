/**
 * Basil message dictionary — every user-facing DEFAULT string in the library.
 * Props still override these per-instance; this is the fallback layer.
 *
 * Ship your own locale by implementing `Messages` (see `en` / `vi`) and passing it
 * to `<BasilProvider messages={...}>`. Interpolated strings are functions.
 */
export interface Messages {
  common: {
    loading: string;
    retry: string;
    clear: string;
    cancel: string;
    save: string;
    search: string;
    selectAll: string;
    previous: string;
    next: string;
    /** e.g. "Remove" / "Remove {label}" */
    remove: (label?: string) => string;
    /** e.g. "240 results" */
    results: (n: number) => string;
  };
  table: {
    noData: string;
    noResults: string;
    filteredEmptyTitle: string;
    filteredEmptyDescription: string;
    errorDescription: string;
    clearFilters: string;
    columns: string;
    showColumns: string;
    rows: string;
    rowsPerPage: string;
    density: string;
    densityComfortable: string;
    densityCompact: string;
    searchPlaceholder: string;
    resize: string;
    selectAllAria: string;
    selectRowAria: string;
    /** e.g. "3 selected" */
    selected: (n: number) => string;
    /** e.g. "All 240 selected" */
    selectedAll: (n: number) => string;
    /** e.g. "Select all 240" */
    selectAllN: (n: number) => string;
  };
  pagination: {
    aria: string;
    /** e.g. "Page 2 / 12" */
    pageOf: (page: number, count: number) => string;
  };
  combobox: {
    placeholder: string;
    searchPlaceholder: string;
    empty: string;
    clear: string;
    /** e.g. 'Create "Acme"' */
    create: (query: string) => string;
  };
  multiSelect: {
    placeholder: string;
    searchPlaceholder: string;
    empty: string;
  };
  datePicker: {
    placeholder: string;
    clear: string;
  };
  dateRangePicker: {
    placeholder: string;
    clear: string;
    presetToday: string;
    preset7d: string;
    preset30d: string;
    presetThisMonth: string;
  };
  numberField: {
    decrease: string;
    increase: string;
  };
  inputOtp: {
    aria: string;
    /** e.g. "Digit 3" */
    digit: (n: number) => string;
  };
  fileUpload: {
    /** Main prompt inside the dropzone, e.g. "Drag and drop or click to select" */
    hint: string;
    /** e.g. "Remove report.pdf" */
    remove: (name: string) => string;
    /** e.g. "2 file(s) over 5 MB were skipped." */
    overSizeSkipped: (count: number, maxMB: number) => string;
    /** e.g. "1 file(s) of the wrong type were skipped." */
    wrongTypeSkipped: (count: number) => string;
  };
  savedViews: {
    all: string;
    rename: string;
    delete: string;
    renameTitle: string;
    namePlaceholder: string;
    cancel: string;
    save: string;
    saveCurrent: string;
    aria: string;
  };
  facetedFilter: {
    empty: string;
    clearFilters: string;
    selected: string;
  };
  filterChips: {
    filtering: string;
    clearAll: string;
    /** e.g. "Remove Status filter" */
    remove: (label: string) => string;
    /** e.g. "· 240 results" */
    results: (n: number) => string;
  };
  status: {
    pending_payment: string;
    paid: string;
    packing: string;
    sent: string;
    cancelled: string;
  };
  errorState: {
    title: string;
  };
  banner: {
    dismiss: string;
  };
  confirmDialog: {
    confirm: string;
    cancel: string;
  };
  timeline: {
    /** e.g. "by Nina" */
    by: (actor: string) => string;
  };
  badges: {
    outOfStock: string;
  };
  kebab: {
    open: string;
  };
}
