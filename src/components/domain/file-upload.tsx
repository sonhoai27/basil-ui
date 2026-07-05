import * as React from 'react';
import { UploadCloud as UploadIcon, X as XIcon } from 'lucide-react';

import { cn } from '../../lib/utils';
import { useMessages } from '../../i18n';

export interface FileUploadProps {
  value?: File[];
  onChange: (files: File[]) => void;
  /** An accept string like input[type=file] (e.g. "image/*,.pdf"). */
  accept?: string;
  /** Allow selecting multiple files (default true). */
  multiple?: boolean;
  /** Maximum size per file (MB). */
  maxSizeMB?: number;
  disabled?: boolean;
  /** Secondary note below the main line (e.g. the allowed file types). */
  hint?: string;
  className?: string;
}

/** Formats a file size into KB / MB. */
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb < 10 ? 1 : 0)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(mb < 10 ? 1 : 0)} MB`;
}

/** Checks whether a file matches the accept string (supports extension, mime, wildcard mime). */
function matchesAccept(file: File, accept?: string): boolean {
  if (!accept) return true;
  const tokens = accept
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
  if (tokens.length === 0) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return tokens.some((token) => {
    if (token.startsWith('.')) return name.endsWith(token);
    if (token.endsWith('/*')) return type.startsWith(token.slice(0, -1));
    return type === token;
  });
}

/** A single selected file row — thumbnail (if an image) + name + size + remove button. */
interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  disabled?: boolean;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove, disabled }) => {
  const t = useMessages();
  const isImage = file.type.startsWith('image/');
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isImage) return;
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file, isImage]);

  return (
    <li className="flex items-center gap-3 rounded-md border border-input bg-card px-3 py-2">
      {isImage && url ? (
        <img
          src={url}
          alt=""
          aria-hidden
          className="h-10 w-10 shrink-0 rounded-md object-cover"
        />
      ) : (
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
        >
          <UploadIcon className="size-4" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-foreground">{file.name}</p>
        <p className="font-tabular text-xs tabular-nums text-muted-foreground">
          {formatSize(file.size)}
        </p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        disabled={disabled}
        aria-label={t.fileUpload.remove(file.name)}
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors',
          'hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50',
        )}
      >
        <XIcon className="size-4" aria-hidden />
      </button>
    </li>
  );
};

/**
 * A drag-and-drop + click-to-pick file area with no external dependencies.
 * Filters by accept + maximum size (skips oversized files and reports back).
 */
export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    { value = [], onChange, accept, multiple = true, maxSizeMB, disabled, hint, className },
    ref,
  ) => {
    const t = useMessages();
    const hintText = hint ?? t.fileUpload.hint;
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = React.useState(false);
    const [note, setNote] = React.useState<string | null>(null);

    const openPicker = () => {
      if (disabled) return;
      inputRef.current?.click();
    };

    const acceptFiles = (incoming: FileList | null) => {
      if (!incoming || incoming.length === 0) return;
      const maxBytes = maxSizeMB ? maxSizeMB * 1024 * 1024 : Infinity;
      const accepted: File[] = [];
      const rejectedType: string[] = [];
      const rejectedSize: string[] = [];

      Array.from(incoming).forEach((file) => {
        if (!matchesAccept(file, accept)) {
          rejectedType.push(file.name);
          return;
        }
        if (file.size > maxBytes) {
          rejectedSize.push(file.name);
          return;
        }
        accepted.push(file);
      });

      const messages: string[] = [];
      if (rejectedSize.length > 0) {
        messages.push(
          `${rejectedSize.length} file(s) over ${maxSizeMB} MB were skipped.`,
        );
      }
      if (rejectedType.length > 0) {
        messages.push(`${rejectedType.length} file(s) of the wrong type were skipped.`);
      }
      setNote(messages.length > 0 ? messages.join(' ') : null);

      if (accepted.length === 0) return;
      if (multiple) {
        onChange([...value, ...accepted]);
      } else {
        onChange(accepted.slice(0, 1));
      }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      if (disabled) return;
      acceptFiles(e.dataTransfer.files);
    };

    const handleRemove = (index: number) => {
      const next = value.filter((_, i) => i !== index);
      onChange(next);
    };

    const descId = React.useId();

    return (
      <div ref={ref} className={cn('flex flex-col gap-3', className)}>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          aria-describedby={hintText ? descId : undefined}
          onClick={openPicker}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openPicker();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragOver(false);
          }}
          onDrop={handleDrop}
          className={cn(
            'flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-5 py-8 text-center transition-colors',
            dragOver
              ? 'border-primary bg-primary/[0.03]'
              : 'border-input bg-transparent',
            disabled
              ? 'pointer-events-none opacity-50'
              : 'cursor-pointer hover:bg-muted/50',
          )}
        >
          <span
            aria-hidden
            className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground"
          >
            <UploadIcon className="size-5" />
          </span>
          <p className="text-sm font-medium text-foreground">
            Drag and drop or click to select
          </p>
          {hintText ? (
            <p id={descId} className="text-xs text-muted-foreground">
              {hintText}
            </p>
          ) : null}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              acceptFiles(e.target.files);
              // Reset so re-selecting the same file still triggers onChange.
              e.target.value = '';
            }}
          />
        </div>

        {note ? (
          <p role="status" className="text-xs text-destructive">
            {note}
          </p>
        ) : null}

        {value.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {value.map((file, index) => (
              <FilePreview
                key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                file={file}
                disabled={disabled}
                onRemove={() => handleRemove(index)}
              />
            ))}
          </ul>
        ) : null}
      </div>
    );
  },
);
FileUpload.displayName = 'FileUpload';
