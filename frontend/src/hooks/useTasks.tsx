import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/task.service";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await getTasks();
      return res.data.data.tasks;
    },
  });
};