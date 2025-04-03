import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://e-ecommerce-api.onrender.com/api",
  withCredentials: true,
});
