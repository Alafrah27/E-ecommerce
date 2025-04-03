import { Link, NavLink } from "react-router-dom";
import {
  LogInIcon,
  LogOut,
  Home,
  ShoppingBag,
  Settings,
  Clock,
  Package,
} from "lucide-react";
import { UseLogout, UserInfo } from "../hooks/Auth/useLogin";

function MobileNavbar() {
  const { Logout } = UseLogout();
  const { User } = UserInfo();

  const navLinkClasses =
    "flex items-center gap-3 py-3 px-4 rounded-lg transition-colors hover:bg-gray-50 text-gray-700";
  const activeNavLinkClasses = "bg-gray-50 text-blue-600 font-medium";

  return (
    <nav className="relative min-h-screen flex flex-col bg-white">
      {/* User Profile Section */}
      <div className="flex items-center gap-4 p-6 border-b border-gray-100">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
            alt={`${User?.name}'s avatar`}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Welcome back,</span>
          <span className="text-lg font-semibold text-gray-900">
            {User?.name}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-6">
          {/* Main Navigation */}
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
              }
            >
              <Home size={20} />
              <span>Home</span>
            </NavLink>
          </div>

          {/* Categories Section */}
          <div className="space-y-3">
            <h2 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Categories
            </h2>
            <div className="space-y-1">
              {["Women", "Men", "Kids"].map((category) => (
                <NavLink
                  key={category}
                  to={`/product?category=${category.toLowerCase()}`}
                  className={({ isActive }) =>
                    `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
                  }
                >
                  <ShoppingBag size={20} />
                  <span>{category}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Orders Section */}
          <div className="space-y-3">
            <Link
              to="/myorder"
              className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider"
            >
              My Orders
            </Link>

            <div className="space-y-1">
              <NavLink
                to="/recentlyorder"
                className={({ isActive }) =>
                  `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
                }
              >
                <Clock size={20} />
                <span>Recent Orders</span>
              </NavLink>
              <NavLink
                to="/myorder"
                className={({ isActive }) =>
                  `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
                }
              >
                <Package size={20} />
                <span>All Orders</span>
              </NavLink>
            </div>
          </div>

          {/* Settings */}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
            }
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>

      {/* Auth Button */}
      <div className="sticky bottom-0 p-4 border-t border-gray-100 bg-white">
        {!User ? (
          <Link
            to="/login"
            className="flex items-center justify-center w-full gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <LogInIcon size={20} />
            <span>Log In</span>
          </Link>
        ) : (
          <button
            onClick={Logout}
            className="flex items-center justify-center w-full gap-2 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default MobileNavbar;
