import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { axiosInstance } from "../lib/Axios";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "react-router-dom";

export function UseOrders() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: 0,
    limit: 5,
  });

  const page = parseInt(searchParams.get("page")) || 0;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "";
  const status = searchParams.get("status") || "";

  const {
    data: Orders,
    isPending,
    error,
  } = useQuery({
    queryKey: ["order", page, limit, sort, status],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/order/all`, {
          params: {
            page,
            limit,
            sort,
            status,
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

      return prev;
    });
  };

  const handleBackPage = () => {
    setSearchParams((prev) => {
      const currentPage = parseInt(prev.get("page")) || 0;
      prev.set("page", Math.max(currentPage - 1, 0));
      prev.set("sort", "");

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

  const handleStatus = (e) => {
    const values = e.target.value;

    if (values) {
      setSearchParams((prev) => {
        prev.set("status", values);
        prev.set("page", 0);

        // Reset to first page when sorting changes and status changes
        return prev;
      });
    }
  };

  return {
    Orders,
    isPending,
    error,
    handleNxtPage,
    handleBackPage,
    handleSort,
    handleStatus,
    page,
  };
}

export function UseOrder() {
  const { id } = useParams();
  const {
    data: Order,
    isPending,
    error,
  } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/order/${id}`);
        return res.data;
      } catch (err) {
        console.error("Fehler beim Abrufen der Benutzer:", err);
        throw err; //
      }
    },
    placeholderData: keepPreviousData,
  });

  return {
    Order,
    isPending,
    error,
  };
}

export function DeleteOrders() {
  const queryClient = useQueryClient();
  const { mutate: Deleting, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/order/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Order has been deleted successfully");
      queryClient.invalidateQueries(["order"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { Deleting, isPending };
}

export function CompleteOrderStatus() {
  const queryClient = useQueryClient();
  const { mutate: CompletedOrder, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.patch(`/order/status/${id}`, {
        status: "completed",
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Order has been updated successfully");
      queryClient.invalidateQueries(["order"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { CompletedOrder, isPending };
}
export function CancelledOrderStatus() {
  const queryClient = useQueryClient();
  const { mutate: CancelledOrder, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.patch(`/order/status/${id}`, {
        status: "cancelled",
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Order has been updated successfully");
      queryClient.invalidateQueries(["order"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { CancelledOrder, isPending };
}
