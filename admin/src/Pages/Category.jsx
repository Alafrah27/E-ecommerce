import { useState } from "react";
import AddCategory from "../Feature/category/AddCategory";
import FetchCategory from "../Feature/category/FetchCategory";

function Category() {
  const [search, setSearch] = useState("");
  return (
   <div className="flex flex-col  w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className=" text-[16px] lg:text-[24px] space-x-2 font-semibold  ">
          Categories
        </h1>
        <input
          onChange={(e) => setSearch(e.target.value)}
          className=" hidden lg:flex  py-5 px-3 w-1/3 dark:bg-slate-950 dark:text-white dark:border-slate-800 border-gray-300 border-2    bg-none  rounded-md focus:outline-none"
          type="type"
          placeholder="Search by Name"
        />
        <AddCategory />
      </div>
      <div className="flex flex-col    w-full border-1  dark:border-gray-700 border-gray-50 my-7 p-1">
        <FetchCategory search={search} />
      </div>
      <div className=" flex justify-end items-center my-2"></div>
    </div>
  );
}

export default Category;
