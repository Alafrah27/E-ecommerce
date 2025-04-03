import { SearchIcon, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { UseProducts } from "../hooks/useProduct/UseProduct";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get the current search term from URL if exists
  useEffect(() => {
    const currentSearchTerm = searchParams.get("search") || "";
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  // Pass the search term to the UseProducts hook
  const { Products, isPending } = UseProducts();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(e.target.value.length > 0);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsDropdownOpen(false);

    // Clear search parameter from URL if on product page
    if (location.pathname.includes("/product")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("search");
      setSearchParams(newParams);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      if (location.pathname.includes("/product")) {
        // Update search params if already on product page
        setSearchParams({
          ...Object.fromEntries([...searchParams]),
          search: searchTerm.trim(),
          page: 0, // Reset to first page when searching
        });
      } else {
        // Navigate to product page with search term
        navigate(
          `/product/all?search=${encodeURIComponent(searchTerm.trim())}&page=0`
        );
      }
    }
    setIsDropdownOpen(false);
  };

  const handlekeydown = (e) => {
    // if (e.key === "Enter") {
    //   handleSearch();
    // } else if (e.key === "Escape") {
    //   setIsDropdownOpen(false);
    // }

    if (e.key === "Enter") {
      const query = e.target.value;
      if (location.pathname === "/product") {
        setSearchParams({
          ...Object.fromEntries([...searchParams]),
          search: query,
        });
      } else {
        navigate(`/product?search=${query}`);
      }
    }
  };

  const handleProductClick = (productId, productName) => {
    if (location.pathname.includes(`product/${productId}`)) {
      setSearchParams((prevParams) => {
        delete prevParams.search;
      });
    } else {
      navigate(`/product/${productId}`);
      setIsDropdownOpen(false);
      setSearchTerm(productName);
    }
    // Navigate to product detail page
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto px-4 hidden md:block relative">
      <div className="relative" ref={inputRef}>
        <input
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm && setIsDropdownOpen(true)}
          onKeyDown={handlekeydown}
          type="text"
          placeholder="Search for products..."
          className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all bg-gray-50 hover:bg-white"
        />
        {searchTerm ? (
          <X
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            size={18}
            onClick={clearSearch}
          />
        ) : null}
        <SearchIcon
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          size={20}
          onClick={handleSearch}
        />
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden max-h-96"
        >
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Search Results
            </h3>
            {isPending ? (
              <div className="text-center py-8 text-gray-500">
                <p>Loading results...</p>
              </div>
            ) : Products?.product?.length > 0 ? (
              <ul>
                {Products.product
                  .filter(
                    (product) =>
                      product?.name
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      product?.description
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .slice(0, 5) // Limit dropdown items for better UX
                  .map((product) => (
                    <li
                      key={product._id}
                      className="py-2 px-3 hover:bg-blue-50 rounded-md cursor-pointer transition-colors flex items-center"
                      onClick={() =>
                        handleProductClick(product._id, product.name)
                      }
                    >
                      <SearchIcon size={16} className="text-gray-400 mr-2" />
                      <span>{product.name}</span>
                    </li>
                  ))}
                {Products.product.filter(
                  (product) =>
                    product?.name
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    product?.description
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                ).length > 5 && (
                  <li
                    className="py-2 px-3 text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer transition-colors text-center"
                    onClick={handleSearch}
                  >
                    See all results
                  </li>
                )}
              </ul>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No results found for "{searchTerm}"</p>
                <p className="text-sm mt-1">Try searching for something else</p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Press Enter to search or ESC to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchInput;
