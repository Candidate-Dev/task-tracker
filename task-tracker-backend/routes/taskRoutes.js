import express from 'express';
const router = express.Router();
import db from '../config/db.js';
import taskControllers from '../controllers/taskControllers.js';
const { getAllTasks, createTask, getTask, updateStatus, deleteTask } = taskControllers;


router
  .route('/task')
  .get(getAllTasks)
  .post(createTask)

router
  .route('/task/:id')
  .get(getTask)
  .patch(updateStatus)
  .delete(deleteTask)



export default router