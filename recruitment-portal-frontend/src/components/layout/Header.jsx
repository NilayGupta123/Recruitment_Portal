import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-[var(--color-line)] bg-[var(--color-surface-elevated)] px-5 backdrop-blur-2xl sm:px-8">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-tertiary)]">
            Workspace
          </p>
          <h1 className="text-[20px] font-semibold tracking-[-0.035em] text-[var(--color-ink)] sm:text-[22px]">
            Recruitment Portal
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <button
            type="button"
            className="pressable relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-fill)] text-[var(--color-ink-secondary)] hover:bg-[var(--color-fill-strong)]"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--color-danger)] ring-2 ring-[var(--color-surface)]" />
          </button>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="pressable flex items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] py-1.5 pl-1.5 pr-3 hover:bg-[var(--color-fill)]"
            >
              <Avatar name={user?.full_name} size="sm" />
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold tracking-[-0.015em] text-[var(--color-ink)]">
                  {user?.full_name}
                </p>
                <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-[var(--color-ink-tertiary)]">
                  {user?.user_type}
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`text-[var(--color-ink-tertiary)] transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 shadow-[var(--shadow-lift)] animate-rise-in">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="pressable flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-fill)]"
                >
                  <UserRound size={16} />
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="pressable flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[var(--color-danger)] hover:bg-[var(--color-danger-soft)]"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
