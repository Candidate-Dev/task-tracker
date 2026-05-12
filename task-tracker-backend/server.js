const express = require('express');
const app = express();
const db = require('./config/db.js');

const port = process.env.PORT | 3000;

app.get('/', async (req, res) => {
  try{
      const allCabins = await db.query('select * from tasks');
      res.send(allCabins.rows);
    } catch (err) {
      console.error('Database Error:', err.message);
    
      res.status(500).json({ 
        success: false, 
        error: 'Database query failed' 
      });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
