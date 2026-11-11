import { state, setTasks, setFilter } from './state.js';

import { addTask, deleteTask, toggleTask } from './todo-logic.js';

import { saveTasks } from './storage.js';

import {
    taskInput,
    taskForm,
    taskList,
    filterButtons,
    clearCompletedButton,
    renderTasks,
} from './ui.js';

// Update the screen
function updateApp() {
    saveTasks(state.tasks);
    renderTasks(state.tasks, state.filter);
}

// Add a new task
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = taskInput.value.trim();

    if (title === '') {
        alert('Please enter a task!');
        return;
    }

    setTasks(addTask(state.tasks, title));

    taskInput.value = '';

    updateApp();
});

// Handle delete buttons
taskList.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('button[data-action="delete"]');

    if (!deleteButton) {
        return;
    }

    const id = Number(deleteButton.dataset.id);

    setTasks(deleteTask(state.tasks, id));

    updateApp();
});

// Handle task completion
taskList.addEventListener('change', (event) => {
    if (event.target.matches('input[data-action="toggle"]')) {
        const id = Number(event.target.dataset.id);

        setTasks(toggleTask(state.tasks, id));

        updateApp();
    }
});

// Handle filters
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setFilter(button.dataset.filter);

        renderTasks(state.tasks, state.filter);
    });
});

// Clear completed tasks
clearCompletedButton.addEventListener('click', () => {
    setTasks(state.tasks.filter((task) => !task.completed));

    updateApp();
});

// Show saved tasks when the page opens
renderTasks(state.tasks, state.filter);
