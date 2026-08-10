import { cn } from "./cn";

export default function LoadingState({
  label = "Loading…",
  className,
  rows = 5,
  compact = false,
}) {
  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-3 py-10 text-sm font-medium text-[var(--color-ink-secondary)]",
          className
        )}
      >
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-brand)] border-t-transparent" />
        {label}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-[18px] border border-[var(--color-line)] bg-white p-5 shadow-[var(--shadow-soft)]",
        className
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-brand)] border-t-transparent" />
        <p className="text-sm font-semibold text-[var(--color-ink)]">{label}</p>
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-11 animate-pulse rounded-[12px] bg-[var(--color-fill)]"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function TableLoadingRow({ colSpan = 5, label = "Loading…" }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-5 py-14 text-center">
        <div className="inline-flex items-center gap-3 text-sm font-medium text-[var(--color-ink-secondary)]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-brand)] border-t-transparent" />
          {label}
        </div>
      </td>
    </tr>
  );
}
