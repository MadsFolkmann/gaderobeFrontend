import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/wardrobe_logo.png";
import { AuthButton } from "./AuthButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = true; // skal ændres når jeg har fået lavet auth

  const links = [
    { href: "/", label: "Home" },
    { href: "/wardrobe", label: "My wardrobe" },
    { href: "#", label: "Try on (coming soon)", disabled: true },
    { href: "/add", label: "+ Add Clothing" },
  ];

  return (
    <nav className="w-full shadow-md bg-white">
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo + Titel */}
        <div className="flex items-center gap-18">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Wardrobe Logo"
              className="h-12 w-12 rounded-full border border-gray-400"
            />
            <span className="text-2xl md:text-3xl font-['Kranky']">
              THE WARDROBE
            </span>
          </div>

          <div className="hidden md:flex gap-15 text-xl font-medium ml-6">
            {links.map((link) =>
              link.disabled ? (
                <span
                  key={link.label}
                  className="text-gray-400 cursor-not-allowed"
                >
                  {link.label}
                </span>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.href}
                  className={({ isActive }) =>
                    `group transition duration-300 ${
                      isActive ? "text-black" : "text-gray-800"
                    }`
                  }
                  end
                >
                  {link.label}
                  <span
                    className={`block transition-all duration-500 h-0.5 bg-black ${
                      window.location.pathname === link.href
                        ? "max-w-full"
                        : "max-w-0 group-hover:max-w-full"
                    }`}
                  ></span>
                </NavLink>
              )
            )}
          </div>
        </div>

        {/* Auth Button + Burger */}
        <div className="flex items-center gap-4">
          <AuthButton isLoggedIn={isLoggedIn} />
          <button
            className="md:hidden p-2 rounded hover:bg-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-800" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start px-6 pb-4 gap-4 text-lg font-medium">
          {links.map((link) =>
            link.disabled ? (
              <span key={link.label} className="text-gray-400 cursor-not-allowed">
                {link.label}
              </span>
            ) : (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  `block hover:underline w-full ${
                    isActive ? "font-bold text-black" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
                end
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>
      )}
    </nav>
  );
};