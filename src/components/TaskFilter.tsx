
import React from 'react';
import { Button } from '@/components/ui/button';
import { TaskFilter as FilterType } from '../types/task';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    completed: number;
    pending: number;
  };
}

const TaskFilter = ({ currentFilter, onFilterChange, taskCounts }: TaskFilterProps) => {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map(({ key, label, count }) => (
        <Button
          key={key}
          variant={currentFilter === key ? 'default' : 'outline'}
          onClick={() => onFilterChange(key)}
          className={`${
            currentFilter === key 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'hover:bg-blue-50 hover:border-blue-200'
          }`}
        >
          {label}
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
            currentFilter === key 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {count}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default TaskFilter;
