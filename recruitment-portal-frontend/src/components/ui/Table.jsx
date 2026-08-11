import { cn } from "./cn";
import Card from "./Card";

export function TableShell({ children, className, footer }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="overflow-x-auto">{children}</div>
      {footer}
    </Card>
  );
}

export function Table({ className, children }) {
  return (
    <table className={cn("min-w-full text-left text-sm", className)}>
      {children}
    </table>
  );
}

export function THead({ children }) {
  return (
    <thead className="bg-[var(--color-surface-muted)] text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-tertiary)]">
      {children}
    </thead>
  );
}

export function Th({ className, children }) {
  return (
    <th className={cn("px-5 py-3.5 font-semibold", className)}>{children}</th>
  );
}

export function TBody({ children }) {
  return <tbody className="divide-y divide-[var(--color-line)]">{children}</tbody>;
}

export function Tr({ className, children, onClick }) {
  return (
    <tr
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick(e);
              }
            }
          : undefined
      }
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      className={cn(
        "bg-[var(--color-surface)] transition-colors hover:bg-[var(--color-fill)]",
        onClick &&
          "cursor-pointer focus-visible:bg-[var(--color-fill)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-brand)]",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function Td({ className, children, ...props }) {
  return (
    <td
      className={cn("px-5 py-4 align-middle text-[var(--color-ink)]", className)}
      {...props}
    >
      {children}
    </td>
  );
}
