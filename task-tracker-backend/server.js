require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db.js');
const tasksRouter = require('./routes/tasks');
const port = process.env.PORT | 3000;
app.use(express.json());

app.use('/', tasksRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
