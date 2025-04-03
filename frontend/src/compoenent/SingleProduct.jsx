import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Heart, Minus, Plus, ArrowLeft, Star } from "lucide-react";
import { UseSingleProduct } from "../hooks/useProduct/UseProduct";
import { UseCartApi } from "../context/CartContext";

import RelatedProduct from "../compoenent/ReleteatProduct";
import { UseComments } from "../hooks/comments/useComment";
import { formatCurrency } from "../lib/Date-Fns";
import { Helmet } from "react-helmet";

function ProductPage() {
  const navigate = useNavigate();
  const { error, SingleProduct } = UseSingleProduct();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  console.log("SingleProduct", SingleProduct);
  const { FetchComment } = UseComments();

  const averageRating =
    FetchComment?.reduce((acc, comment) => acc + comment.rating, 0) /
      FetchComment?.length || 0;
  const {
    products,
    setProducts,
    increaseItemQuantity,
    currentQuantity,
    decreaseItemQuantity,
  } = UseCartApi();

  console.log("SingleProduct", products);

  const colors = ["Black", "white", "blue", "yellow"];
  const sizes = ["S", "M", "L", "Xl"];

  const handleAddToCart = () => {
    const NewProduct = {
      id: SingleProduct?._id,
      quantity: 1, // This can be adjusted based on your quantity logic
      name: SingleProduct?.name,
      image: SingleProduct?.image,
      price: SingleProduct?.price,
      color: selectedColor,
      size: selectedSize,
      category: SingleProduct?.category,
    };

    setProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (item) =>
          item.productId === NewProduct.productId &&
          item.color === NewProduct.color &&
          item.size === NewProduct.size
      );

      if (existingProduct) {
        // If the product already exists, increase its quantity instead
        return prevProducts.map((item) =>
          item.productId === NewProduct.productId &&
          item.color === NewProduct.color &&
          item.size === NewProduct.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevProducts, NewProduct];
    });
  };

  if (error) return <h1>{error.message}</h1>;
  return (
    <div className="w-full flex flex-col   ">
      <Helmet>
        <title>{`${SingleProduct?.name}`}</title>

        <meta
          name="description"
          content={`Shop the ${SingleProduct?.name} at Musdar E-commerce! Experience top-notch quality, innovative features, and great value. Perfect for [target audience or use case]. Don't miss out on this must-have item!`}
        />
      </Helmet>
      <div className=" container mx-auto px-4 sm:px-6 lg:px-8 py-8 h-screen ov">
        <div className="flex gap-6 items-center mb-10 ">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center  text-gray-600 hover:text-gray-900 "
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-blue-600 flex gap-6  ">
              <span className="text-gray-400">Back to back</span>
            </span>
          </button>
          <span className="text-blue-600 flex gap-6  ">
            <Link to="/">home</Link>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Product Image */}
          <div className="relative w-full flex ">
            <img
              src={SingleProduct?.image}
              alt={SingleProduct?.name}
              className="w-full flex-1 h-[400px] object-contain rounded-xl"
            />
            <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:bg-gray-100">
              <Heart className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Product Details */}
          <div>
            <div className="flex space-x-1 mb-4">
              {FetchComment?.length > 0 &&
                Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={`w-6 h-6 ${
                      index < averageRating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                ))}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {SingleProduct?.name}
            </h1>

            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(SingleProduct?.price)}
              </span>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Description
              </h2>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {SingleProduct?.description}
              </p>
            </div>

            {/* Color Selection */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">Color</h2>
              <div className="flex space-x-4 mt-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border ${
                      selectedColor === color
                        ? `border-blue-900 border-2 border-${color} bg-${color}`
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color }} // Set the background color to the color itself
                  ></button> // No text, just a filled color button
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Size</h2>
              <div className="flex space-x-4 mt-2">
                {sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSize === size
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Quantity</h2>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => {
                    decreaseItemQuantity(SingleProduct?._id);
                  }}
                  className="p-2 rounded-lg border border-gray-300 hover:border-gray-400"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-semibold">
                  {currentQuantity(SingleProduct?._id)}
                </span>
                <button
                  onClick={() => increaseItemQuantity(SingleProduct?._id)}
                  className="p-2 rounded-lg border border-gray-300 hover:border-gray-400"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-8 w-full bg-blue-600 text-white py-5 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Add to Cart
            </button>

            {/* Additional Information */}
            <div className="mt-8 border-t border-gray-200 my-16">
              <div className="flex items-center gap-5 my-6">
                <Link
                  to={`/product/${SingleProduct?._id}/review`}
                  className="text-2xl font-bold hover:bg-blue-600 hover:text-white rounded-xl border border-gray-300 hover:border-gray-400 py-2 px-5 focus:bg-blue-600 focus:text-white focus:mr-2" // Add focus styles here
                >
                  description
                </Link>
                <Link
                  to={`/product/${SingleProduct?._id}/description`}
                  className="text-2xl font-bold hover:bg-blue-600 hover:text-white rounded-xl border border-gray-300 hover:border-gray-400 py-2 px-5 focus:bg-blue-600 focus:text-white focus:ml-2" // Add focus styles here
                >
                  review
                </Link>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
        <RelatedProduct category={SingleProduct?.category?.name} />
      </div>
    </div>
  );
}

export default ProductPage;
