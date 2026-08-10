import { cn } from "./cn";

export default function Card({ className, children, hover = false, ...props }) {
  return (
    <div
      className={cn(
        "surface-card",
        hover && "transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return (
    <div className={cn("flex items-start justify-between gap-4 px-5 pt-5 pb-3", className)}>
      {children}
    </div>
  );
}

export function CardBody({ className, children }) {
  return <div className={cn("px-5 pb-5", className)}>{children}</div>;
}
