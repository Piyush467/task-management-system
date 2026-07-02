import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "http://localhost:5001/api/v1",

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest =
      error.config?.url?.includes("/auth/login");

    if (
      error.response?.status === 401 &&
      !isLoginRequest &&
      !window.location.pathname.startsWith("/login")
    ) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;