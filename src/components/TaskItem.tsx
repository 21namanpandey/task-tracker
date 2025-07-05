
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Task } from '../types/task';
import { Edit, Trash2, Calendar, Clock } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(task.id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <Card className={`p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
      task.completed 
        ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
        : isOverdue
        ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
        : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
    }`}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="mt-1 transition-all duration-200"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`font-medium text-gray-900 dark:text-white transition-all duration-200 ${
              task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
            }`}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant="outline" className={`${getPriorityColor(task.priority)} transition-all duration-200`}>
                {task.priority}
              </Badge>
              
              {task.category && (
                <Badge variant="secondary" className="transition-all duration-200">
                  {task.category}
                </Badge>
              )}
            </div>
          </div>
          
          {task.description && (
            <p className={`text-sm text-gray-600 dark:text-gray-300 mt-1 transition-all duration-200 ${
              task.completed ? 'line-through' : ''
            }`}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Created: {formatDate(task.createdAt)}</span>
            </div>
            
            {task.dueDate && (
              <div className={`flex items-center gap-1 ${
                isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : ''
              }`}>
                <Calendar className="w-3 h-3" />
                <span>Due: {formatDate(task.dueDate)}</span>
                {isOverdue && <span className="text-red-600 dark:text-red-400">⚠️</span>}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 hover:scale-110"
          >
            <Edit className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className={`transition-all duration-200 hover:scale-110 ${
              showDeleteConfirm 
                ? 'text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30' 
                : 'text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            {showDeleteConfirm && (
              <span className="ml-1 text-xs animate-fade-in">Confirm</span>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;
