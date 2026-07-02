import api from "../api/axios";

export const login = (data: {
  email: string;
  password: string;
}) => api.post("/auth/login", data);

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/auth/register", data);

export const me = () => api.get("/auth/me");

export const logout = () => api.post("/auth/logout");