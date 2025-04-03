import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SlidersHorizontal, Tags } from "lucide-react";

const categories = [
  { label: "All Products", value: "" },
  { label: "Men's Wear", value: "men" },
  { label: "Women's Wear", value: "women" },
  { label: "Kids' Collection", value: "kids" },
  { label: "Electronics", value: "electronic" },
  { label: "Watches", value: "watches" },
];

const sortOptions = [
  { label: "Price: High to Low", value: "desc" },
  { label: "Price: Low to High", value: "asc" },
  { label: "New Collection", value: "new" },
  { label: "Recommended", value: "old" },
];

function FilterProductSide({ setIsOpen }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentSort = searchParams.get("sort") || "";
  const currentCategory = searchParams.get("category") || "";

  const handleFilter = (e) => {
    const values = e.target.value;
    if (values !== currentSort) {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        sort: values,
      });
    }
  };

  return (
    <aside className=" w-64 bg-white shadow-lg rounded-lg p-6 h-max sticky top-20 mt-[60px] z-50 ">
      {/* Sort Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Sort By</h2>
        </div>
        <div className="space-y-2 text-[14px] font-bold ">
          {sortOptions.map((option) => (
            <label
              onClick={() => setIsOpen(false)}
              key={option.value}
              className="flex items-center gap-3 group cursor-pointer "
            >
              <div className="relative">
                <input
                  type="radio"
                  value={option.value}
                  name="sort"
                  checked={currentSort === option.value}
                  onChange={handleFilter}
                  className="appearance-none w-5 h-5 border-2 rounded-full border-blue-600 checked:border-blue-600 
                           transition-all duration-200 ease-in-out cursor-pointer"
                />
                <div
                  className={`absolute inset-0 rounded-full pointer-events-none
                              ${
                                currentSort === option.value
                                  ? "scale-50 bg-blue-600"
                                  : "scale-0"
                              }
                              transition-transform duration-200`}
                />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Tags className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
        </div>
        <div className="space-y-3 text-lg" onClick={() => setIsOpen(false)}>
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() =>
                navigate(
                  category.value
                    ? `/product?category=${category.value}`
                    : "/product"
                )
              }
              className={`w-full text-left px-3 py-2 rounded-md  font-semibold transition-all duration-200 text-lg
                        ${
                          currentCategory === category.value
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default FilterProductSide;
