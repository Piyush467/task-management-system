import api from "../api/axios";

export const getTasks = () => api.get("/tasks");

export const createTask = (data: any) =>
  api.post("/tasks", data);

export const updateTask = (
  id: string,
  data: any
) => api.patch(`/tasks/${id}`, data);

export const deleteTask = (id: string) =>
  api.delete(`/tasks/${id}`);