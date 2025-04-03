import React from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import ProductList from "./ProductList";
import SearchInput from "./Search";
import { UseProducts } from "../hooks/useProduct/UseProduct";
import { axiosInstance } from "../lib/Axios";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import OperactionPrice from "./FIlterProducts";

// const products = [
//   {
//     id: 1,
//     name: "Premium Wireless Headphones",
//     price: 299.99,
//     rating: 4.8,
//     image:
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 2,
//     name: "Smart Watch Series X",
//     price: 399.99,
//     rating: 4.9,
//     image:
//       "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 3,
//     name: "4K Ultra HD Camera",
//     price: 899.99,
//     rating: 4.7,
//     image:
//       "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 4,
//     name: "Gaming Laptop Pro",
//     price: 1299.99,
//     rating: 4.9,
//     image:
//       "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
//   },
//   {
//     id: 5,
//     name: "Wireless Earbuds",
//     price: 159.99,
//     rating: 4.6,
//     image:
//       "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
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
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
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
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
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
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
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
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
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
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
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
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
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
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
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
//     id: 6,
//     name: "Smart Home Hub",
//     price: 129.99,
//     rating: 4.5,
//     image:
//       "https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
//     category: "Electronics",
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
// ];

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
