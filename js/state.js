import { loadTasks, loadFilter, saveFilter } from './storage.js';

// Application state
export const state = {
    tasks: loadTasks(),
    filter: loadFilter(),
};

// Update tasks
export function setTasks(newTasks) {
    state.tasks = newTasks;
}

// Update filter and save it
export function setFilter(newFilter) {
    if (['all', 'active', 'completed'].includes(newFilter)) {
        state.filter = newFilter;
        saveFilter(newFilter);
    }
}
