import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#jobs", label: "Careers" },
  { href: "#benefits", label: "Benefits" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-surface-elevated)] backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex h-[72px] items-center justify-between">
          <Link to="/careers" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-base font-bold text-white shadow-[0_8px_20px_rgba(0,113,227,0.28)]">
              RP
            </div>
            <div>
              <p className="text-[17px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
                RecruitPro
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-tertiary)]">
                Careers
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-[15px] font-medium tracking-[-0.01em] text-[var(--color-ink-secondary)] lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[var(--color-ink)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle size="sm" />
            <Button as={Link} to="/login" variant="ghost" size="sm">
              Sign in
            </Button>
            <Button as={Link} to="/signup" variant="accent" size="sm">
              Create account
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle size="sm" />
            <button
              type="button"
              className="pressable flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-fill)] text-[var(--color-ink)]"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-5 lg:hidden animate-fade-in">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-[15px] font-medium text-[var(--color-ink)] hover:bg-[var(--color-fill)]"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 grid gap-2">
              <Button as={Link} to="/login" variant="outline" onClick={() => setOpen(false)}>
                Sign in
              </Button>
              <Button as={Link} to="/signup" variant="accent" onClick={() => setOpen(false)}>
                Create account
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
