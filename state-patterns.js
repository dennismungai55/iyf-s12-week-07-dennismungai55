
// =====================================
// EXERCISE 1: CENTRALIZED STATE
// =====================================

const appState = {
    todos: [],
    filter: "all",
    theme: "light"
};

// Save state to localStorage
function saveState() {
    localStorage.setItem("appState", JSON.stringify(appState));
}

// Load saved state
function loadState() {
    try {
        const saved = localStorage.getItem("appState");

        if (saved) {
            const parsed = JSON.parse(saved);

            if (
                Array.isArray(parsed.todos) &&
                ["all", "active", "completed"].includes(parsed.filter) &&
                ["light", "dark"].includes(parsed.theme)
            ) {
                Object.assign(appState, parsed);
            }
        }
    } catch (error) {
        console.error("Could not load state:", error);
    }
}

// Display current state
function render() {
    console.log("Current application state:", appState);
}

// Update state
function setState(updates) {
    Object.assign(appState, updates);
    saveState();
    render();
}

// Change filter
function setFilter(filter) {
    setState({ filter });
}

// Add a task
function addTodo(text) {
    setState({
        todos: [
            ...appState.todos,
            {
                id: Date.now(),
                text: text,
                completed: false
            }
        ]
    });
}

// Toggle task completion
function toggleTodo(id) {
    setState({
        todos: appState.todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        )
    });
}

// Load saved data when the page opens
loadState();
render();


// =====================================
// EXERCISE 2: OBSERVER PATTERN
// =====================================

function createStore(initialState) {
    let state = initialState;
    const listeners = [];

    return {
        getState: () => state,

        setState: (updates) => {
            state = { ...state, ...updates };

            // Notify all subscribers
            listeners.forEach(listener => listener(state));
        },

        subscribe: (listener) => {
            listeners.push(listener);

            // Return unsubscribe function
            return () => {
                const index = listeners.indexOf(listener);

                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            };
        }
    };
}

// Create a store
const store = createStore({ count: 0 });

// Subscribe to state changes
const unsubscribe = store.subscribe(state => {
    console.log("State changed:", state);
});

// Update the count
store.setState({ count: 1 });
store.setState({ count: 2 });

// Stop listening
unsubscribe();

store.setState({ count: 3 });

console.log("Final observer state:", store.getState());
