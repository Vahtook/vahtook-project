import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#002244] text-white shadow-md">
      
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-wide" style={{ color: "#ff9d00" }}>Vaht∞k</h1>
          </div>

          {/* Links on right */}
          <ul className="flex space-x-6 ml-auto">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/driver-partner"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Driver Partner
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
