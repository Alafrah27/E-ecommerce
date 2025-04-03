import { axiosInstance } from "../../lib/Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

export function UseCashOrder() {
  const navigate = useNavigate();

  const { mutate: CashOrder, isPending } = useMutation({
    mutationFn: async (products) => {
      const res = await axiosInstance.post("/order/create", products);
      return res.data;
    },
    onSuccess: () => {
      toast.success("order has been successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { CashOrder, isPending };
}

export function UserOrders() {
  const {
    data: UserOrder,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userOrder"],
    queryFn: async () => {
      const res = await axiosInstance.get("/order/userOrder");
      return res.data;
    },
    onSuccess: () => {
      toast.success("order has been successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  return { UserOrder, error, isLoading };
}
