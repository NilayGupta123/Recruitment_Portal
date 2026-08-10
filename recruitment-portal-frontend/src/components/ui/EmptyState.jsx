import { cn } from "./cn";

export default function EmptyState({ title, description, action, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-[var(--color-line-strong)] bg-white/60 px-6 py-14 text-center",
        className
      )}
    >
      <p className="text-base font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
        {title}
      </p>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-[var(--color-ink-secondary)]">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
