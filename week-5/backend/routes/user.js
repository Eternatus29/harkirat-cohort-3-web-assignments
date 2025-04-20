//  start writing your code from here
import express from 'express';
import { loginHandler, registerHandler, userDetails } from '../controllers/userController.js';
import authMiddleware from '../middleware/user.js';

const routes = express.Router();

routes.post("/login", loginHandler);
routes.post("/register", registerHandler);
routes.get("/details", authMiddleware, userDetails);

export default routes;