import { useEffect, useState } from "react";
import { UseProducts } from "../hooks/Product/useProducts";
import { axiosInstance } from "../lib/Axios";

function CategoryQuery() {
  const { handleCategory } = UseProducts();

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const categoryFn = async () => {
      try {
        const res = await axiosInstance.get(`/category/all`);
        setCategory(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    categoryFn();
  }, []);

  return (
    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 dark:text-white  p-4 rounded-lg shadow-sm">
      <select
        onChange={(e) => handleCategory(e)}
        className="appearance-none  bg-white dark:bg-slate-900 border-2 border-gray-200 
      dark:border-slate-800 rounded-lg px-4 py-2.5 pr-10 cursor-pointer
      text-gray-700 dark:text-gray-200 font-medium
      focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
      transition-all duration-200"
      >
        <option value="/product/all"> All Category </option>
        {category?.map((option) => (
          <option key={option?._id} value={option?.name}>
            {option?.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryQuery;
