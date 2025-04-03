import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
// import { Moon, Sun } from "lucide-react";

function Applayout() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen ">
      <Sidebar className="md:w-1/4 h-full fixed md:relative" />

      <div className="flex-1 bg-gray-100 dark:bg-slate-950 dark:text-white md:pl-1/4 h-screen overflow-y-auto">
        <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
        <div className="lg:p-16 p-4">
          <div className="max-w-screen-2xl  mx-auto p-2  flex gap-4 flex-wrap">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applayout;
