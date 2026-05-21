/**
 * @swagger
 * /task:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - /task
 *     responses:
 *       200:
 *         description: Returns a list of all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Review documents"
 *                       status:
 *                         type: string
 *                         example: "COMPLETED"
 *                       description:
 *                         type: string
 *                         example: "Check submitted documents for completeness"
 *                       due_datetime:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-05-10T06:00:00.000Z"
 *       500:
 *         description: Database error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Database query failed"
 * 
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - /task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - status
 *               - due_datetime
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Finish report"
 *               status:
 *                 type: string
 *                 enum: ["PENDING"]
 *                 example: "PENDING"
 *               description:
 *                 type: string
 *                 example: "Write the final report for Q2"
 *               due_datetime:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-22T12:00:00Z"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Task Created"
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid data. All fields are required and cannot be empty"
 *       500:
 *         description: Database error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Database query failed"
 */





/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags:
 *       - /task/:id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the task to retrieve
 *         example: 1
 *     responses:
 *       200:
 *         description: Returns the task with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Review documents"
 *                       status:
 *                         type: string
 *                         example: "COMPLETED"
 *                       description:
 *                         type: string
 *                         example: "Check submitted documents for completeness"
 *                       due_datetime:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-05-10T06:00:00.000Z"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Task not found"
 *       500:
 *         description: Database error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Database query failed"
 * 
 *   patch:
 *     summary: Update the status of a task
 *     tags:
 *       - /task/:id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the task to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["PENDING", "IN PROGRESS", "COMPLETED"]
 *                 example: "COMPLETED"
 *     responses:
 *       200:
 *         description: Status updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Status Updated"
 *       400:
 *         description: Invalid status value
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid value for status. Allowed options are: PENDING, IN PROGRESS, COMPLETED"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Task not found"
 *       500:
 *         description: Database error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Database query failed"
 * 
 *   delete:
 *     summary: Delete a task by ID
 *     tags:
 *       - /task/:id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the task to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Task Deleted"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Task not found"
 *       500:
 *         description: Database error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Database query failed" 
 */