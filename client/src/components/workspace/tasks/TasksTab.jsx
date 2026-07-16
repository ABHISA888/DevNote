import { useState } from 'react';
import TaskHeader from './TaskHeader';
import TaskStatistics from './TaskStatistics';
import TaskTable from '../../tasks/TaskTable';
import CreateTaskModal from '../../tasks/CreateTaskModal';
import { BOARD_TASKS, TASK_STATS } from '../../../mock/tasks';

export default function TasksTab({ project }) {
  const [tasks, setTasks] = useState(BOARD_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((t) => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.labels && t.labels.some(l => l.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header Area with integrated controls */}
      <TaskHeader 
        projectName={project?.name || 'DevNote'}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewTask={() => setIsModalOpen(true)}
      />

      {/* Statistics Row */}
      <TaskStatistics stats={TASK_STATS} />
      
      {/* List View Rendering */}
      <TaskTable tasks={filteredTasks} />

      {/* Create Task Modal */}
      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
