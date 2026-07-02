import { Request, Response } from "express";

import catchAsync from "../utils/catchAsync";
import ApiResponse from "../utils/ApiResponse";
import { HTTP_STATUS } from "../utils/constants";

import {
    getAllTasks,
    deleteAnyTask,
} from "../services/admin.service";

export const getTasks = catchAsync(
    async (req: Request, res: Response) => {
        const result = await getAllTasks(
            Number(req.query.page) || 1,
            Number(req.query.limit) || 10
        );

        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                true,
                "All tasks fetched successfully",
                result
            )
        );
    }
);

export const deleteTask = catchAsync(
    async (req: Request, res: Response) => {
        const taskId = String(req.params.id);

        await deleteAnyTask(taskId);

        res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                true,
                "Task deleted successfully"
            )
        );
    }
);