import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://e-ecommerce-api.onrender.com",
  withCredentials: true,
});
