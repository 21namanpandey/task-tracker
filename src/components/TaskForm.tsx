
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Task, TaskPriority } from '../types/task';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (data: { 
    title: string; 
    description: string; 
    dueDate?: string; 
    priority: TaskPriority;
    category?: string;
  }) => void;
  onCancel: () => void;
}

const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date>();
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      if (task.dueDate) {
        const date = new Date(task.dueDate);
        setDueDate(date);
        setDueTime(format(date, 'HH:mm'));
      }
      setPriority(task.priority);
      setCategory(task.category || '');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    let finalDueDate: string | undefined;
    if (dueDate) {
      if (dueTime) {
        const [hours, minutes] = dueTime.split(':');
        const dateWithTime = new Date(dueDate);
        dateWithTime.setHours(parseInt(hours), parseInt(minutes));
        finalDueDate = dateWithTime.toISOString();
      } else {
        finalDueDate = dueDate.toISOString();
      }
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate: finalDueDate,
      priority,
      category: category.trim() || undefined,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate(undefined);
    setDueTime('');
    setPriority('medium');
    setCategory('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 animate-scale-in">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {task ? 'Edit Task' : 'Add New Task'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Title *
            </Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              placeholder="Enter task title"
              className="mt-1 transition-all duration-200"
              autoFocus
            />
            {error && (
              <p className="mt-1 text-sm text-red-600 animate-fade-in">{error}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              className="mt-1 transition-all duration-200"
              rows={3}
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date
            </Label>
            <div className="space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              {dueDate && (
                <Input
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  placeholder="Set time (optional)"
                  className="transition-all duration-200"
                />
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="priority" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority
            </Label>
            <Select value={priority} onValueChange={(value: TaskPriority) => setPriority(value)}>
              <SelectTrigger className="mt-1 transition-all duration-200">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Low Priority
                  </span>
                </SelectItem>
                <SelectItem value="medium">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    Medium Priority
                  </span>
                </SelectItem>
                <SelectItem value="high">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    High Priority
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </Label>
            <Input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category (optional)"
              className="mt-1 transition-all duration-200"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
            >
              {task ? 'Update Task' : 'Add Task'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1 transition-all duration-200 hover:scale-105"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TaskForm;
