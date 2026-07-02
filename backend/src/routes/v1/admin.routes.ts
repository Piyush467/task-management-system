import { Router } from "express";

import {
  getTasks,
  deleteTask,
} from "../../controllers/admin.controller";

import { protect } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize.middleware";

import { UserRole } from "../../types/user.types";

const router = Router();

router.use(protect);
router.use(authorize(UserRole.ADMIN));

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Administrator APIs for managing all users' tasks.
 */

/**
 * @swagger
 * /admin/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Returns a paginated list of tasks created by all users. Accessible only to administrators.
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tasks per page.
 *     responses:
 *       200:
 *         description: All tasks fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Access denied. Admin only.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/tasks", getTasks);

/**
 * @swagger
 * /admin/tasks/{id}:
 *   delete:
 *     summary: Delete any task
 *     description: Allows an administrator to delete any user's task.
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Access denied. Admin only.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/tasks/:id", deleteTask);

export default router;