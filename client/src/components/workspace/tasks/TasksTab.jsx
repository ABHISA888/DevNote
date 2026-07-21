import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import TaskHeader from './TaskHeader';
import TaskStatistics from './TaskStatistics';
import TaskTable from '../../tasks/TaskTable';
import CreateTaskModal from '../../tasks/CreateTaskModal';
import { taskService } from '../../../services/api/taskService';

/**
 * 🎓 TEACHING MOMENT: TasksTab.jsx
 * Unified, database-driven container for Task Management in DevNote.
 */
export default function TasksTab({ project }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Fetch tasks from MongoDB backend
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      let data = [];
      if (project?._id || project?.id) {
        const res = await taskService.getProjectTasks(project._id || project.id);
        data = res.data || res.tasks || [];
      } else {
        const res = await taskService.getTasks();
        data = res.data || res.tasks || [];
      }
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks from backend:', err);
      toast.error('Failed to load tasks from server.');
    } finally {
      setLoading(false);
    }
  }, [project]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle Delete Task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskService.deleteTask(taskId);
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
      toast.error(err.response?.data?.message || 'Failed to delete task');
    }
  };

  // Handle Edit Task (opens modal)
  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  // Handle Create Task (opens modal)
  const handleNewTask = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  // Handle Inline Progress Update
  const handleUpdateProgress = async (taskId, newProgress) => {
    try {
      const updateData = { progress: newProgress };
      if (newProgress === 100) {
        updateData.status = 'Completed';
      }
      await taskService.updateTask(taskId, updateData);
      toast.success('Progress updated');
      fetchTasks();
    } catch (err) {
      console.error('Failed to update progress:', err);
      toast.error('Failed to update progress');
    }
  };

  // STEP 8: Real-Time Dynamic Search Filtering
  const filteredTasks = tasks.filter((t) => {
    const q = searchQuery.toLowerCase();
    const titleMatch = (t.title || t.name || '').toLowerCase().includes(q);
    const descMatch = (t.description || '').toLowerCase().includes(q);
    const projMatch = (t.project?.name || t.projectName || '').toLowerCase().includes(q);
    const userMatch = (t.githubUsername || t.assignedTo?.name || '').toLowerCase().includes(q);
    return titleMatch || descMatch || projMatch || userMatch;
  });

  // STEP 7: Dynamic Global Statistics from MongoDB Data
  const total = tasks.length;
  const todo = tasks.filter((t) => (t.status || '').toLowerCase() === 'todo').length;
  const inProgress = tasks.filter((t) => (t.status || '').toLowerCase() === 'in progress').length;
  const review = tasks.filter((t) => (t.status || '').toLowerCase() === 'review' || (t.status || '').toLowerCase() === 'in review').length;
  const completed = tasks.filter((t) => (t.status || '').toLowerCase() === 'completed' || (t.status || '').toLowerCase() === 'done').length;

  const dynamicStats = [
    { id: 'total',       label: 'TOTAL TASKS', value: total,      valueColor: 'text-slate-800' },
    { id: 'todo',        label: 'TODO',        value: todo,       valueColor: 'text-amber-600' },
    { id: 'in_progress', label: 'IN PROGRESS', value: inProgress, valueColor: 'text-indigo-600' },
    { id: 'review',      label: 'REVIEW',      value: review,     valueColor: 'text-blue-600' },
    { id: 'completed',   label: 'COMPLETED',   value: completed,  valueColor: 'text-emerald-600' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header Area with integrated controls */}
      <TaskHeader 
        projectName={project?.name || 'DevNote Workspace'}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewTask={handleNewTask}
      />

      {/* Dynamic Statistics Row */}
      <TaskStatistics stats={dynamicStats} />
      
      {/* List View Rendering with real MongoDB task data */}
      <TaskTable
        tasks={filteredTasks}
        loading={loading}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onUpdateProgress={handleUpdateProgress}
      />

      {/* Create / Edit Task Modal */}
      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setTaskToEdit(null);
        }}
        taskToEdit={taskToEdit}
        onTaskSaved={fetchTasks}
      />
    </div>
  );
}
