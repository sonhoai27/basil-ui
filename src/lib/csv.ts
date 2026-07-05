/**
 * CSV export helper — Excel-friendly and Unicode-safe (UTF-8 BOM, comma-separated).
 * Not an app feature: this is a utility for exporting table data to a file.
 */

export interface CsvColumn<T> {
  /** Column heading in the file. */
  header: string;
  /** Extracts the cell value from a row. */
  value: (row: T) => string | number | null | undefined;
}

/** Wraps a single CSV cell: escapes ", newline, and comma by quoting the value. */
function csvCell(v: string | number | null | undefined): string {
  const s = v === null || v === undefined ? '' : String(v);
  if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/** Builds a CSV string from a list of rows + column definitions. */
export function toCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const head = columns.map((c) => csvCell(c.header)).join(',');
  const body = rows.map((row) => columns.map((c) => csvCell(c.value(row))).join(',')).join('\r\n');
  return body ? `${head}\r\n${body}` : head;
}

/**
 * Generates and downloads a .csv file. Prepends a UTF-8 BOM so Excel reads
 * accented/Unicode characters correctly. No-op outside the browser (SSR-safe).
 */
export function downloadCsv<T>(filename: string, rows: T[], columns: CsvColumn<T>[]): void {
  if (typeof document === 'undefined') return;
  const csv = toCsv(rows, columns);
  const blob = new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
