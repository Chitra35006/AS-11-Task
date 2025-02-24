import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaTasks, FaList, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import useAuth from '../Hooks/useAuth';
const NavBar = () => {
    const {  logOut, user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
        <>
        {/* Mobile Menu Button (Hamburger Icon) */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={toggleMenu}
            className="text-2xl text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      
        {/* Navbar */}
        <div
          className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-orange-300 to-orange-700 text-white shadow-lg p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          {/* Logo or App Name */}
          <h1 className="text-xl font-bold mb-6 mt-7 flex items-center">
            <FaHome className="mr-2" /> Taskify
          </h1>
      
          {/* Navigation Links */}
          <nav className="space-y-3">
            <Link
              to="/"
              className="flex items-center text-lg hover:text-orange-200 transition-colors duration-200"
              onClick={toggleMenu}
            >
              <FaTasks className="mr-2" /> Home
            </Link>
            <Link
              to="/dashboard/taskBoard"
              className="flex items-center text-lg hover:text-orange-200 transition-colors duration-200"
              onClick={toggleMenu}
            >
              <FaTasks className="mr-2" /> Task Board
            </Link>
            <Link
              to="/dashboard/taskFrom"
              className="flex items-center text-lg hover:text-orange-200 transition-colors duration-200"
              onClick={toggleMenu}
            >
              <FaList className="mr-2" /> Task Form
            </Link>
            <Link
              to="/dashboard/taskList"
              className="flex items-center text-lg hover:text-orange-200 transition-colors duration-200"
              onClick={toggleMenu}
            >
              <FaList className="mr-2" /> Task List
            </Link>
            <Link
              to="/about"
              className="flex items-center text-lg hover:text-orange-200 transition-colors duration-200"
              onClick={toggleMenu}
            >
              <FaList className="mr-2" /> About Us
            </Link>
          </nav>
      
          {!user ? (
            <Link to="/signIn">
              <button className="w-full cursor-pointer bg-green-500 text-white py-2 rounded mb-2 flex items-center justify-center hover:bg-green-600 transition-colors duration-200">
                <FaSignInAlt className="mr-2" /> Sign In
              </button>
            </Link>
          ) : (
            <div>
              <h1>{user?.displayName || "Guest"}</h1>
              <button
                onClick={logOut}
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