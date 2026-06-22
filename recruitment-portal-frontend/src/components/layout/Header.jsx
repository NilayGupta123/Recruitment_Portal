import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold text-slate-800">
        Recruitment Portal
      </h1>

      <div className="flex items-center gap-5">
        <button className="relative">
          <FaBell className="text-slate-600 text-lg" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl text-slate-600" />

          <div>
            <p className="text-sm font-semibold">
              Admin User
            </p>

            <p className="text-xs text-gray-500">
              ADMIN
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}