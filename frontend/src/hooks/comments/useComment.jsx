import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosInstance } from "../../lib/Axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export function UseAddComment() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { mutate: AddComment, isPending } = useMutation({
    mutationFn: async (comment) => {
      const res = await axiosInstance.post(`/comment/${id}`, comment);
      return res.data;
    },
    onSuccess: () => {
      toast.success("comment  has been add successfully");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
      console.log(error);
    },
  });

  return { AddComment, isPending };
}

export function UseComments() {
  const { id } = useParams();
  const { data: FetchComment, error } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/comment/${id}`);
        return res.data;
      } catch (err) {
        console.error("Fehler beim Abrufen der Benutzer:", err);
        throw err; //
      }
    },
    onSuccess: () => {
      toast.success("comment  has been add successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    placeholderData: keepPreviousData,
  });

  return { FetchComment, error };
}
