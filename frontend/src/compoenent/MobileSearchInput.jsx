import { Search, SearchIcon, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { UseProducts } from "../hooks/useProduct/UseProduct";
import debounce from "lodash.debounce";

function MobileSearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { Products, isPending } = UseProducts();

  // Mock search results - replace with your actual data

  // Close dropdown when clicking outside
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
          `/product?search=${encodeURIComponent(searchTerm.trim())}&page=0`
        );
      }
    }
    setIsDropdownOpen(false);
  };

  const handleKeyPress = debounce((e) => {
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
  }, 2000);

  const handleProductClick = (productName) => {
    if (location.pathname.includes(`product/${productName}`)) {
      setSearchParams((prevParams) => {
        delete prevParams.search;
      });
    } else {
      navigate(`/product?search=${productName}`);
      setIsDropdownOpen(false);
      setSearchTerm(productName);
    }
  };

  return (
    <div className="md:hidden w-full sticky top-0 z-10 bg-white px-4 py-2 shadow-sm">
      <div className="relative" ref={inputRef}>
        <input
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm && setIsDropdownOpen(true)}
          type="text"
          onKeyDown={handleKeyPress}
          placeholder="Search products..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
        />

        {searchTerm ? (
          <X
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
            size={18}
            onClick={clearSearch}
          />
        ) : null}
        <Search
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={20}
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
                      onClick={() => handleProductClick(product.name)}
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

export default MobileSearchInput;
