// start writing from here
import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/user.js';
import todoRoutes from './routes/todo.js';
import connectDB from './db/index.js';
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
})