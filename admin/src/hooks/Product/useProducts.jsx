import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
// import { Page, Limit } from "../../helper/Pagination";

export function UseCreate() {
  const queryClient = useQueryClient();
  const {
    mutate: Product,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/product/create", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("product has been successfully");

      queryClient.invalidateQueries(["product"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      toast.error("faild to create product");
    },
  });

  return { Product, isPending, error };
}

export function UseUpdate() {
  const queryClient = useQueryClient();
  const { mutate: useupdateProduct, isPending } = useMutation({
    mutationFn: async ({ NewUpdate, id }) => {
      const res = await axiosInstance.put(`/product/${id}`, NewUpdate);
      return res.data;
    },
    onSuccess: () => {
      toast.success("product has been update successfully");

      queryClient.invalidateQueries(["product"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      console.log(error);
      toast.error("faild to create product");
    },
  });

  return { useupdateProduct, isPending };
}

export function UseFeature() {
  const queryClient = useQueryClient();
  const { mutate: ProductFeatures, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.patch(`/product/featured/${id}`, {
        featured: false,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("product has been feature successfully");
      queryClient.invalidateQueries(["product"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      toast.error("faild to feature product");
    },
  });

  return { ProductFeatures, isPending };
}
export function UseUnFeature() {
  const queryClient = useQueryClient();
  const { mutate: UnFeatures, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.patch(`/product/featured/${id}`, {
        featured: true,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("product has been feature successfully");
      queryClient.invalidateQueries(["product"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      toast.error("faild to feature product");
    },
  });

  return { UnFeatures, isPending };
}
export function UseDelete() {
  const queryClient = useQueryClient();
  const { mutate: Delete, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/product/delete/${id}`);
      return res.data;
    },

    onSuccess: () => {
      toast.success("product has been deleted successfully");

      queryClient.invalidateQueries(["product"]);
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { Delete, isPending };
}

export function UseProducts() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: 0,
    limit: 5,
  });

  const page = parseInt(searchParams.get("page")) || 0;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "";

  const {
    data: Products,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["product", page, limit, sort, category],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/product/all`, {
          params: {
            sort,
            page,
            limit,
            category,
          },
        });
        return res.data;
      } catch (err) {
        console.error("Fehler beim Abrufen der Benutzer:", err);
        throw err; //
      }
    },
    placeholderData: keepPreviousData,
  });

  const handleNxtPage = () => {
    setSearchParams((prev) => {
      const currentPage = parseInt(prev.get("page")) || 0;
      prev.set("page", currentPage + 1);
      prev.set("sort", "");
      prev.set("category", "");
      return prev;
    });
  };

  const handleBackPage = () => {
    setSearchParams((prev) => {
      const currentPage = parseInt(prev.get("page")) || 0;
      prev.set("page", Math.max(currentPage - 1, 0));
      prev.set("sort", "");
      prev.set("category", "");
      // Prevent negative page numbers
      return prev;
    });
  };

  const handleSort = (e) => {
    const values = e.target.value;

    if (values) {
      setSearchParams((prev) => {
        prev.set("sort", values);
        prev.set("page", 0);
        prev.delete("category");

        // Reset to first page when sorting changes
        return prev;
      });
    }
  };

  const handleCategory = (e) => {
    const values = e.target.value;

    if (values) {
      setSearchParams((prev) => {
        prev.set("category", values);
        prev.set("sort", "");
        prev.set("page", 0);

        // Reset to first page when sorting changes
        return prev;
      });
    }
  };

  useEffect(() => {
    refetch();
  }, [category, sort, refetch]);

  return {
    Products,
    isPending,
    error,
    limit,
    page,
    handleNxtPage,
    handleBackPage,
    handleSort,
    handleCategory,
  };
}

export function UseCategory() {
  const {
    data: Category,
    isPending,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/category/all");
        return res.data;
      } catch (err) {
        console.error(err);
        throw err; //
      }
    },
    placeholderData: keepPreviousData,
  });

  return { Category, isPending, error };
}
