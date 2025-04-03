import React from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { UseOrders } from "../../hooks/useOrder";

function Filter({ options }) {
  const [searchParams] = useSearchParams();
  const { handleStatus } = UseOrders();

  const currentSort = searchParams.get("status") || "";

  //   const handleSort = (e) => {
  //     const newValue = e.target.value;
  //     if (newValue) {
  //       setSearchParams((prev) => {
  //         prev.set("status", newValue);
  //         prev.delete("sort");
  //         return prev;
  //       });
  //     }
  //   };

  return (
    <div className="relative">
      <div className="relative">
        <select
          onChange={handleStatus}
          value={currentSort}
          name="status"
          className="appearance-none w-full bg-white dark:bg-slate-900 border-2 border-gray-200 
                     dark:border-slate-800 rounded-lg px-4 py-2.5 pr-10 cursor-pointer
                     text-gray-700 dark:text-gray-200 font-medium
                     focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                     transition-all duration-200"
        >
          <option value="/order/all?status=pending">All staus</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 
                               pointer-events-none"
        />
      </div>
    </div>
  );
}

function OrderFilterByStatus() {
  const sortOptions = [
    { value: "completed", label: " Completed" },
    { value: "pending", label: " Pending" },
    { value: "cancelled", label: " Cancelled" },
  ];

  return (
    <div className="flex items-center gap-4 bg-white  dark:bg-slate-900 dark:text-white p-4 rounded-lg shadow-sm">
      <div className=" hidden  md:flex items-center gap-2 text-gray-700 dark:text-gray-200 ">
        <SlidersHorizontal className="w-5 h-5" />
        <span className="font-medium ">Satus By:</span>
      </div>
      <Filter options={sortOptions} />
    </div>
  );
}

export default OrderFilterByStatus;
