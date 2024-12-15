import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";

const MainNav = () => {
  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white-300 shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-2xl font-bold">
              LOGO
            </Link>

            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded.md text-sm font-medium"
                  : "hover:bg-gray-200 px-3 py-2 rounded.md text-sm font-medium"
              }
            >
              Home
            </NavLink>

            <NavLink
              to={"/shop"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded.md text-sm font-medium"
                  : "hover:bg-gray-200 px-3 py-2 rounded.md text-sm font-medium"
              }
            >
              Shop
            </NavLink>
            {/* Badge */}

            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded.md text-sm font-medium"
                  : "hover:bg-gray-200 px-3 py-2 rounded.md text-sm font-medium"
              }
            >
              Cart
              {carts.length > 0 && (
                <span className="absolute top-0 bg-red-500 rounded-full px-2">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 hover:bg-gray-200 px-2 py-3 rounded-md"
              >
                <img
                  className="w-8 h-8"
                  src="data:image/png;base64,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"
                />
                <ChevronDown />
              </button>

              {isOpen && (
                <div className="absolute top-16 bg-white shadow-md z-50">
                  {user?.role == "admin" ? (
                    <div>
                      <Link
                        to={"/admin"}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Admin
                      </Link>
                      <Link
                        to={"/user/history"}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        History
                      </Link>
                      <button
                        onClick={() => logout()}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Link
                        to={"/user/history"}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        History
                      </Link>
                      <button
                        onClick={() => logout()}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded.md text-sm font-medium"
                    : "hover:bg-gray-200 px-3 py-2 rounded.md text-sm font-medium"
                }
              >
                Register
              </NavLink>

              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded.md text-sm font-medium"
                    : "hover:bg-gray-200 px-3 py-2 rounded.md text-sm font-medium"
                }
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
