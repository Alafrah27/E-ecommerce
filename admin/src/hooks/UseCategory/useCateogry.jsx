import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../../lib/Axios";

export function GetAllCategories() {
  const {
    data: AllCategory,
    isPending,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/category/all");
        return res.data;
      } catch (err) {
        console.error("Fehler beim Abrufen der Benutzer:", err);
        throw err; //
      }
    },
    placeholderData: keepPreviousData,
  });

  return { AllCategory, isPending, error };
}
export function UseCategory() {
  const queryClient = useQueryClient();
  const { mutate: category, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/category/create", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("category has been created successfully");
      queryClient.invalidateQueries(["category"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { category, isPending };
}
export function UseDelete() {
  const queryClient = useQueryClient();
  const { mutate: Delete, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/category/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("category has been delete successfully");
      queryClient.invalidateQueries(["category"]);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { Delete, isPending };
}
