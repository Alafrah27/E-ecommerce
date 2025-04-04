import React from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import ProductList from "./ProductList";
import SearchInput from "./Search";
import { UseProducts } from "../hooks/useProduct/UseProduct";
import { axiosInstance } from "../lib/Axios";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import OperactionPrice from "./FIlterProducts";

const fetchPost = async (pageParam, searchParams) => {
  const searchObj = Object.fromEntries([...searchParams]);
  console.log("searchObj", searchObj);
  const sort = searchParams.get("sort") || "";
  const res = await axiosInstance.get(`/product/all`, {
    params: { page: pageParam, limit: 5, sort, ...searchObj },
  });
  return res.data;
};

function FetchProduct() {
  const [searchParams] = useSearchParams();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    // isFetching,
    isLoading,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["product", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPost(pageParam, searchParams),
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.hasMore ? pages.length + 1 : undefined,
  });

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") return <h1>Something went wrong: {error.message}</h1>; // Added error message

  // Flatten pages and ensure you are accessing the correct key in your API response
  const AllPost = data?.pages.flatMap((page) => page.product) || []; // Ensure you use 'product' based on your API response

  if (AllPost.length === 0) return <h1>No Post Found</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          All Products
        </h2>
        {/* <OperactionPrice /> */}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {AllPost.map((product) => (
          <ProductList key={product._id} product={product} />
        ))}
      </div>

      {/* Optional Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center my-10">
          <button
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" // Add your button styles
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default FetchProduct;
