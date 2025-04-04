import axios from "axios";
// const url =  "https://e-ecommerce-api.onrender.com/api"
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});
