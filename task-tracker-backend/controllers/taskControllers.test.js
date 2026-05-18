import { describe, it, expect, vi, test } from 'vitest';
import taskControllers from './taskControllers';
const { getAllTasks } = taskControllers;
import db from '../config/db.js';

vi.mock('../config/db.js');

const req = {};
const res = {};
// describe('task', () => {
//     test('shold send a status code of 200 on success', () => {
//         expect(true).toBeTruthy()
//     })
// })
it('should pass',async () => {
    await getAllTasks(req, res);
})