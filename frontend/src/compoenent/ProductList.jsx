import { Star } from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { formatCurrency } from "../lib/Date-Fns";

function ProductList({ product }) {
  const { _id: productId, name, image, description, price } = product;
  const location = useLocation();

  return (
    <li key={productId} className="bg-white">
      <Link
        to={
          location.pathname === `product`
            ? `/${productId}`
            : `/product/${productId}`
        }
        className="  rounded-lg overflow-hidden   py-6"
      >
        <div className="relative group">
          <img
            src={image}
            alt={name}
            className="w-[200px] h-[200px] p-8 lg:p-3 mx-auto  text-center object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
            {name}
          </h3>

          <p>{description?.slice(0, 20)}</p>
          <div className="flex items-center justify-between">
            <h1 className="font-extrabold text-gray-800">
              {formatCurrency(price)}
            </h1>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductList;
