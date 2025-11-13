import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://travel-ease-server-tawny.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
