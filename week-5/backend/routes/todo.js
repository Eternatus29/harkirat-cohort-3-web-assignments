//  start writing your code from here
import express from 'express';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controllers/todoController.js';
import authMiddleware from '../middleware/user.js';

const routes = express.Router();

routes.post("/create", authMiddleware, createTodo);
routes.delete("/delete", authMiddleware, deleteTodo);
routes.patch("/update", authMiddleware, updateTodo);
routes.get("/gettodos", authMiddleware, getTodos);

export default routes;