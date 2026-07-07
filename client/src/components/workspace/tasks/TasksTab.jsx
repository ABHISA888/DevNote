import { useState } from 'react';
import TaskHeader from './TaskHeader';
import TaskStats from './TaskStats';
import TaskFilters from './TaskFilters';
import KanbanBoard from './KanbanBoard';
import { BOARD_TASKS, TASK_STATS } from '../../../mock/tasks';

/**
 * 🎓 TEACHING MOMENT: TasksTab.jsx
 * 
 * WHY THIS EXISTS:
 * This is the parent controller for the entire Tasks module inside the Project Workspace.
 * It holds the shared state (`tasks`, `searchQuery`, `activeView`) and passes data down to the board
 * components. When the backend is ready, this file will simply replace `BOARD_TASKS` with a `useQuery` hook.
 */
export default function TasksTab() {
  const [tasks, setTasks] = useState(BOARD_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('board');

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((t) => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.labels && t.labels.some(l => l.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Module Header Area */}
      <TaskHeader />
      <TaskStats stats={TASK_STATS} />
      
      {/* Interactive Filters */}
      <TaskFilters 
        activeView={activeView} 
        onViewChange={setActiveView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {/* Board vs List View Rendering */}
      {activeView === 'board' ? (
        <KanbanBoard tasks={filteredTasks} />
      ) : (
        <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-slate-50 text-slate-500 text-sm font-bold uppercase tracking-widest">
          List View (Coming Soon)
        </div>
      )}
    </div>
  );
}
