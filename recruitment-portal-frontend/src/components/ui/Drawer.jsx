import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "./cn";

export default function Drawer({
  open = true,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = "md",
  className,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const widths = {
    sm: "w-full max-w-[420px]",
    md: "w-full max-w-[520px]",
    lg: "w-full max-w-[640px]",
    xl: "w-full max-w-[760px]",
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close drawer"
        className="absolute inset-0 bg-[var(--scrim)] animate-fade-in"
        onClick={onClose}
      />
      <aside
        className={cn(
          "relative z-10 ml-auto flex h-dvh max-h-dvh w-full flex-col overflow-hidden bg-[var(--color-surface)] shadow-[var(--shadow-drawer)] animate-sheet-in",
          widths[width] || widths.md,
          className
        )}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0">
            {title && (
              <h2 className="truncate text-[20px] font-semibold tracking-[-0.03em] text-[var(--color-ink)] sm:text-[22px]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1 text-sm tracking-[-0.01em] text-[var(--color-ink-secondary)]">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="pressable flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-fill)] text-[var(--color-ink-secondary)] hover:bg-[var(--color-fill-strong)]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </header>

        <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">
          {children}
        </div>

        {footer && (
          <footer className="shrink-0 border-t border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-4 sm:px-6">
            {footer}
          </footer>
        )}
      </aside>
    </div>,
    document.body
  );
}
