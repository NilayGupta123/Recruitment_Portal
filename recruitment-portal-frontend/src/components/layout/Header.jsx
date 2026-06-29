import { useState, useRef, useEffect } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const initials = user?.full_name
    ?.split(" ")
    .map((x) => x[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">

      <h1 className="text-2xl font-bold text-slate-800">
        Recruitment Portal
      </h1>

      <div className="flex items-center gap-6">

        {/* Notifications */}

        <button className="relative">

          <FaBell className="text-xl text-gray-600" />

          <span className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center">
            3
          </span>

        </button>

        {/* Profile */}

        <div
          ref={menuRef}
          className="relative"
        >

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-xl transition"
          >

            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">

              {initials}

            </div>

            <div className="text-left">

              <p className="font-semibold">

                {user?.full_name}

              </p>

              <p className="text-xs text-gray-500">

                {user?.user_type}

              </p>

            </div>

            <FaChevronDown />

          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-52 bg-white border rounded-xl shadow-lg overflow-hidden z-50">

              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                👤 Profile
              </button>

              <button
                onClick={() => {
                  logout();
                }}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
              >
                🚪 Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}