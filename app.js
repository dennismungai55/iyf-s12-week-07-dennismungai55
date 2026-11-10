

// ======================================
// INTERACTIVE TO-DO LIST
// ======================================

// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// State
let todos = [];
let currentFilter = "all";

// Generate unique IDs
function generateId() {
    return Date.now() + Math.random();
}

// Create a task element
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";

    if (todo.completed) {
        li.classList.add("completed");
    }

    li.dataset.id = todo.id;

    // Task text
    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;
    span.title = "Double-click to edit";

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.action = "delete";
    deleteButton.setAttribute("aria-label", "Delete " + todo.text);

    li.appendChild(span);
    li.appendChild(deleteButton);

    return li;
}

// Display tasks according to selected filter
function renderTodos() {
    todoList.innerHTML = "";

    let filteredTodos = todos;

    if (currentFilter === "active") {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });

    updateStats();
}

// Add a new task
function addTodo(text) {
    const trimmedText = text.trim();

    if (trimmedText === "") {
        return;
    }

    const newTodo = {
        id: generateId(),
        text: trimmedText,
        completed: false
    };

    todos.push(newTodo);
    renderTodos();
}

// Toggle completed status
function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

// Delete a task
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Update remaining task count
function updateStats() {
    const remaining = todos.filter(todo => !todo.completed).length;

    itemsLeft.textContent =
        remaining === 1 ? "1 item left" : `${remaining} items left`;
}

// Change task filter
function filterTodos(filter) {
    currentFilter = filter;

    filters.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.filter === filter
        );
    });

    renderTodos();
}

// Edit a task
function editTodo(todo, span) {
    const inputField = document.createElement("input");

    inputField.type = "text";
    inputField.className = "edit-input";
    inputField.value = todo.text;

    span.replaceWith(inputField);
    inputField.focus();
    inputField.select();

    function saveEdit() {
        const newText = inputField.value.trim();

        if (newText !== "") {
            todo.text = newText;
        }

        renderTodos();
    }

    function cancelEdit() {
        renderTodos();
    }

    inputField.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            saveEdit();
        }

        if (event.key === "Escape") {
            cancelEdit();
        }
    });

    inputField.addEventListener("blur", saveEdit, { once: true });
}

// ======================================
// EVENT LISTENERS
// ======================================

// Add task when form is submitted
form.addEventListener("submit", function(event) {
    event.preventDefault();

    addTodo(input.value);

    input.value = "";
    input.focus();
});

// Event delegation for task clicks and editing
todoList.addEventListener("click", function(event) {
    const listItem = event.target.closest(".todo-item");

    if (!listItem) return;

    const id = Number(listItem.dataset.id);

    // Delete task
    if (event.target.closest('[data-action="delete"]')) {
        deleteTodo(id);
        return;
    }

    // Toggle completed state
    toggleTodo(id);
});

// Double-click task text to edit
todoList.addEventListener("dblclick", function(event) {
    const span = event.target.closest(".todo-text");

    if (!span) return;

    const listItem = span.closest(".todo-item");
    const id = Number(listItem.dataset.id);

    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        editTodo(todo, span);
    }
});

// Filter buttons
filters.forEach(button => {
    button.addEventListener("click", function() {
        filterTodos(button.dataset.filter);
    });
});

// Remove all completed tasks
clearCompletedBtn.addEventListener("click", function() {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
});

// ======================================
// INITIALIZE APPLICATION
// ======================================

renderTodos();

console.log("To-Do List application is running!");
