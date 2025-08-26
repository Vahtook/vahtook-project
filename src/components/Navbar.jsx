import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import vahtookLogo from "../assets/new_img.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#002244] text-white shadow-md z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 ml-14">
            <Link to="/">
              <img
                src={vahtookLogo}
                alt="Vahtook Logo"
<<<<<<< Updated upstream
                className="w-[90px] h-auto cursor-pointer hover:opacity-80 transition-opacity duration-300"
=======
                className="w-[90px] h-[20px] cursor-pointer transition-opacity duration-300"
>>>>>>> Stashed changes
              />
            </Link>
          </div>

          {/* Center Links */}
          <ul className="hidden md:flex space-x-8 text-lg font-medium absolute left-1/2 transform -translate-x-1/2">
            <li>
              <Link
                to="/business-partner"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Business Partner
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
          </ul>

          {/* Right-aligned Support Link */}
          <ul className="hidden md:flex text-lg font-medium mr-12">
            <li>
              <Link
                to="/support"
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                Support
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden mr-3">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#001833] px-4 pb-4 space-y-3 text-lg font-medium">
          <Link
            to="/business-partner"
            onClick={() => setIsOpen(false)}
            className="block py-2 hover:text-yellow-400 transition"
          >
            Business Partner
          </Link>
          <Link
            to="/driver-partner"
            onClick={() => setIsOpen(false)}
            className="block py-2 hover:text-yellow-400 transition"
          >
            Driver Partner
          </Link>
          <Link
            to="/support"
            onClick={() => setIsOpen(false)}
            className="block py-2 hover:text-yellow-400 transition"
          >
            Support
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
