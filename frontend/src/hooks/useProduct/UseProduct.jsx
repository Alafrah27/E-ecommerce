import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import { useParams, useSearchParams } from "react-router-dom";

export function UseProducts() {
  // Get search parameters from URL
  const [searchParams] = useSearchParams({
    page: 0,
    limit: 10,
  });

  // Convert search params to object for API request
  const searchObj = Object.fromEntries([...searchParams]);

  const page = parseInt(searchParams.get("page")) || 0;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  const {
    data: Products,
    isPending,
    error,
    refetch,
  } = useQuery({
    // Include search in the queryKey to refetch when search changes
    queryKey: [
      "product",
      page,
      limit,
      search,
      searchObj.category,
      searchObj.sort,
    ],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/product/all`, {
          params: {
            page,
            limit,
            ...searchObj,
          },
        });
        return res.data;
      } catch (err) {
        console.error("Error fetching products:", err);
        throw err;
      }
    },
    placeholderData: keepPreviousData,
  });

  return {
    Products,
    isPending,
    error,
    limit,
    page,
    refetch,
  };
}

export function UseSingleProduct() {
  const { id } = useParams();
  const {
    data: SingleProduct,
    isPending,
    error,
  } = useQuery({
    queryKey: ["single"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/product/${id}`);
        return res.data;
      } catch (err) {
        console.error("Fehler beim Abrufen der Benutzer:", err);
        throw err; //
      }
    },
  });

  return {
    SingleProduct,
    isPending,
    error,
  };
}
export function UseFeatured() {
  const {
    data: Featured,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featured"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/product/featured");
        return res.data;
      } catch (err) {
        console.error("Fehler beim Abrufen der Benutzer:", err);
        throw err; //
      }
    },
    placeholderData: keepPreviousData,
  });

  return {
    Featured,
    isLoading,
    error,
  };
}

export function ReleatedProduct() {
  const { data: ReleatedProduct } = useQuery({
    queryKey: ["related"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/product/related", {
          params: {},
        });
        return res.data;
      } catch (err) {
        console.error("Fehler beim Abrufen der Benutzer:", err);
        throw err; //
      }
    },
    placeholderData: keepPreviousData,
  });

  return { ReleatedProduct };
}
