import React, { useState } from "react";
import { useEffect } from "react";
import { axiosInstance } from "../lib/Axios";
import { useNavigate } from "react-router-dom";

function DisplayCategory() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const categries = async () => {
      const res = await axiosInstance.get("/product/all?category");
      setProduct(res.data);
    };
    categries();
  }, []);
  console.log("from category", product);
  return (
    <div className="max-w-[2000px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          All Categories
        </h2>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          View All
        </button>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
          {product?.product?.map((product) => (
            <div
              key={product?._id}
              className="flex-none w-[350px] snap-start bg-white rounded-lg shadow-md overflow-hidden  duration-300"
            >
              <div className="relative group">
                <img
                  onClick={() => navigate(`/product?category=${product.name}`)}
                  src={product.image}
                  alt={product.name}
                  className="w-full flex-grow h-[250px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayCategory;
