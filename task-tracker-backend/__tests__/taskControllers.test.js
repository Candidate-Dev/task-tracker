import { describe, it, expect, vi, test } from 'vitest';
import taskControllers from '../controllers/taskControllers';
const { getAllTasks, getTask, createTask } = taskControllers;
import db from '../config/db.js';

vi.mock('../config/db.js', () => {
    return {
        default: {
            query: vi.fn()
        }
    }
});

const mockRows = [
              { id: 1, title: 'Task 1', done: false },
              { id: 2, title: 'Task 2', done: true }
];


describe('CRUD operations on tasks', () => {
    describe('get all tasks test', () => {
        test('returns all the tasks form the database and tatus 200',async () => {
            const req = {};
            const res = {};

            res.status = vi.fn().mockImplementation((code) => {
              res.statusCode = code; 
              return res;
            });

            res.json = vi.fn().mockImplementation((data) => {
              res.body = data; 
              return res;
            });
            res.send = vi.fn();
        
            db.query.mockResolvedValueOnce({ rows: mockRows });
            await getAllTasks(req, res);
            expect(db.query).toHaveBeenCalledWith('SELECT * FROM tasks'); 
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ tasks: mockRows });
        })
    })

    describe('get task with id', () => {
        test('returns task with selected id and status 200', async () => {
            let req = {};
            let res = {};
            
            req = {
                params: { id: 1 }
            }

            res.status = vi.fn().mockImplementation((code) => {
              res.statusCode = code; 
              return res;
            });

            res.json = vi.fn().mockImplementation((data) => {
              res.body = data; 
              return res;
            });
            res.send = vi.fn();
            db.query.mockResolvedValueOnce({ rows: mockRows[0] });
            await getTask(req, res);

            expect(db.query).toHaveBeenCalledWith('SELECT * FROM tasks WHERE id=$1', [1]);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ task: mockRows[0] });


        })
    })

    describe('create a task', () => {
        test('createa a task and returns status 201', async () => {
            let req = {};
            let res = {};
            
            req = {
                body: {
                    title: 'Task 1',
                    status: 'PENDING',
                    description: 'this is Task 1',
                    due_datetime: '2026-05-14T11:00:00.000Z'
                }
            }

            res.status = vi.fn().mockImplementation((code) => {
              res.statusCode = code; 
              return res;
            });

            res.json = vi.fn().mockImplementation((data) => {
              res.body = data; 
              return res;
            });
            res.send = vi.fn();
            db.query.mockResolvedValueOnce({});
            await createTask(req, res);
            expect(db.query).toHaveBeenCalledWith(
                'INSERT INTO tasks (title, status, description, due_datetime) Values($1, $2, $3, $4)', 
                ['Task 1', 'PENDING', 'this is Task 1', '2026-05-14T11:00:00.000Z']
            );
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Task Created' });


        })

        test('returns status 400 if any field is empty except description', async () => {
            let req = {};
            let res = {};
            
            req = {
                body: {
                    status: 'PENDING',
                    description: 'this is Task 1',
                    due_datetime: '2026-05-14T11:00:00.000Z'
                }
            }

            res.status = vi.fn().mockImplementation((code) => {
              res.statusCode = code; 
              return res;
            });

            res.json = vi.fn().mockImplementation((data) => {
              res.body = data; 
              return res;
            });
            res.send = vi.fn();
            
            await createTask(req, res);

            expect(db.query).not.toHaveBeenCalledWith();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Invalid data. All fields are required and cannot be empty' 
            })
        })

        test('return status 500 on database error', async () => {
            let req = {};
            let res = {};
            
            req = {
                body: {
                    title: 'Task 1',
                    status: 'PENDING',
                    description: 'this is Task 1',
                    due_datetime: '2026-05-14T11:00:00.000Z'
                }
            }

            res.status = vi.fn().mockImplementation((code) => {
              res.statusCode = code; 
              return res;
            });

            res.json = vi.fn().mockImplementation((data) => {
              res.body = data; 
              return res;
            });
            res.send = vi.fn();
            db.query.mockRejectedValueOnce(new Error('syntax error at or near "INSER"'));
            await createTask(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                error: 'Database query failed' 
            })
        })
    })
    
})