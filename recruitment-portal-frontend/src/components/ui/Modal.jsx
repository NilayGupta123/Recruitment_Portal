import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "./cn";

export default function Modal({
  open = true,
  onClose,
  title,
  children,
  footer,
  className,
  size = "md",
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

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-5xl",
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-[var(--scrim)] animate-fade-in"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 flex max-h-[min(92dvh,880px)] w-full flex-col overflow-hidden rounded-[20px] bg-[var(--color-surface)] shadow-[var(--shadow-lift)] animate-rise-in sm:rounded-[var(--radius-sheet)]",
          sizes[size] || sizes.md,
          className
        )}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--color-line)] px-5 py-4 sm:px-6">
          <h2 className="min-w-0 truncate text-lg font-semibold tracking-[-0.03em] text-[var(--color-ink)] sm:text-xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="pressable flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-fill)] text-[var(--color-ink-secondary)] hover:bg-[var(--color-fill-strong)]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </header>

        <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
          {children}
        </div>

        {footer && (
          <footer className="shrink-0 border-t border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-4 sm:px-6">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body
  );
}
