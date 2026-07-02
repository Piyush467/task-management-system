import api from "../api/axios";

export const getAllTasks = () =>
  api.get("/admin/tasks");

export const deleteTask = (id: string) =>
  api.delete(`/admin/tasks/${id}`);