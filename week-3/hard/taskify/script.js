let tasks = [
    {
        "title": "Wake Up",
        "description": "Get moving!!!",
        "timestamp": "12:25",
        "type": "pending"
    },
    {
        "title": "Breakfast",
        "description": "Make a healthy breakfast.",
        "timestamp": "13:00",
        "type": "in-progress"
    },
    {
        "title": "Morning Exercise",
        "description": "Do some stretching and yoga.",
        "timestamp": "14:00",
        "type": "under-review"
    },
    {
        "title": "Work on Project",
        "description": "Finish coding the new feature.",
        "timestamp": "15:30",
        "type": "pending"
    },
    {
        "title": "Review Emails",
        "description": "Go through all the unread emails.",
        "timestamp": "16:00",
        "type": "finished"
    }
];

function renderTasks() {
    document.getElementById("pending-tasks").innerText = "";
    document.getElementById("in-progress-tasks").innerText = "";
    document.getElementById("under-review-tasks").innerText = "";
    document.getElementById("finished-tasks").innerText = "";

    for (let task of tasks) {
        document.getElementById(`${task.type}-tasks`).appendChild(taskDisplay(task));
    }
}

function taskDisplay(task) {
    let taskCard = document.createElement("div");
    let taskTitle = document.createElement("h3");
    let taskDescription = document.createElement("p");
    let taskTime = document.createElement("p");
    taskTitle.innerText = task.title;
    taskDescription.innerText = task.description;
    taskTime.innerText = task.timestamp;
    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDescription);
    taskCard.appendChild(taskTime);

    return taskCard;
}

function taskForm(taskType) {
    document.getElementById("main-section").classList.toggle("blur-overlay");
    document.getElementById("new-task-form").classList.toggle("invisible");
    document.getElementById("task-type").value = taskType;
}

function createTask() {
    let task = {
        "title": document.getElementById("task-name").value,
        "description": document.getElementById("task-description").value,
        "timestamp": document.getElementById("task-time").value,
        "type": document.getElementById("task-type").value
    }
    tasks.push(task);
    renderTasks();
}

renderTasks();