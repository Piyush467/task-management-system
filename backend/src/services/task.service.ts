import Task from "../models/Task";

import ApiError from "../utils/ApiError";
import { HTTP_STATUS } from "../utils/constants";

import {
    CreateTaskInput,
    UpdateTaskInput,
} from "../validators/task.schema";

import { TaskStatus } from "../types/task.types";

export const createTask = async (
    data: CreateTaskInput,
    ownerId: string
) => {
    return Task.create({
        ...data,
        owner: ownerId,
    });
};

interface TaskFilters {
    status?: TaskStatus;
    page?: number;
    limit?: number;
}

export const getMyTasks = async (
    ownerId: string,
    filters: TaskFilters
) => {
    const {
        status,
        page = 1,
        limit = 10,
    } = filters;

    const query: Record<string, unknown> = {
        owner: ownerId,
    };

    if (status) {
        query.status = status;
    }

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
        Task.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        Task.countDocuments(query),
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

export const getTaskById = async (
    taskId: string,
    ownerId: string
) => {
    const task = await Task.findOne({
        _id: taskId,
        owner: ownerId,
    });

    if (!task) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Task not found"
        );
    }

    return task;
};

export const updateTask = async (
    taskId: string,
    ownerId: string,
    data: UpdateTaskInput
) => {
    const task = await Task.findOneAndUpdate(
        {
            _id: taskId,
            owner: ownerId,
        },
        data,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!task) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Task not found"
        );
    }

    return task;
};

export const deleteTask = async (
    taskId: string,
    ownerId: string
) => {
    const task = await Task.findOneAndDelete({
        _id: taskId,
        owner: ownerId,
    });

    if (!task) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Task not found"
        );
    }
};