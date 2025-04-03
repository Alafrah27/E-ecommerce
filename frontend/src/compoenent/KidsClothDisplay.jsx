import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/Axios";

import { useNavigate } from "react-router-dom";

// const products = [
//   {
//     id: 1,
//     name: "Dinosaur Print Backpack",
//     price: 29.99,
//     rating: 4.8,
//     image:
//       "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Kids Fashion",
//   },
//   {
//     id: 2,
//     name: "Colorful Rain Boots",
//     price: 34.99,
//     rating: 4.9,
//     image:
//       "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Kids Fashion",
//   },
//   {
//     id: 3,
//     name: "Unicorn Party Dress",
//     price: 39.99,
//     rating: 4.7,
//     image:
//       "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Kids Fashion",
//   },
//   {
//     id: 4,
//     name: "Superhero Pajama Set",
//     price: 24.99,
//     rating: 4.8,
//     image:
//       "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Kids Fashion",
//   },
//   {
//     id: 5,
//     name: "Adventure Explorer Hat",
//     price: 19.99,
//     rating: 4.6,
//     image:
//       "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Kids Fashion",
//   },
//   {
//     id: 6,
//     name: "Cozy Winter Jacket",
//     price: 49.99,
//     rating: 4.9,
//     image:
//       "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Kids Fashion",
//   },
//   {
//     id: 7,
//     name: "Sport Sneakers",
//     price: 44.99,
//     rating: 4.7,
//     image:
//       "https://images.unsplash.com/photo-1514989940723-e8e51635b782?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Kids Fashion",
//   },
//   {
//     id: 8,
//     name: "Summer Fun Shorts Set",
//     price: 29.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1621452773781-0c13ee500505?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Kids Fashion",
//   },
//   {
//     id: 9,
//     name: "Animal Friends Sweater",
//     price: 34.99,
//     rating: 4.8,
//     image:
//       "https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Kids Fashion",
//   },
//   {
//     id: 10,
//     name: "Rainbow School Bag",
//     price: 39.99,
//     rating: 4.6,
//     image:
//       "https://images.unsplash.com/photo-1540479859555-17af45c78602?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Kids Fashion",
//   },
// ];

function KidsClothDisplay() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const categries = async () => {
      const res = await axiosInstance.get("/product/all?category=kids");
      setProduct(res.data);
    };
    categries();
  }, []);
  return (
    <div className="max-w-[2000px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Kid's Fashion
        </h2>
        <button
          onClick={() => navigate("/product?category=kids")}
          className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium"
        >
          View All
        </button>
      </div>

      <div className="relative bg-white p-10">
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
          {product?.product?.map((product) => (
            <div
              key={product?._id}
              className="flex-none w-[350px] snap-start bg-white rounded-lg shadow-md overflow-hidden  duration-300"
            >
              <div
                className="relative group"
                onClick={() => navigate(`/product/${product?._id}`)}
              >
                <img
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

export default KidsClothDisplay;
