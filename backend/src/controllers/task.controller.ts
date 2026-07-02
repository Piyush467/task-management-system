import { Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import ApiResponse from "../utils/ApiResponse";
import { HTTP_STATUS } from "../utils/constants";

import {
    createTask,
    deleteTask,
    getMyTasks,
    getTaskById,
    updateTask,
} from "../services/task.service";

export const create = catchAsync(async (req: Request, res: Response) => {
    const task = await createTask(
        req.body,
        req.user!._id.toString()
    );

    res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(true, "Task created successfully", task)
    );
});

export const getAll = catchAsync(async (req: Request, res: Response) => {
    const tasks = await getMyTasks(
        req.user!._id.toString(),
        {
            status: req.query.status as any,
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
        }
    );

    res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            true,
            "Tasks fetched successfully",
            tasks
        )
    );
});

export const getOne = catchAsync(async (req: Request, res: Response) => {
    const task = await getTaskById(
        req.params.id as string,
        req.user!._id.toString()
    );

    res.status(HTTP_STATUS.OK).json(
        new ApiResponse(true, "Task fetched successfully", task)
    );
});

export const update = catchAsync(async (req: Request, res: Response) => {
    const task = await updateTask(
        req.params.id as string,
        req.user!._id.toString(),
        req.body
    );

    res.status(HTTP_STATUS.OK).json(
        new ApiResponse(true, "Task updated successfully", task)
    );
});

export const remove = catchAsync(async (req: Request, res: Response) => {
    await deleteTask(
        req.params.id as string,
        req.user!._id.toString()
    );

    res.status(HTTP_STATUS.OK).json(
        new ApiResponse(true, "Task deleted successfully")
    );
});