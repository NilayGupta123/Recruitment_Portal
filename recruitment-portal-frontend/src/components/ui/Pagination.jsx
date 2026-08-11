import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { cn } from "./cn";

export default function Pagination({
  page = 1,
  pages = 1,
  total = 0,
  pageSize = 10,
  onChange,
  className,
  disabled = false,
}) {
  if (total <= 0) return null;

  const safePages = Math.max(1, pages);
  const safePage = Math.min(Math.max(1, page), safePages);
  const from = (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, total);
  const canPrev = safePage > 1 && !disabled;
  const canNext = safePage < safePages && !disabled;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5",
        className
      )}
    >
      <p className="text-[13px] text-[var(--color-ink-secondary)]">
        Showing{" "}
        <span className="font-semibold text-[var(--color-ink)]">
          {from}–{to}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[var(--color-ink)]">{total}</span>
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!canPrev}
          onClick={() => onChange?.(safePage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
          Prev
        </Button>
        <span className="min-w-[5.5rem] text-center text-[13px] font-semibold tabular-nums text-[var(--color-ink)]">
          {safePage} / {safePages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={!canNext}
          onClick={() => onChange?.(safePage + 1)}
          aria-label="Next page"
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
