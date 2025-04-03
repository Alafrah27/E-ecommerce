import React, { useState } from "react";
import { Search, ShoppingCart, Package, User, MenuIcon, X } from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import SearchInput from "./Search";
import { Link, useNavigate } from "react-router-dom";
import MobileSearchInput from "./MobileSearchInput";
import { UseCartApi } from "../context/CartContext";
import { IoMdNotificationsOutline } from "react-icons/io";
import { UseNotifications } from "../hooks/Notifications/useNotifications";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { products } = UseCartApi();
  const { notifications } = UseNotifications();
  const readNotifications = notifications?.filter(
    (notification) => !notification?.read
  ).length;
  return (
    <header className="flex flex-col w-full bg-white shadow-sm">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center px-4 md:px-8 py-4 border-b">
        <div
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="mainlogo.jpeg"
            alt="logo ecommerce"
            className="w-14 h-14 md:w-10 md:h-10 object-cover bg-white"
          />
          <span className="text-lg font-semibold text-slate-700">
            Musdar Shope
          </span>
        </div>

        {/* Search Bar */}
        <SearchInput />

        {/* Navigation Items */}
        <ul className="flex items-center gap-5">
          <li className="hidden md:flex items-center gap-2 cursor-pointer ">
            <Link to="/myorder" className="flex items-center gap-1">
              <Package size={15} />
              <span>Orders</span>
            </Link>
          </li>
          <li
            className="hidden md:flex items-center gap-1 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <User size={15} />
            <span>Account</span>
          </li>
          <li className="hidden md:flex items-center gap-1 cursor-pointer relative">
            <Link to="/natification">
              <IoMdNotificationsOutline size={15} />
              <span className="absolute top-0 right-0 text-lg p-2 bg-red-600 text-white w-6 h-6 font-bold rounded-full flex items-center justify-center">
                {readNotifications}
              </span>
            </Link>
          </li>
          <Link to="/cart" className="flex items-center gap-1 cursor-pointer ">
            <div className="relative">
              <ShoppingCart size={15} />
              {products?.length > 0 && (
                <span className="absolute top-0 right-0 text-lg bg-red-500 text-white w-5 h-5 font-bold rounded-full flex items-center justify-center">
                  {products?.length}
                </span>
              )}
            </div>
          </Link>

          {/* {/* Mobile Menu Notifications */}
          <li className=" md:hidden flex items-center gap-1 cursor-pointer relative">
            <Link to="/natification">
              <IoMdNotificationsOutline size={20} />
              <span className="absolute top-0 right-0 text-lg p-2 bg-red-600 text-white w-6 h-6 font-bold rounded-full flex items-center justify-center">
                {readNotifications}
              </span>
            </Link>
          </li>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className=" lg:hidden flex items-center gap-1 cursor-pointer "
          >
            {isOpen ? <X /> : <MenuIcon />}

            {/* Responsive Navbar */}
            {isOpen && (
              <div
                className={` fixed w-full h-[calc(100vh-60px)]   z-50  top-0 left-0 flex flex-col gap-2    transition-all ease-in-out ${
                  isOpen ? "right-0" : "right-full"
                }`}
              >
                <MobileNavbar />
              </div>
            )}
          </div>
        </ul>
      </nav>

      {/* Mobile Search */}

      <MobileSearchInput />

      {/* Categories Scroll */}
      <div className="relative bg-slate-950 text-white">
        <div className="flex overflow-x-auto scrollbar-hide gap-6 px-4 py-3 items-center whitespace-nowrap scroll-smooth">
          <button
            onClick={() => navigate("/product")}
            className="category-btn text-xl"
          >
            All Products
          </button>
          <button
            className="category-btn text-xl"
            onClick={() => navigate("/product?category=men")}
          >
            Men's Fashion
          </button>
          <button
            className="category-btn text-xl"
            onClick={() => navigate("/product?category=women")}
          >
            Women's Fashion
          </button>
          <button
            className="category-btn text-xl"
            onClick={() => navigate("/product?category=kids")}
          >
            kids's Fashion
          </button>
          <button
            className="category-btn text-xl"
            onClick={() => navigate("/product?category=electronic")}
          >
            Electronics
          </button>
          <button
            className="category-btn text-xl"
            onClick={() => navigate("/product?category=perfume")}
          >
            Perfume
          </button>
          <button
            className="category-btn text-xl"
            onClick={() => navigate("/product?category=shoes")}
          >
            Shoes
          </button>

          <button
            className="category-btn text-xl"
            onClick={() => navigate("/product?category=jeans")}
          >
            Jeans
          </button>
          <button
            className="category-btntext-xl"
            onClick={() => navigate("/product?category=watchs")}
          >
            watch
          </button>
          <button
            className="category-btn text-xl"
            onClick={() => navigate("/product?category=handbage")}
          >
            Hand Bag
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
