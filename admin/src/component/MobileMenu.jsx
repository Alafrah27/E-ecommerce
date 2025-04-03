import { Link, NavLink } from "react-router-dom";
import {
  HeadphonesIcon,
  LogInIcon,
  LogOut,
  ProjectorIcon,
  Users,
  MapPin,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tags,
  UserCog,
  Settings,
} from "lucide-react";

import { UseLogout, UserInfo } from "../hooks/Auth/useLogin";

function MobileMenu() {
  const { Logout } = UseLogout();
  const { User } = UserInfo();

  return (
    <div className=" relative w-full h-screen  flex flex-col gap-14  px-5 mt-[50px] bg-white dark:bg-slate-950 dark:text-white">
      <div className="flex flex-col gap-7  mt-[50px]">
        <li className="flex gap-4 list-none no-underline items-center  hover:bg-gray-100  hover:dark:bg-slate-900  dark:text-white px-3 py-4 rounded-md">
          <NavLink
            to="/dashboard"
            className="flex gap-4 justify-center active:text-blue-500 "
          >
            <LayoutDashboard size={15} className="text-4xl text-blue-700 " />
            <span>Dasboard</span>
          </NavLink>
        </li>

        <li className="flex gap-4 list-none no-underline items-center  hover:bg-gray-100 px-3 py-4 rounded-md  hover:dark:bg-slate-900  dark:text-white ">
          <NavLink to="/order" className="flex gap-4">
            <ShoppingCart
              size={15}
              className="text-4xl text-blue-700 font-bold"
            />
            <span>Orders</span>
          </NavLink>
        </li>

        <li className="flex gap-4 list-none no-underline items-center hover:bg-gray-100 px-3 py-4 rounded-md  hover:dark:bg-slate-900  dark:text-white">
          <NavLink to="/products" className="flex gap-4">
            <Package size={15} className="text-4xl text-blue-700 font-bold" />
            <span>All Product</span>
          </NavLink>
        </li>

        <li className="flex gap-4 list-none no-underline items-center hover:bg-gray-100 px-3 py-4 rounded-md  hover:dark:bg-slate-900  dark:text-white">
          <NavLink to="/category" className="flex gap-4">
            <Tags size={15} className="text-4xl text-blue-700 font-bold" />
            <span> Categeries</span>
          </NavLink>
        </li>

        <li className="flex gap-4 list-none no-underline items-center hover:bg-gray-100 px-3 py-4 rounded-md  hover:dark:bg-slate-900  dark:text-white">
          <NavLink to="/profile" className="flex gap-4">
            <UserCog size={15} className="text-4xl text-blue-700 font-bold" />

            <span> Update Profile </span>
          </NavLink>
        </li>

        <li className="flex gap-4 list-none no-underline items-center hover:bg-gray-100 px-3 py-4 rounded-md  hover:dark:bg-slate-900  dark:text-white">
          <NavLink to="/allusers" className="flex gap-4">
            <Users size={15} className="text-4xl text-blue-700 font-bold" />
            <span>All Users</span>
          </NavLink>
        </li>
        <li className="flex gap-4 list-none no-underline items-center hover:bg-gray-100 px-3 py-4 rounded-md  hover:dark:bg-slate-900  dark:text-white">
          <NavLink to="/location" className="flex gap-4">
            <MapPin size={15} className="text-4xl text-blue-700 font-bold" />
            <span>Customer Location</span>
          </NavLink>
        </li>
        <li className="flex gap-4 list-none no-underline items-center hover:bg-gray-100 px-3 py-4 rounded-md  hover:dark:bg-slate-900  dark:text-white">
          <NavLink to="/team" className="flex gap-4">
            <HeadphonesIcon
              size={15}
              className="text-4xl text-blue-700 font-bold"
            />
            <span>Support team</span>
          </NavLink>
        </li>
        <li className="flex gap-4 list-none no-underline items-center hover:bg-gray-100 px-3 py-4 rounded-md  hover:dark:bg-slate-900  dark:text-white">
          <NavLink to="/getallusers" className="flex gap-4">
            <Settings size={15} className="text-4xl text-blue-700 font-bold" />
            <span>Settings</span>
          </NavLink>
        </li>
      </div>
      <div className="fixed bottom-0  left-0 w-full flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-950 dark:text-white">
        {!User ? (
          <Link
            to="/login"
            className="flex items-center dark:text-white dark:bg-slate-900  justify-center w-full gap-2 bg-blue-500 text-white py-4 px-8 rounded-md hover:bg-blue-600 transition duration-300"
          >
            <LogInIcon />
            <span>Log In</span>
          </Link>
        ) : (
          <button
            onClickCapture={() => {
              Logout();
            }}
            className="flex items-center justify-center w-full gap-2 bg-red-500 text-white py-4 px-8 rounded-md hover:bg-red-600 transition duration-300"
          >
            <LogOut />
            <span>Log Out</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;
