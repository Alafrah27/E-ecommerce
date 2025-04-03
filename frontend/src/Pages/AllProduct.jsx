import React, { useState } from "react";
// Ensure these import paths are correct
import FilterProductSide from "../compoenent/FilterProductSide";
import Footer from "../compoenent/footer";
import FetchProdcut from "../compoenent/FetchProduct";
import { FilterIcon } from "lucide-react";
import Navbar from "../compoenent/Navbar";
import { Helmet } from "react-helmet";

function AllProduct() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar />

      <div className="w-full py-8 px-6 bg-gray-50 h-screen">
        <Helmet>
          <title>All Product You Need From Musdar E-commerce</title>

          <meta
            name="description"
            content="Discover our [Product Name] at Musdar E-commerce! Enjoy high-quality features, competitive pricing, and fast shipping. Perfect for [target audience or use case]. Order now and elevate your experience!"
          />
        </Helmet>
        <div className="flex flex-col justify-between gap-4 max-h-screen">
          <div className="container mx-auto flex  flex-col md:flex-row gap-8  ">
            <button
              className={`bg-slate-100 w-24  flex justify-start items-center    text-base px-4  py-2  transition duration-300 ease-out rounded-lg h-[30px] mt-[20px] 
             
            `}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? (
                <>
                  <FilterIcon
                    className={` ${isOpen ? "text-red-500" : "text-blue-500"}`}
                    size={15}
                  />

                  <span>filter</span>
                </>
              ) : (
                <>
                  <FilterIcon
                    className={` ${isOpen ? "text-red-500" : "text-blue-500"}`}
                    size={15}
                  />

                  <span>filter</span>
                </>
              )}
            </button>
            {isOpen && <FilterProductSide setIsOpen={setIsOpen} />}{" "}
            <FetchProdcut />
            {/* Show filter if isOpen is true */}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default AllProduct;
