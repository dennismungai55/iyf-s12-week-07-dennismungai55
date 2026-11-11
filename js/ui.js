import { filterTasks } from './todo-logic.js';

const taskInput = document.getElementById('todo-input');
const taskList = document.getElementById('todo-list');
const taskForm = document.getElementById('todo-form');
const itemsLeft = document.getElementById('items-left');
const clearCompletedButton = document.getElementById('clear-completed');

const filterButtons = document.querySelectorAll('[data-filter]');

// Display tasks
export function renderTasks(tasks, filter) {
    taskList.innerHTML = '';

    const filteredTasks = filterTasks(tasks, filter);

    filteredTasks.forEach((task) => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.dataset.action = 'toggle';
        checkbox.dataset.id = task.id;

        const title = document.createElement('span');
        title.textContent = task.title;

        if (task.completed) {
            title.style.textDecoration = 'line-through';
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.type = 'button';
        deleteButton.dataset.action = 'delete';
        deleteButton.dataset.id = task.id;

        li.append(checkbox, title, deleteButton);
        taskList.appendChild(li);
    });

    const activeCount = tasks.filter((task) => !task.completed).length;

    itemsLeft.textContent = `${activeCount} items left`;

    filterButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.filter === filter);
    });
}

export { taskInput, taskForm, taskList, filterButtons, clearCompletedButton };
