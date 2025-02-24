import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaTasks, FaList, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { FaClipboardList } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { FaWaveSquare } from "react-icons/fa";
import useTheme from "../Hooks/useTheme";
import { FaSun, FaMoon } from "react-icons/fa";

const NavBar = () => {
  const { logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const{theme,toggleTheme} = useTheme();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Menu Button (Hamburger Icon) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleMenu} className="text-2xl text-gray-800 focus:outline-none">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Navbar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 ${theme === "dark"?"bg-black":"bg-gradient-to-b from-orange-300 to-orange-700"} text-white shadow-lg p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo or App Name */}
        <h1 className="text-xl font-bold mb-6 mt-7 flex items-center">
          <FaWaveSquare className="mr-2" /> Task Flow
        </h1>
        {user ? (
  <>
    {user.photoURL && (
      <img
        src={user.photoURL}
        alt="User Profile"
        className="w-12 h-12 rounded-full border-2 border-gray-300"
      />
    )}
    <h1 className="text-lg font-semibold">{user.displayName || "Guest"}</h1>
  </>
) : (
  <p className="text-gray-500">Not signed in</p>
)}
        {/* Navigation Links */}
        <nav className="space-y-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center text-lg p-2 rounded-md transition-colors duration-200 ${
                isActive ? "bg-gradient-to-r from-slate-900 to-red-500 text-white" : "hover:text-orange-200"
              }`
            }
            onClick={toggleMenu}
          >
            <FaHome className="mr-2" /> Home
          </NavLink>
          <NavLink
            to="/dashboard/taskBoard"
            className={({ isActive }) =>
              `flex items-center text-lg p-2 rounded-md transition-colors duration-200 ${
                isActive ? "bg-gradient-to-r from-slate-900 to-red-500 text-white" : "hover:text-orange-200"
              }`
            }
            onClick={toggleMenu}
          >
            <FaTasks className="mr-2" /> Task Board
          </NavLink>
          <NavLink
            to="/dashboard/taskForm"
            className={({ isActive }) =>
              `flex items-center text-lg p-2 rounded-md transition-colors duration-200 ${
                isActive ? "bg-gradient-to-r from-slate-900 to-red-500 text-white" : "hover:text-orange-200"
              }`
            }
            onClick={toggleMenu}
          >
            <FaWpforms className="mr-2" /> Task Form
          </NavLink>
          <NavLink
            to="/dashboard/taskList"
            className={({ isActive }) =>
              `flex items-center text-lg p-2 rounded-md transition-colors duration-200 ${
                isActive ? "bg-gradient-to-r from-slate-900 to-red-500 text-white" : "hover:text-orange-200"
              }`
            }
            onClick={toggleMenu}
          >
            <FaClipboardList className="mr-2" /> Task List
          </NavLink>
        </nav>

        {!user ? (
          <NavLink to="/signIn">
            <button className="w-full cursor-pointer bg-green-500 text-white py-2 rounded mb-2 flex items-center justify-center hover:bg-green-600 transition-colors duration-200">
              <FaSignInAlt className="mr-2" /> Sign In
            </button>
          </NavLink>
        ) : (
          <div>
           <button
                onClick={toggleTheme}
                className="btn btn-ghost rounded-full"
              >
                {theme === "dark" ? (
                  <FaSun
                    className={`${
                      theme === "dark" ? "text-gray-200" : "text-black"
                    }`}
                  />
                ) : (
                  <FaMoon
                    className={`${
                      theme === "dark" ? "text-gray-200" : "text-black"
                    }`}
                  />
                )}
              </button>
            <button
  onClick={() => {
    logout();
    navigate("/");
  }}
  className="w-full cursor-pointer bg-red-800 text-white py-2 rounded flex items-center justify-center hover:bg-slate-900 transition-colors duration-200"
>
  <FaSignOutAlt className="mr-2" /> Sign Out
</button>

          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
