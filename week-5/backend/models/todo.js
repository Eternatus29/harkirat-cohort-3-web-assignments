import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
});

const Todo = mongoose.model('User', todoSchema);

export default Todo;