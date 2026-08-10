import { cn } from "./cn";

export default function Avatar({ name, size = "md", className }) {
  const initials = (name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5ac8fa] to-[var(--color-brand)] font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]",
        sizes[size] || sizes.md,
        className
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}
