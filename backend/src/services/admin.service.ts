import Task from "../models/Task";

import ApiError from "../utils/ApiError";
import { HTTP_STATUS } from "../utils/constants";

export const getAllTasks = async (
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    Task.find()
      .populate("owner", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Task.countDocuments(),
  ]);

  return {
    tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const deleteAnyTask = async (
  taskId: string
) => {
  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Task not found"
    );
  }
};