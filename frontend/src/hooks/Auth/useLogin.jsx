import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "../../lib/Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function UserInfo() {
  const { data: User } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "https://e-ecommerce-api.onrender.com/api/user/profile"
      );
      return res.data;
    },
  });

  return { User };
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
      navigate("/");
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
      const res = await axiosInstance.post("/user/login", data);
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
export function UseSignup() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: SignupUser, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/user/register", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("register has been successfully");
      queryClient.invalidateQueries(["user"]);

      navigate("/verify");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { SignupUser, isPending };
}
export function UseVerify() {
  const navigate = useNavigate();

  const { mutate: VerifyAcount, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/user/verify", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("account has been verify successfully");

      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { VerifyAcount, isPending };
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
