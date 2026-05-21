import db from'../config/db.js';

const getAllTasks = async (req, res) => {
    try{
      const allTasks = await db.query('SELECT * FROM tasks');
      res.status(200).json({ tasks: allTasks.rows });
    } catch (err) {
      console.error('Database Error:', err.message);
    
      res.status(500).json({ 
        success: false, 
        error: 'Database query failed' 
      });
    }
}

const createTask = async (req, res) => {
    const { title, status, description, due_datetime } = req.body;
    if (!title || !status || status != "PENDING" || !due_datetime) return res.status(400).json({error: "Invalid data. All fields are required and cannot be empty. Status 'PENDING' is required"});
    
    try{
        await db.query('INSERT INTO tasks (title, status, description, due_datetime) Values($1, $2, $3, $4)', [title, status, description, due_datetime]);
        res.status(201).json({message: "Task Created"});
    } catch (err) {
        console.error('Database Error:', err.message);
      
        res.status(500).json({ 
          success: false, 
          error: 'Database query failed' 
        });
    }

}

const getTask = async(req, res) => {
    const { id } = req.params;
    
    try{
        const taskWithId = await db.query('SELECT * FROM tasks WHERE id=$1', [id]);
        if(taskWithId.rowCount === 0) return res.status(404).json({ error: "Task not found" });
        res.status(200).json({ task: taskWithId.rows });
    } catch (err) {
        console.error('Database Error:', err.message);
      
        res.status(500).json({ 
          success: false, 
          error: 'Database query failed' 
        });
    }
}

const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body
    if (! status || !['PENDING', 'IN PROGRESS', 'COMPLETED'].includes(status)) {
      return res.status(400).json({error: 'Invalid value for status. Allowed options are: PENDING, IN PROGRESS, COMPLETED'});
    }

    try{
        const updateTask = await db.query('UPDATE tasks SET status=$1 WHERE id=$2', [status, id]);
        if(updateTask.rowCount === 0) return res.status(404).json({ error: "Task not found" });
        res.status(200).json({message: "Status Updated"});
    } catch (err) {
        console.error('Database Error:', err.message);
      
        res.status(500).json({ 
          success: false, 
          error: 'Database query failed' 
        });
    }
}

const deleteTask = async (req,res) => {
    const { id } = req.params;

    try{
        let delTask = await db.query('DELETE FROM tasks WHERE id=$1', [id]);
        if(delTask.rowCount === 0) return res.status(404).json({ error: "Task not found" });
        res.status(200).json({message: "Task Deleted"});
    } catch (err) {
        console.error('Database Error:', err.message);
      
        res.status(500).json({ 
          success: false, 
          error: 'Database query failed' 
        });
    }
}

export default  { getAllTasks, createTask, getTask, updateStatus, deleteTask };



