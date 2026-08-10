import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Megaphone,
  Users,
  UserCog,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";

const iconClass = "h-[18px] w-[18px]";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const roleMenus = {
    ADMIN: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Jobs", path: "/jobs", icon: Briefcase },
      { name: "Campaigns", path: "/campaigns", icon: Megaphone },
      { name: "Applicants", path: "/applicants", icon: Users },
      { name: "Users", path: "/users", icon: UserCog },
    ],
    HR: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Jobs", path: "/jobs", icon: Briefcase },
      { name: "Campaigns", path: "/campaigns", icon: Megaphone },
      { name: "Applicants", path: "/applicants", icon: Users },
    ],
    APPLICANT: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Jobs", path: "/jobs", icon: Briefcase },
      { name: "Campaigns", path: "/campaigns", icon: Megaphone },
      { name: "My Applications", path: "/applicants", icon: Users },
    ],
  };

  const menuItems = roleMenus[user?.user_type] || [];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sticky top-0 flex h-screen w-[272px] shrink-0 flex-col border-r border-[var(--color-line)] bg-[var(--color-surface-elevated)] backdrop-blur-2xl">
      <div className="flex h-[72px] items-center gap-3 px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-sm font-bold text-white shadow-[0_6px_16px_rgba(0,113,227,0.28)]">
          RP
        </div>
        <div>
          <p className="text-[17px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
            RecruitPro
          </p>
          <p className="text-xs font-medium tracking-[-0.01em] text-[var(--color-ink-tertiary)]">
            Hiring workspace
          </p>
        </div>
      </div>

      <div className="mx-4 mb-3 rounded-[18px] border border-[var(--color-line)] bg-[var(--color-surface)] p-3.5">
        <div className="flex items-center gap-3">
          <Avatar name={user?.full_name} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[-0.015em] text-[var(--color-ink)]">
              {user?.full_name || "Guest"}
            </p>
            <div className="mt-1">
              <Badge tone="brand">{user?.user_type || "USER"}</Badge>
            </div>
          </div>
        </div>
      </div>

      <nav className="custom-scrollbar flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  "pressable group flex items-center gap-3 rounded-[14px] px-3.5 py-3 text-[15px] font-semibold tracking-[-0.015em] transition-colors",
                  isActive
                    ? "bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                    : "text-[var(--color-ink-secondary)] hover:bg-[var(--color-fill)] hover:text-[var(--color-ink)]",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={[
                      "flex h-8 w-8 items-center justify-center rounded-[10px]",
                      isActive
                        ? "bg-[var(--color-surface)]"
                        : "bg-[var(--color-fill)] group-hover:bg-[var(--color-surface)]",
                    ].join(" ")}
                  >
                    <Icon className={iconClass} strokeWidth={2.1} />
                  </span>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-[var(--color-line)] p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="pressable flex w-full items-center gap-3 rounded-[14px] px-3.5 py-3 text-[15px] font-semibold tracking-[-0.015em] text-[var(--color-danger)] hover:bg-[var(--color-danger-soft)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--color-danger-soft)]">
            <LogOut className={iconClass} />
          </span>
          Sign out
        </button>
      </div>
    </aside>
  );
}
