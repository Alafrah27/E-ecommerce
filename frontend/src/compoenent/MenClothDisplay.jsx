import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { axiosInstance } from "../lib/Axios";
import { useNavigate } from "react-router-dom";

function MenClothDisplay() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const categries = async () => {
      const res = await axiosInstance.get("/product/all?category=electronic");
      setProduct(res.data);
    };
    categries();
  }, []);
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Electronics
        </h2>
        <button
          onClick={() => navigate("/product?category=electronic")}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-6">
        {product?.product?.map((product) => (
          <ProductList key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default MenClothDisplay;
