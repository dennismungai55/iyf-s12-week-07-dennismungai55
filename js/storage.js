
// Storage key
const STORAGE_KEY = "week7-todos";

// Save tasks
export function saveTasks(tasks) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Could not save tasks:", error);
    }
}

// Load tasks safely
export function loadTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);

        if (!savedTasks) {
            return [];
        }

        const parsedTasks = JSON.parse(savedTasks);

        if (!Array.isArray(parsedTasks)) {
            return [];
        }

        return parsedTasks.filter(task =>
            task &&
            typeof task.id === "number" &&
            typeof task.title === "string" &&
            typeof task.completed === "boolean"
        );
    } catch (error) {
        console.error("Could not load tasks:", error);
        return [];
    }
}

// Clear saved tasks
export function clearTasks() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("Could not clear tasks:", error);
    }
}

const FILTER_KEY = "week7-todo-filter";

// Save selected filter
export function saveFilter(filter) {
    try {
        localStorage.setItem(FILTER_KEY, filter);
    } catch (error) {
        console.error("Could not save filter:", error);
    }
}

// Load selected filter
export function loadFilter() {
    try {
        const filter = localStorage.getItem(FILTER_KEY);

        if (["all", "active", "completed"].includes(filter)) {
            return filter;
        }

        return "all";
    } catch (error) {
        console.error("Could not load filter:", error);
        return "all";
    }
}
