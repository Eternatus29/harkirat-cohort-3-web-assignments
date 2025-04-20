//  start writing from here
import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            dbName: 'todo_application'
        })
        console.log("Connected to database.");
    } catch (e) {
        console.error((e) => `Exception occured while connecting to DB: ${e}`);
    }
}

export default connectDB;