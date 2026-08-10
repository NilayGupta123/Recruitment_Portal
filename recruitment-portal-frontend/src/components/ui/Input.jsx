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
  "w-full rounded-[var(--radius-control)] border border-[var(--color-line-strong)] bg-[var(--color-surface)] px-4 py-3 text-[15px] tracking-[-0.011em] text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-ink-tertiary)] focus:border-[var(--color-brand)] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-brand)_22%,transparent)]";

export function Input({ className, ...props }) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function Select({ className, children, ...props }) {
  return (
    <select className={cn(controlClass, "pr-10", className)} {...props}>
      {children}
    </select>
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
