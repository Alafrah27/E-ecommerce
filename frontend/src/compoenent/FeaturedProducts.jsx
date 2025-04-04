import React from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import ProductList from "./ProductList";
import { UseFeatured } from "../hooks/useProduct/UseProduct";

function CategoryProducts() {
  const { error, Featured, isLoading } = UseFeatured();
  if (error) return <h1>{error.message}</h1>;
  if (!Featured) return <h1>no feature Products</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  console.log(Featured);
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Featured Products
        </h2>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4    gap-6">
        {Featured?.map((product) => (
          <ProductList key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;
