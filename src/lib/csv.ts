/**
 * CSV export helper — chuẩn Excel + tiếng Việt (BOM UTF-8, phân tách bằng dấu phẩy).
 * Không phải "feature app": đây là tiện ích để bảng dữ liệu xuất ra file.
 */

export interface CsvColumn<T> {
  /** Tiêu đề cột trong file. */
  header: string;
  /** Lấy giá trị ô từ một dòng. */
  value: (row: T) => string | number | null | undefined;
}

/** Bọc 1 ô CSV: escape dấu ", xuống dòng, dấu phẩy bằng cách đặt trong ngoặc kép. */
function csvCell(v: string | number | null | undefined): string {
  const s = v === null || v === undefined ? '' : String(v);
  if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/** Sinh chuỗi CSV từ danh sách dòng + định nghĩa cột. */
export function toCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const head = columns.map((c) => csvCell(c.header)).join(',');
  const body = rows.map((row) => columns.map((c) => csvCell(c.value(row))).join(',')).join('\r\n');
  return body ? `${head}\r\n${body}` : head;
}

/**
 * Xuất và tải file .csv. Thêm BOM UTF-8 để Excel đọc đúng dấu tiếng Việt.
 * No-op ngoài môi trường trình duyệt (SSR-safe).
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
