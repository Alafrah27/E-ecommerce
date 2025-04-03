import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../frontend/src/lib/Axios";

export const UseAnaliyes = () => {
  const {
    data: Analiys,
    isPending,
    error,
  } = useQuery({
    // Include search in the queryKey to refetch when search changes
    queryKey: ["analiyes"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/order/analiyes");
        return res.data;
      } catch (err) {
        console.error("Error fetching products:", err);
        throw err;
      }
    },
    placeholderData: keepPreviousData,
  });

  return { Analiys, isPending, error };
};
