import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { axiosInstance } from "../../lib/Axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

export function UserInfo() {
  const { data: User } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get("/user/profile");
      return res.data;
    },
  });

  return { User };
}

export function GetAllUser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const {
    data: AllUser,
    isPending,
    error,
  } = useQuery({
    queryKey: ["getAllUser", search],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/user/all?search=${search}`, {
          params: {
            search,
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

  const handleSearch = debounce((e) => {
    const query = e.target.value;
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete("search");
        return newParams;
      });
    }
  }, 1000);

  return { AllUser, isPending, error, handleSearch };
}
export function UseLogout() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: Logout } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/user/logout");
      return res.data;
    },
    onSuccess: () => {
      toast.success("logout has been successfully");
      queryClient.invalidateQueries(["user"]);
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { Logout };
}
export function UseResetPassword() {
  const navigate = useNavigate();

  const { mutate: RestPassword, isPending } = useMutation({
    mutationFn: async ({ token, password }) => {
      const res = await axiosInstance.post(`/user/resetpassword/${token}`, {
        password,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success(" password reset  successfully");

      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { RestPassword, isPending };
}
export function UseForgetPassword() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: SendForgetPasswordToEmail, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/user/forgetPassword", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("link send  successfully");
      queryClient.invalidateQueries(["user"]);
      navigate("/emailtemplate");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { SendForgetPasswordToEmail, isPending };
}
export function UseLogin() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/user/admin", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("login has been successfully");
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["getAllUser"]);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { login, isPending };
}

export function UsepdateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { User } = UserInfo();
  const { mutate: UpdateProfile, isPending } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosInstance.put(
        `/user/update/${User?._id}`,
        updatedData
      );

      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["user"]); // Change this if the query key is different
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  return { UpdateProfile, isPending };
}
export function UseDelteUser() {
  const queryClient = useQueryClient();

  const { mutate: DeleteUser, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/user/${id}`);

      return res.data;
    },
    onSuccess: () => {
      toast.success("User has been delete successfully");
      queryClient.invalidateQueries(["user"]); // Change this if the query key is different
      queryClient.invalidateQueries(["getAllUser"]); // Change this if the query key is different
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  return { DeleteUser, isPending };
}
