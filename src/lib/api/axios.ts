import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";

const BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isLoginRequest = originalRequest.url.includes("/auth/login");

    if (
      error.response?.status === 401 &&
      !isLoginRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

        const newAccessToken = response.data.accessToken;

        useAuthStore.getState().setAuth(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
