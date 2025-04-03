import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/Axios";
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom";
// const products = [
//   {
//     id: 1,
//     name: "Classic Leather Jacket",
//     price: 199.99,
//     rating: 4.8,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPwEq5gn8K9qgUFOqzwigPqtp-OdCfEhK3CQ&s",
//   },
//   {
//     id: 2,
//     name: "Classic Leather Jacket",
//     price: 199.99,
//     rating: 4.8,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROGCrplXTnc6tQkqfDJIQH4TStKCuEblDidA&s",
//   },
//   {
//     id: 3,
//     name: "Classic Leather Jacket",
//     price: 199.99,
//     rating: 4.8,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1C56Qp556WMb56iRDkQPNxayuegan-PdzYw&s",
//   },
//   {
//     id: 4,
//     name: "Classic Leather Jacket",
//     price: 199.99,
//     rating: 4.8,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVBKS5x_m48rwR45uVnYRUAbZXc7xD2Ybkiw&s",
//   },
//   {
//     id: 5,
//     name: "Classic Leather Jacket",
//     price: 199.99,
//     rating: 4.8,
//     image:
//       "https://d2line.com/thatlook/wp-content/uploads/sites/4/2022/09/women-fashion-and-women-clothing.png",
//   },
// ];

function WomenDisplayCloth() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const categries = async () => {
      const res = await axiosInstance.get("/product/all?category=women");
      setProduct(res.data);
    };
    categries();
  }, []);
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Wemon's Fashion
        </h2>
        <button
          onClick={() => navigate("/product?category=women")}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-6">
        {product?.product?.map((product) => (
          <ProductList key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default WomenDisplayCloth;
