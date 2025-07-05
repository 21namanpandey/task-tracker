
# Personal Task Tracker

## Description
A modern, feature-rich personal task management application built with React. This app helps users organize their daily tasks with advanced features like priority levels, due dates, categories, and a beautiful dark mode interface. Perfect for staying productive and keeping track of your to-do items.

## Features
- **Simple Authentication**: Username-based login with localStorage persistence
- **Complete Task Management**: Add, edit, delete, and mark tasks as complete
- **Advanced Task Properties**:
  - Task priorities (Low, Medium, High) with visual indicators
  - Due dates with date and time selection
  - Task categories/tags for better organization
  - Rich descriptions for detailed task information
- **Smart Filtering & Search**:
  - Filter by status: All, Pending, Completed
  - Real-time search across task titles, descriptions, and categories
  - Task count indicators for each filter
- **Enhanced User Experience**:
  - Dark mode toggle with system preference detection
  - Smooth animations and transitions
  - Responsive design for mobile and desktop
  - Overdue task warnings with visual indicators
  - Confirmation dialogs for destructive actions
- **Data Persistence**: All tasks saved to localStorage for offline access

## Setup Instructions
1. Clone the repository
   ```bash
   git clone https://github.com/21namanpandey/task-tracker
   cd task-tracker
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```
4. Open [http://localhost:8080](http://localhost:8080) in your browser

## Technologies Used
- **React.js** - Frontend framework with functional components and hooks
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Shadcn/UI** - Modern, accessible component library
- **Lucide React** - Beautiful icon library
- **date-fns** - Date utility library for formatting
- **Next Themes** - Theme management for dark mode
- **React Day Picker** - Advanced date selection component

## Live Demo
[https://tasktrackernew.vercel.app/](https://tasktrackernew.vercel.app/)

## Screenshots


## Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # Shadcn/UI components
│   ├── Login.tsx       # Login form component
│   ├── TaskDashboard.tsx # Main dashboard component
│   ├── TaskForm.tsx    # Add/edit task modal
│   ├── TaskList.tsx    # Task list container
│   ├── TaskItem.tsx    # Individual task component
│   ├── TaskFilter.tsx  # Filter buttons
│   ├── SearchBar.tsx   # Search input component
│   └── ThemeToggle.tsx # Dark mode toggle
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Theme management
├── types/              # TypeScript type definitions
│   └── task.ts         # Task and filter types
├── utils/              # Utility functions
│   └── localStorage.ts # Local storage helpers
└── pages/              # Page components
    └── Index.tsx       # Main app entry point
```

## Key Features Implementation
- **Smart Task Sorting**: Tasks are automatically sorted by priority (High → Medium → Low) and then by due date
- **Responsive Design**: Fully responsive layout that works seamlessly on all device sizes
- **Accessibility**: Built with accessible components and proper ARIA labels
- **Performance**: Optimized rendering with proper React patterns and efficient state management
- **User Experience**: Intuitive interface with helpful visual cues and smooth interactions

## Development Notes
- Built following React best practices with functional components and hooks
- Uses localStorage for data persistence (no backend required)
- Implements proper TypeScript typing throughout the application
- Follows component-based architecture for maintainability
- Includes comprehensive error handling and validation
