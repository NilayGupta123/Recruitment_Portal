import { useState } from "react";
import { Link } from "react-router-dom";
import {Menu, X, ChevronDown} from "lucide-react";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/careers"
            className="flex items-center gap-3"
          >

            <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center text-white text-xl font-bold">

              RP

            </div>

            <div>

              <h1 className="font-bold text-xl text-slate-900">
                RecruitPro
              </h1>

              <p className="text-xs text-gray-500">
                Careers
              </p>

            </div>

          </Link>

          {/* Desktop */}

          <div className="hidden lg:flex items-center gap-10 text-[15px] font-medium">

            <a href="#home" className="hover:text-blue-700">
              Home
            </a>

            <a href="#about" className="hover:text-blue-700">
              About
            </a>

            <a href="#jobs" className="hover:text-blue-700">
              Careers
            </a>

            <a href="#benefits" className="hover:text-blue-700">
              Benefits
            </a>

            <button className="flex items-center gap-1 hover:text-blue-700">

              Teams

              <ChevronDown size={16} />

            </button>

          </div>

          {/* Right */}

          <div className="hidden lg:flex items-center gap-4">

            <Link
              to="/login"
              className="text-slate-700 hover:text-blue-700"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-full text-white font-semibold"
            >
              Sign up
            </Link>

          </div>

          {/* Mobile */}

          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>

        </div>

      </div>

      {open && (

        <div className="lg:hidden bg-white border-t">

          <div className="flex flex-col p-6 gap-5">

            <a href="#home">Home</a>

            <a href="#about">About</a>

            <a href="#jobs">Careers</a>

            <a href="#benefits">Benefits</a>

            <Link to="/login">

              Login

            </Link>

            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="bg-orange-500 hover:bg-orange-600 rounded-full py-3 text-white text-center font-semibold"
            >
              Sign up
            </Link>

          </div>

        </div>

      )}

    </nav>
  );
}