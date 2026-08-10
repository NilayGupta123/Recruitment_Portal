import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { cn } from "./cn";

export default function ThemeToggle({ className, size = "md" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const sizes = {
    sm: "h-9 w-9",
    md: "h-10 w-10",
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "pressable inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink-secondary)] shadow-[var(--shadow-soft)] hover:bg-[var(--color-fill)] hover:text-[var(--color-ink)]",
        sizes[size] || sizes.md,
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun size={17} strokeWidth={2.1} /> : <Moon size={17} strokeWidth={2.1} />}
    </button>
  );
}
