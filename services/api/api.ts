import { localStorageKeys } from "@/utils/localStorageKeys";
import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: baseURL,
});

// REQUEST
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(localStorageKeys.accessToken);

    if (accessToken && config.url !== "/clients") {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // limpa dados
      localStorage.removeItem(localStorageKeys.accessToken);

      // opcional: limpar tudo
      localStorage.clear();

      window.location.href = "/";
    }

    return Promise.reject(error);
  },
);

export default api;
