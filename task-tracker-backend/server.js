// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
//const express = require('express');
import express from 'express';
const app = express();
// const db = require('./config/db.js');
import db  from './config/db.js';
// const taskRouter = require('./routes/taskRoutes');
import taskRouter from './routes/taskRoutes.js';
// const cors = require('cors');
import cors from 'cors';
const port = process.env.PORT | 3000;
app.use(express.json());

app.use(cors())

app.use('/', taskRouter);

app.listen(port, '0.0.0.0',() => {
  console.log(`Example app listening on port ${port}`)
});
