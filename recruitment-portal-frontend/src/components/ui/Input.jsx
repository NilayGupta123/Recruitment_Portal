import { cn } from "./cn";

export function Label({ className, children, ...props }) {
  return (
    <label
      className={cn(
        "mb-2 block text-[13px] font-semibold tracking-[-0.01em] text-[var(--color-ink-secondary)]",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export function Field({ className, children }) {
  return <div className={cn("space-y-0", className)}>{children}</div>;
}

const controlClass =
  "w-full rounded-[var(--radius-control)] border border-[var(--color-line-strong)] bg-[var(--color-surface)] px-4 py-3 text-[15px] tracking-[-0.011em] text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-ink-tertiary)] focus:border-[var(--color-brand)] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-brand)_22%,transparent)] disabled:cursor-not-allowed disabled:opacity-60";

export function Input({ className, ...props }) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select
        className={cn(
          controlClass,
          "ui-select appearance-none pr-11",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[var(--color-ink-tertiary)]"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(controlClass, "min-h-[120px] resize-y leading-relaxed", className)}
      {...props}
    />
  );
}
