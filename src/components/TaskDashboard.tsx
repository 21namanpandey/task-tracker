
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import { getTasks, saveTasks, clearStoredUser } from '../utils/localStorage';
import { Task, TaskFilter as FilterType, TaskPriority } from '../types/task';

interface TaskDashboardProps {
  user: string;
  onLogout: () => void;
}

const TaskDashboard = ({ user, onLogout }: TaskDashboardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const storedTasks = getTasks();
    setTasks(storedTasks);
  }, []);

  const handleLogout = () => {
    clearStoredUser();
    onLogout();
  };

  const addTask = (taskData: { 
    title: string; 
    description: string; 
    dueDate?: string; 
    priority: TaskPriority;
    category?: string;
  }) => {
    const newTask: Task = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: taskData.dueDate,
      priority: taskData.priority,
      category: taskData.category,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setShowTaskForm(false);
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditingTask(null);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const toggleTaskComplete = (id: number) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  };

  const filteredTasks = tasks.filter(task => {
    // Filter by completion status
    const statusMatch = filter === 'all' || 
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);

    // Filter by search query
    const searchMatch = !searchQuery || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return statusMatch && searchMatch;
  });

  // Sort tasks by priority (high first) and due date
  const sortedTasks = filteredTasks.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    
    if (priorityDiff !== 0) return priorityDiff;
    
    // If same priority, sort by due date (earliest first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    
    return 0;
  });

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Welcome back, {user}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-300">
              Let's get things done today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-800 transition-all duration-200 hover:scale-105"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>

        {/* Task Filter */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <TaskFilter 
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />
        </div>

        {/* Add Task Button */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button 
            onClick={() => setShowTaskForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <span className="text-lg mr-2">+</span>
            Add New Task
          </Button>
        </div>

        {/* Task Form Modal */}
        {(showTaskForm || editingTask) && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? 
              (data) => updateTask(editingTask.id, data) : 
              addTask
            }
            onCancel={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
          />
        )}

        {/* Task List */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <TaskList 
            tasks={sortedTasks}
            onToggleComplete={toggleTaskComplete}
            onEdit={setEditingTask}
            onDelete={deleteTask}
          />
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="text-gray-400 dark:text-gray-500 text-lg transition-colors duration-300">
              {searchQuery ? `No tasks found matching "${searchQuery}"` :
               filter === 'all' ? 'No tasks yet. Add one to get started!' :
               filter === 'completed' ? 'No completed tasks yet.' :
               'No pending tasks. Great job!'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
