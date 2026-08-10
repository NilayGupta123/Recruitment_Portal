import { cn } from "./cn";

const variants = {
  primary:
    "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] shadow-[0_1px_2px_color-mix(in_srgb,var(--color-brand)_30%,transparent)]",
  secondary:
    "bg-[var(--color-brand-soft)] text-[var(--color-brand)] hover:brightness-95",
  accent:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] shadow-[0_1px_2px_rgba(255,159,10,0.28)]",
  ghost:
    "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-fill)]",
  outline:
    "bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-line-strong)] hover:bg-[var(--color-fill)]",
  danger:
    "bg-[var(--color-danger-soft)] text-[var(--color-danger)] hover:brightness-95",
  dark:
    "bg-[var(--color-ink)] text-[var(--color-canvas)] hover:opacity-90",
};

const sizes = {
  sm: "h-9 px-3.5 text-sm rounded-[10px] gap-1.5",
  md: "h-11 px-5 text-[15px] rounded-[var(--radius-control)] gap-2",
  lg: "h-12 px-6 text-base rounded-[14px] gap-2",
  icon: "h-10 w-10 rounded-full gap-0 p-0",
};

export default function Button({
  as: Comp = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  type,
  ...props
}) {
  return (
    <Comp
      type={Comp === "button" ? type || "button" : undefined}
      className={cn(
        "inline-flex items-center justify-center font-semibold tracking-[-0.01em] focus-ring pressable disabled:pointer-events-none",
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
