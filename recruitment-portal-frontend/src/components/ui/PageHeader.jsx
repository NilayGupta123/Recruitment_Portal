import { cn } from "./cn";

export default function PageHeader({
  title,
  description,
  actions,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="min-w-0">
        <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[var(--color-ink)] sm:text-[32px]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-[var(--color-ink-secondary)]">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  );
}
