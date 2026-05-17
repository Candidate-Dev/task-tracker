const express = require('express');
const router = express.Router();
const db = require('../config/db.js');


router
  .route('/task')
  .get(async (req, res) => {
    try{
      const allTasks = await db.query('SELECT * FROM tasks');
      res.send(allTasks.rows);
    } catch (err) {
      console.error('Database Error:', err.message);
    
      res.status(500).json({ 
        success: false, 
        error: 'Database query failed' 
      });
    }
  })
  .post(async (req, res) => {
    const { title, status, description, due_datetime } = req.body;
    if (!title || !status || status != "PENDING" || !due_datetime) return res.status(400).json({error: 'Invalid data. All fields are required and cannot be empty'});
    
    try{
        await db.query('INSERT INTO tasks (title, status, description, due_datetime) Values($1, $2, $3, $4)', [title, status, description, due_datetime]);
        res.status(200).json({message: "Task Created"});
    } catch (err) {
        console.error('Database Error:', err.message);
      
        res.status(500).json({ 
          success: false, 
          error: 'Database query failed' 
        });
    }

  })



router
  .route('/task/:id')
  .get(async(req, res) => {
    const { id } = req.params;
    
    try{
        const taskWithId = await db.query('SELECT * FROM tasks WHERE id=$1', [id]);
        res.send(taskWithId.rows);
    } catch (err) {
        console.error('Database Error:', err.message);
      
        res.status(500).json({ 
          success: false, 
          error: 'Database query failed' 
        });
    }
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body
    if (! status || !['PENDING', 'IN PROGRESS', 'COMPLETED'].includes(status)) {
      return res.status(400).json({error: 'Invalid value for status. Allowed options are: PENDING, IN PROGRESS, COMPLETED'});
    }

    try{
        await db.query('UPDATE tasks SET status=$1 WHERE id=$2', [status, id]);
        res.status(200).json({message: "Status Updated"});
    } catch (err) {
        console.error('Database Error:', err.message);
      
        res.status(500).json({ 
          success: false, 
          error: 'Database query failed' 
        });
    }
  })
  .delete(async (req,res) => {
    const { id } = req.params;

    try{
        await db.query('DELETE FROM tasks WHERE id=$1', [id]);
        res.status(200).json({message: "Task Deleted"});
    } catch (err) {
        console.error('Database Error:', err.message);
      
        res.status(500).json({ 
          success: false, 
          error: 'Database query failed' 
        });
    }
  })



module.exports = router