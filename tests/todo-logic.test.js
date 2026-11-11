import { describe, it, expect } from 'vitest';

import {
    addTask,
    deleteTask,
    toggleTask,
    filterTasks,
} from '../js/todo-logic.js';

describe('To-Do List Functions', () => {
    // Test 1: Add a task
    it('adds a new task', () => {
        const tasks = [];

        const result = addTask(tasks, 'Learn JavaScript');

        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('Learn JavaScript');
        expect(result[0].completed).toBe(false);
    });

    // Test 2: Delete a task
    it('deletes a task', () => {
        const tasks = [
            { id: 1, title: 'Study', completed: false },
            { id: 2, title: 'Practice', completed: false },
        ];

        const result = deleteTask(tasks, 1);

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(2);
    });

    // Test 3: Toggle task completion
    it('changes a task from incomplete to complete', () => {
        const tasks = [{ id: 1, title: 'Study', completed: false }];

        const result = toggleTask(tasks, 1);

        expect(result[0].completed).toBe(true);
    });

    // Test 4: Filter completed tasks
    it('shows only completed tasks', () => {
        const tasks = [
            { id: 1, title: 'Study', completed: true },
            { id: 2, title: 'Practice', completed: false },
        ];

        const result = filterTasks(tasks, 'completed');

        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('Study');
    });

    // Test 5: Filter empty task list (edge case)
    it('handles an empty task list', () => {
        const result = filterTasks([], 'all');

        expect(result).toEqual([]);
    });

    // Test 6: Ignore a task ID that does not exist
    it('keeps tasks when deleting a missing ID', () => {
        const tasks = [{ id: 1, title: 'Study', completed: false }];

        const result = deleteTask(tasks, 99);

        expect(result).toHaveLength(1);
    });
});
