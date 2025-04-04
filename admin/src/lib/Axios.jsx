import axios from "axios";
// const url =  "https://e-ecommerce-api.onrender.com/api"
export const axiosInstance = axios.create({
  baseURL: "https://e-ecommerce-api.onrender.com/api",
  withCredentials: true,
});
