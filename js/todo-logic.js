
// Add a new task
export function addTask(tasks, title) {
    const newTask = {
        id: Date.now(),
        title: title.trim(),
        completed: false
    };

    return [...tasks, newTask];
}

// Delete a task
export function deleteTask(tasks, id) {
    return tasks.filter(task => task.id !== id);
}

// Toggle task completion
export function toggleTask(tasks, id) {
    return tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );
}

// Filter tasks
export function filterTasks(tasks, filter) {
    if (filter === "active") {
        return tasks.filter(task => !task.completed);
    }

    if (filter === "completed") {
        return tasks.filter(task => task.completed);
    }

    return tasks;
}
