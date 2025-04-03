import { Bell, LogOut, MenuIcon, Moon, Sun, User2, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileMenu from "../component/MobileMenu";
import { UseLogout, UserInfo } from "../hooks/Auth/useLogin";
import { UseOrders } from "../hooks/useOrder";

function Navbar({ setDarkMode, darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { User } = UserInfo();
  const { Logout } = UseLogout();
  const navigate = useNavigate();
  const { Orders } = UseOrders();
  const PendingOrders =
    Orders?.order?.filter((item) => item.status === "pending").length + 1;
  // Replace with actual user state management

  return (
    <div className="  w-full flex h-[60px] justify-between items-center sticky top-0 py-2  z-50  px-10 bg-white dark:bg-slate-950 dark:text-white gap-[30px] lg:justify-end">
      {/* Hamburger Icon for Mobile */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="  md:hidden cursor-pointer   "
      >
        {isOpen ? <X /> : <MenuIcon />}

        {/* Responsive Navbar */}
        {isOpen && (
          <div
            className={` absolute w-full h-[calc(100vh-60px)] mt-3  z-50  top-0 left-0 flex flex-col gap-2    transition-all ease-in-out ${
              isOpen ? "right-0" : "right-full"
            }`}
          >
            <MobileMenu />
          </div>
        )}
      </div>

      {/* User Section */}
      <div className="flex gap-10 items-center">
        <div className="flex gap-2 items-center">
          <img
            src={User?.image || "default-user.jpg"}
            alt="User"
            className="w-[35px] h-[35px] rounded-full text-blue-600 bg-gray-400 object-cover"
          />
          <h1 className="">
            {User?.name} {User?.lastname}
          </h1>
        </div>

        {/* Notification and User Account Buttons */}
        <div className="flex gap-5 justify-center items-center">
          {/* Notification Button */}
          <div className="relative flex items-center">
            <button className="bg-none border-none focus:outline-none text-gray-700 font-semibold text-1xl">
              <Bell />
            </button>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-lg rounded-full w-6 h-6 font-bold flex justify-center items-center">
              {PendingOrders}
            </span>
          </div>

          {/* User Account Button */}
          <span className="hidden md:flex items-center">
            <button
              onClick={() => navigate("/profile")}
              className="bg-none border-none focus:outline-none text-gray-700 font-semibold text-1xl"
            >
              <User2 />
            </button>
          </span>

          {/* Logout Button */}
          {User ? (
            <button
              onClick={() => {
                Logout();
              }}
              className="hidden md:flex bg-none border-none focus:outline-none text-gray-700 font-semibold text-1xl"
              aria-label="Log Out"
            >
              <LogOut />
            </button>
          ) : (
            <Link to="/login" className="hidden md:block" aria-label="Login">
              login
            </Link>
          )}
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className=" p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
