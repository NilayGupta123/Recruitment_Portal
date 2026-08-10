import Card from "./Card";
import { cn } from "./cn";

export default function StatCard({ title, value, icon, hint, className }) {
  return (
    <Card className={cn("p-5", className)} hover>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-semibold tracking-[-0.01em] text-[var(--color-ink-secondary)]">
            {title}
          </p>
          <p className="mt-2 text-[34px] font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
            {value}
          </p>
          {hint && (
            <p className="mt-2 text-xs font-medium text-[var(--color-ink-tertiary)]">
              {hint}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-brand-soft)] text-[var(--color-brand)]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
