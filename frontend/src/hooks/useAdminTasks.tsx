import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "../services/admin.service";

export const useAdminTasks = () => {
  return useQuery({
    queryKey: ["adminTasks"],
    queryFn: async () => {
      const res = await getAllTasks();
      return res.data.data.tasks;
    },
  });
};