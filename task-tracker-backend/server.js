import dotenv from 'dotenv';
dotenv.config();
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express'
import express from 'express';
const app = express();
import db  from './config/db.js';
import taskRouter from './routes/taskRoutes.js';
import cors from 'cors';

const port = process.env.PORT | 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {  
      title: 'Task Tracker API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./swagger-api-docs.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());

app.use(cors());

app.use('/', taskRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
