
import { Task } from '../types/task';

const USER_KEY = 'task-tracker-user';
const TASKS_KEY = 'task-tracker-tasks';

// User management
export const setStoredUser = (username: string): void => {
  localStorage.setItem(USER_KEY, username);
};

export const getStoredUser = (): string | null => {
  return localStorage.getItem(USER_KEY);
};

export const clearStoredUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

// Task management
export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getTasks = (): Task[] => {
  const tasksJson = localStorage.getItem(TASKS_KEY);
  if (!tasksJson) return [];
  
  try {
    const tasks = JSON.parse(tasksJson);
    // Migrate old tasks to new structure if needed
    return tasks.map((task: any) => ({
      ...task,
      priority: task.priority || 'medium',
      dueDate: task.dueDate || undefined,
      category: task.category || undefined,
    }));
  } catch (error) {
    console.error('Error parsing tasks from localStorage:', error);
    return [];
  }
};

export const clearTasks = (): void => {
  localStorage.removeItem(TASKS_KEY);
};

// Initialize with sample data for demo purposes
export const initializeSampleTasks = (): void => {
  const existingTasks = getTasks();
  if (existingTasks.length === 0) {
    const sampleTasks: Task[] = [
      {
        id: 1,
        title: "Complete React assignment",
        description: "Build a task tracker application with all required features",
        completed: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        priority: 'high',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Work',
      },
      {
        id: 2,
        title: "Review JavaScript concepts",
        description: "Go through ES6+ features and modern React patterns",
        completed: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'medium',
        category: 'Learning',
      },
    ];
    saveTasks(sampleTasks);
  }
};
