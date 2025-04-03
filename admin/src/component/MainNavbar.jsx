import { ChartAreaIcon, LocateIcon, Users } from "lucide-react";
import {
  HiOutlineCake,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineUsers,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
function MainNavbar() {
  return (
    <nav className="h-full">
      <div className=" w-full  flex flex-col gap-10 my-[50px] bg-white dark:bg-slate-950 dark:text-white">
        <li className="flex gap-4 list-none no-underline items-center">
          <NavLink to="/dashboard" className="flex gap-4 justify-center ">
            <HiOutlineHome className="text-4xl text-blue-700 " />
            <span>Dasboard</span>
          </NavLink>
        </li>

        <li className="flex gap-4 list-none no-underline items-center">
          <NavLink to="/order" className="flex gap-4">
            <HiOutlineCalendarDays className="text-4xl text-blue-700 font-bold" />
            <span>Orders</span>
          </NavLink>
        </li>

        <li className="flex gap-4 list-none no-underline items-center">
          <NavLink to="/products" className="flex gap-4">
            <HiOutlineCake className="text-4xl text-blue-700 font-bold" />
            <span>All Product</span>
          </NavLink>
        </li>

        <li className="flex gap-4 list-none no-underline items-center">
          <NavLink to="/category" className="flex gap-4">
            <HiOutlineChatBubbleLeftRight className="text-4xl text-blue-700 font-bold" />
            <span> Categeries</span>
          </NavLink>
        </li>

        <li className="flex gap-4 list-none no-underline items-center">
          <NavLink to="/profile" className="flex gap-4">
            <HiOutlineUsers className="text-4xl text-blue-700 font-bold" />
            <span> Update Profile</span>
          </NavLink>
        </li>

        <li className="flex gap-4 list-none no-underline items-center">
          <NavLink to="/allusers" className="flex gap-4">
            <Users className="text-4xl text-blue-700 font-bold" />
            <span>All Users</span>
          </NavLink>
        </li>
        <li className="flex gap-4 list-none no-underline items-center">
          <NavLink to="/location" className="flex gap-4">
            <LocateIcon className="text-4xl text-blue-700 font-bold" />
            <span>Customer Location</span>
          </NavLink>
        </li>
        <li className="flex gap-4 list-none no-underline items-center">
          <NavLink to="/team" className="flex gap-4">
            <ChartAreaIcon className="text-4xl text-blue-700 font-bold" />
            <span>Support team</span>
          </NavLink>
        </li>
        <li className="flex gap-4 list-none no-underline items-center">
          <NavLink to="/getallusers" className="flex gap-4">
            <HiOutlineCog6Tooth className="text-4xl text-blue-700 font-bold" />
            <span>Settings</span>
          </NavLink>
        </li>
      </div>
    </nav>
  );
}
export default MainNavbar;
