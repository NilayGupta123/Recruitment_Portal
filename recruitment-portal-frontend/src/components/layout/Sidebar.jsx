import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaBullhorn,
  FaUsers,
  FaUserCog,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const roleMenus = {
    ADMIN: [
      { name: "Dashboard", path: "/dashboard", icon: <FaHome className="w-5 h-5" /> },
      { name: "Jobs", path: "/jobs", icon: <FaBriefcase className="w-5 h-5" /> },
      { name: "Campaigns", path: "/campaigns", icon: <FaBullhorn className="w-5 h-5" /> },
      { name: "Applicants", path: "/applicants", icon: <FaUsers className="w-5 h-5" /> },
      { name: "Users", path: "/users", icon: <FaUserCog className="w-5 h-5" /> },
      { name: "Profile", path: "/profile", icon: <FaUserCircle className="w-5 h-5" /> },
    ],
    HR: [
      { name: "Dashboard", path: "/dashboard", icon: <FaHome className="w-5 h-5" /> },
      { name: "Jobs", path: "/jobs", icon: <FaBriefcase className="w-5 h-5" /> },
      { name: "Campaigns", path: "/campaigns", icon: <FaBullhorn className="w-5 h-5" /> },
      { name: "Applicants", path: "/applicants", icon: <FaUsers className="w-5 h-5" /> },
      { name: "Profile", path: "/profile", icon: <FaUserCircle className="w-5 h-5" /> },
    ],
    APPLICANT: [
      { name: "Dashboard", path: "/dashboard", icon: <FaHome className="w-5 h-5" /> },
      { name: "Jobs", path: "/jobs", icon: <FaBriefcase className="w-5 h-5" /> },
      { name: "Campaigns", path: "/campaigns", icon: <FaBullhorn className="w-5 h-5" /> },
      { name: "My Applications", path: "/applicants", icon: <FaUsers className="w-5 h-5" /> },
      { name: "Profile", path: "/profile", icon: <FaUserCircle className="w-5 h-5" /> },
    ],
  };

  const menuItems = roleMenus[user?.user_type] || [];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col sticky top-0">
      
      {/* Branding / Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white font-bold text-lg h-8 w-8 rounded-lg flex items-center justify-center shadow-sm">
            RP
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">
            RecruitPro
          </span>
        </div>
      </div>

      {/* User Info Widget */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-semibold shadow-sm">
          {getInitials(user?.full_name)}
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="font-semibold text-base text-slate-800 truncate">
            {user?.full_name || "Guest User"}
          </span>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 rounded-full px-2 py-0.5 mt-1 w-max">
            {user?.user_type || "UNKNOWN"}
          </span>
        </div>
      </div>

      {/* Navigation */}
      {/* Changed gap-1 to gap-3 for more vertical space between tabs */}
      <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              /* Changed text-sm to text-base, py-2.5 to py-3, and gap-3 to gap-4 */
              `flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`
            }
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          /* Matched the padding, gap, and text size from the nav links above */
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 group"
        >
          <FaSignOutAlt className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
          <span>Logout</span>
        </button>
      </div>
      
    </aside>
  );
}