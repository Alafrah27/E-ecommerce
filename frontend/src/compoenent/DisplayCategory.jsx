import React, { useState } from "react";
import { useEffect } from "react";
import { axiosInstance } from "../lib/Axios";
import { useNavigate } from "react-router-dom";

// const products = [
//   {
//     id: 1,
//     name: "Premium Wireless Headphones",

//     image:
//       "https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=Bw-VipXy6NZ5d09wrswFdMlftcB02ItY_ZctVBWgexI=",
//   },
//   {
//     id: 2,
//     name: "Smart Watch Series X",

//     image:
//       "https://media.istockphoto.com/id/2152181492/photo/girl-by-the-wall.webp?a=1&b=1&s=612x612&w=0&k=20&c=I1Mgy_RiF6AD9M59VORZo7nBdzx_y342XCpASk7osP0=",
//   },
//   {
//     id: 3,
//     name: "4K Ultra HD Camera",

//     image:
//       "https://media.istockphoto.com/id/1301799727/photo/a-man-stands-on-a-white-background-reads-the-news-on-the-phone-and-holds-an-ecological-bag.webp?a=1&b=1&s=612x612&w=0&k=20&c=CptXDuCjCFaEbkwhw-VNElUCfeMEBJrcg3aSOhc8jRw=",
//   },
//   {
//     id: 4,
//     name: "Gaming Laptop Pro",

//     image:
//       "https://images.unsplash.com/photo-1620464003286-a5b0d79f32c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhlYWx0aGNhcmUlMjBtYWtldXB8ZW58MHx8MHx8fDA%3D",
//     category: "Electronics",
//   },
//   {
//     id: 5,
//     name: "Wireless Earbuds",

//     image:
//       "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
//   },
//   {
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 7,
//     name: "Professional Microphone",

//     image:
//       "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//   },

//   {
//     id: 9,
//     name: "Wireless Mouse",
//     price: 79.99,
//     rating: 4.7,
//     image:
//       "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 10,
//     name: "Mechanical Keyboard",

//     image:
//       "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//   },
// ];

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
