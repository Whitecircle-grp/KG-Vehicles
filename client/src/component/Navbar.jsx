import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkStyle =
    "transition duration-200 ease-in-out hover:scale-105 px-3 py-1";
  const activeStyle = "text-blue-500 font-semibold underline underline-offset-4";
  const inactiveStyle = "text-white";

  const menuLinkStyle =
    "block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded transition duration-200";
  const menuActiveStyle = "font-semibold text-blue-500";

  const dashboardLink = user?.role === "admin" ? "/dashboard" : "/dashboard";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-gray-800 px-8 py-4 rounded-b-[20px] flex justify-between items-center z-50 shadow-lg">
        {token ? (
          <>
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none hover:cursor-pointer md:hidden"
              >
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
              <Link 
                to="/" 
                className="flex items-center gap-2 text-2xl font-extrabold text-white tracking-wide font-[Poppins]"
                >
                <img 
                  src="/logo.jpg" 
                  alt="KG VEHICLES" 
                  className="h-10 w-10 object-cover rounded-full border border-white shadow-md" 
                />
                <span className="font-bold text-xl">KG VEHICLES</span>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links (when logged in) */}
            <ul className="hidden md:flex gap-8 font-medium text-white text-lg">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={dashboardLink}
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            </ul>

            {/* Slide-out Menu (Mobile) */}
            {menuOpen && (
              <div className="absolute top-16 left-0 w-56 bg-white/70 backdrop-blur-md border border-white/30 shadow-lg rounded-r-lg z-50 md:hidden p-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${menuLinkStyle} ${isActive ? menuActiveStyle : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${menuLinkStyle} ${isActive ? menuActiveStyle : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `${menuLinkStyle} ${isActive ? menuActiveStyle : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </NavLink>
                <NavLink
                  to={dashboardLink}
                  className={({ isActive }) =>
                    `${menuLinkStyle} ${isActive ? menuActiveStyle : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </NavLink>

                {/* Profile + Logout in mobile menu */}
                <div className="flex items-center gap-2 mt-3 px-2">
                  <FaUserCircle size={22} className="text-gray-700" />
                  <span className="text-gray-800">Hello, {user?.name || "User"}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Right: Profile + Hello + Logout (Desktop) */}
            <div className="hidden md:flex items-center gap-3 text-white">
              <FaUserCircle size={24} />
              <span>Hello, {user?.name || "User"}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none hover:cursor-pointer md:hidden"
              >
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
              <Link 
                to="/" 
                className="flex items-center gap-2 text-2xl font-extrabold text-white tracking-wide font-[Poppins]"
                >
                <img 
                  src="/logo.jpg" 
                  alt="Auto Track Logo" 
                  className="h-10 w-10 object-cover rounded-full border border-white shadow-md" 
                />
                <span className="font-bold text-xl">AutoTrack</span>
              </Link>
            </div>

            {/* Desktop Links */}
            <ul className="hidden md:flex gap-8 font-medium text-white text-lg">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                  }
                >
                  Login
                </NavLink>
              </li>
            </ul>

            {/* Mobile Menu */}
            {menuOpen && (
              <div className="absolute top-16 left-0 w-56 bg-white/70 backdrop-blur-md border border-white/30 shadow-lg rounded-r-lg z-50 md:hidden p-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${menuLinkStyle} ${isActive ? menuActiveStyle : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${menuLinkStyle} ${isActive ? menuActiveStyle : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `${menuLinkStyle} ${isActive ? menuActiveStyle : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${menuLinkStyle} ${isActive ? menuActiveStyle : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
              </div>
            )}
          </>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-[55px]"></div>
    </>
  );
};

export default Navbar;


