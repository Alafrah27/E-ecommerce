import axios from "axios";
const url = "https://e-ecommerce-api.onrender.com";
export const axiosInstance = axios.create({
  baseURL: `${url}/api`,
  withCredentials: true,
});
