function createTodo(req, res) {
    res.json({
        message: "Created TODO."
    });
}

function deleteTodo(req, res) {
    res.json({
        message: "Deleted TODO."
    });
}

function updateTodo(req, res) {
    res.json({
        message: "Updated TODO."
    });
}

function getTodos(req, res) {
    res.json({
        message: "Fetched all TODOs."
    });
}

export { createTodo, deleteTodo, updateTodo, getTodos };