import Todo from "../models/todo.js";
import User from "../models/user.js";

async function createTodo(req, res) {
    const { name, description, completeBy } = req.body;
    const user = req.userId;
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
    if (!name || !description) {
        return res.status(400).json({ message: "Name and Description are required to create a TODO." });
    }

    const newTodo = new Todo({
        name,
        description,
        completeBy,
        user
    })

    try {
        const savedTodo = await newTodo.save();
        await User.findByIdAndUpdate(user, {
            $push: { todos: savedTodo._id }
        });
        res.json({
            message: "Created TODO."
        });
    } catch (e) {
        res.json({
            message: `Error creating TODO.: ${e}`
        })
    }
}

async function deleteTodo(req, res) {
    const id = req.body.id;

    try {
        const todoToDelete = await Todo.findByIdAndDelete(id);

        if (!todoToDelete) {
            return res.status(404).json({ message: "TODO not found." });
        }

        await User.findByIdAndUpdate(req.userId, {
            $pull: { todos: todoToDelete._id }
        });

        res.json({
            message: "Deleted TODO."
        });
    } catch (e) {
        res.status(500).json({
            message: `Error deleting TODO: ${e.message}`
        });
    }
}

async function updateTodo(req, res) {
    const { id, name, description, completeBy, todoType } = req.body;
    if (!id) {
        return res.status(400).json({
            message: "Specify which TODO to update."
        });
    }
    if (!name || !description || !completeBy || !todoType) {
        return res.status(400).json({
            message: "Enter new name, description, todoType and completeBy."
        });
    }

    try {
        await Todo.findByIdAndUpdate(id, { $set: { name, description, completeBy, todoType } });
        return res.json({
            message: "Updated TODO."
        });
    } catch (e) {
        return res.json({
            message: `Error occured while updating TODO: ${e}.`
        })
    }
}

async function getTodos(req, res) {
    try {
        const userTodos = await Todo.find({ user: req.userId });
        return res.json({
            userTodos
        });
    } catch (e) {
        res.status(500).json({ message: `Unable to retrieve TODOs. ${e}` });
    }
}

export { createTodo, deleteTodo, updateTodo, getTodos };