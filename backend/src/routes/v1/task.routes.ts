import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../../controllers/task.controller";

import { protect } from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate.middleware";

import {
  createTaskSchema,
  updateTaskSchema,
} from "../../validators/task.schema";

const router = Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: APIs for managing user tasks.
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task for the authenticated user.
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete Assignment
 *               description:
 *                 type: string
 *                 example: Finish Backend Intern Assignment
 *               status:
 *                 type: string
 *                 enum:
 *                   - todo
 *                   - in_progress
 *                   - done
 *                 example: todo
 *     responses:
 *       201:
 *         description: Task created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized.
 */
router.post(
  "/",
  validate(createTaskSchema),
  create
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks of current user
 *     description: Returns paginated tasks of the authenticated user.
 *     tags: [Tasks]
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
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - todo
 *             - in_progress
 *             - done
 *         description: Filter tasks by status.
 *     responses:
 *       200:
 *         description: Tasks fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized.
 */
router.get("/", getAll);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     description: Returns a single task belonging to the authenticated user.
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID.
 *     responses:
 *       200:
 *         description: Task fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Task not found.
 *       401:
 *         description: Unauthorized.
 */
router.get("/:id", getOne);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update a task
 *     description: Updates an existing task owned by the authenticated user.
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Task
 *               description:
 *                 type: string
 *                 example: Updated description
 *               status:
 *                 type: string
 *                 enum:
 *                   - todo
 *                   - in_progress
 *                   - done
 *                 example: done
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Task not found.
 *       401:
 *         description: Unauthorized.
 */
router.patch(
  "/:id",
  validate(updateTaskSchema),
  update
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task owned by the authenticated user.
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID.
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Task not found.
 *       401:
 *         description: Unauthorized.
 */
router.delete("/:id", remove);

export default router;