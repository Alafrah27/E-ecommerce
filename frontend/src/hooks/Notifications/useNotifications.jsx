import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../../lib/Axios";
export function UseNotifications() {
  const {
    data: notifications,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/notification/all");
        return res.data;
      } catch (err) {
        console.error("Fehler beim Abrufen der Benutzer:", err);
        throw err; //
      }
    },
    onSuccess: () => {},
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
    placeholderData: keepPreviousData,
  });

  return { notifications, error, isLoading };
}

export function MarkasReadedNotifications() {
  const { mutate: MarkasReaded, isPending } = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await axiosInstance.post(
          `/notification/mark-all-as-read/${id}`,
          {
            read: true,
          }
        );
        return res.data;
      } catch (err) {
        console.error("Fehler beim Abrufen der Benutzer:", err);
        throw err; //
      }
    },
    onSuccess: () => {
      toast.success("Notifications has been successfully marked as readed");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  return { MarkasReaded, isPending };
}
