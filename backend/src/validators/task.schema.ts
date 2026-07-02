import { z } from "zod";
import { TaskStatus } from "../types/task.types";

export const createTaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title cannot exceed 100 characters"),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters")
      .optional(),

    status: z
      .nativeEnum(TaskStatus)
      .optional(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3)
      .max(100)
      .optional(),

    description: z
      .string()
      .trim()
      .max(500)
      .optional(),

    status: z
      .nativeEnum(TaskStatus)
      .optional(),
  }),
});

export type CreateTaskInput =
  z.infer<typeof createTaskSchema>["body"];

export type UpdateTaskInput =
  z.infer<typeof updateTaskSchema>["body"];