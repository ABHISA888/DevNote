import { useState, useEffect } from 'react';
import { X, Pencil, Calendar, Search, User, Check, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { projectService } from '../../services/api/projectService';
import { taskService } from '../../services/api/taskService';

/**
 * 🎓 TEACHING MOMENT: CreateTaskModal.jsx
 * Unified modal for creating and editing tasks with live GitHub User Search.
 */

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const STATUSES = ['Todo', 'In Progress', 'Review', 'Completed'];

export default function CreateTaskModal({ isOpen, onClose, onTaskSaved, taskToEdit = null }) {
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projects, setProjects] = useState([]);
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Todo');
  const [dueDate, setDueDate] = useState('');
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState('');

  // GitHub Assignee Search State
  const [githubSearchQuery, setGithubSearchQuery] = useState('');
  const [githubSearchResults, setGithubSearchResults] = useState([]);
  const [isSearchingGithub, setIsSearchingGithub] = useState(false);
  const [selectedGithubUser, setSelectedGithubUser] = useState(null);

  const [loading, setLoading] = useState(false);

  // Load Projects and Populate Form
  useEffect(() => {
    if (isOpen) {
      fetchProjects();
      if (taskToEdit) {
        setTitle(taskToEdit.title || taskToEdit.name || '');
        setProjectId(taskToEdit.project?._id || taskToEdit.project || '');
        setPriority(taskToEdit.priority || 'Medium');
        setStatus(taskToEdit.status || 'Todo');
        setDueDate(taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '');
        setProgress(typeof taskToEdit.progress === 'number' ? taskToEdit.progress : (taskToEdit.status === 'Completed' ? 100 : 0));
        setDescription(taskToEdit.description || '');

        if (taskToEdit.githubUsername) {
          setSelectedGithubUser({
            login: taskToEdit.githubUsername,
            avatar_url: taskToEdit.githubAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${taskToEdit.githubUsername}`,
            html_url: taskToEdit.githubProfile || `https://github.com/${taskToEdit.githubUsername}`,
          });
        } else {
          setSelectedGithubUser(null);
        }
      } else {
        // Reset form for creation
        setTitle('');
        setPriority('Medium');
        setStatus('Todo');
        setDueDate('');
        setProgress(0);
        setDescription('');
        setSelectedGithubUser(null);
        setGithubSearchQuery('');
      }
    }
  }, [isOpen, taskToEdit]);

  const fetchProjects = async () => {
    try {
      const res = await projectService.getProjects();
      const list = res.data || res.projects || [];
      setProjects(list);
      if (list.length > 0 && !projectId) {
        setProjectId(list[0]._id || list[0].id);
      }
    } catch (err) {
      console.error('Failed to load projects for dropdown:', err);
    }
  };

  // GitHub Search Debounce
  useEffect(() => {
    if (!githubSearchQuery.trim() || githubSearchQuery.trim().length < 2) {
      setGithubSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingGithub(true);
      try {
        let items = [];
        try {
          const res = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(githubSearchQuery.trim())}`);
          items = res.data?.items || [];
        } catch (apiErr) {
          // Fallback to server proxy
          const res = await axios.get(`/api/projects/github/search?q=${encodeURIComponent(githubSearchQuery.trim())}`);
          items = res.data?.items || [];
        }
        setGithubSearchResults(items.slice(0, 6));
      } catch (err) {
        console.error('Error searching GitHub users:', err);
      } finally {
        setIsSearchingGithub(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [githubSearchQuery]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please provide a task name.');
      return;
    }

    if (!projectId) {
      toast.error('Please select a project for this task.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: title.trim(),
        project: projectId,
        priority,
        status,
        dueDate: dueDate || null,
        progress: Number(progress) || 0,
        description: description.trim(),
        githubUsername: selectedGithubUser ? selectedGithubUser.login : '',
        githubAvatar: selectedGithubUser ? selectedGithubUser.avatar_url : '',
        githubProfile: selectedGithubUser ? selectedGithubUser.html_url : '',
      };

      if (taskToEdit?._id) {
        await taskService.updateTask(taskToEdit._id, payload);
        toast.success('Task updated successfully!');
      } else {
        await taskService.createTask(payload);
        toast.success('Task created successfully!');
      }

      if (onTaskSaved) onTaskSaved();
      onClose();
    } catch (err) {
      console.error('Error saving task:', err);
      toast.error(err.response?.data?.message || 'Failed to save task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={taskToEdit ? 'Edit Task' : 'Create New Task'}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl shadow-slate-900/20 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {taskToEdit ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="mt-0.5 text-xs font-medium text-primary-500">
              {taskToEdit ? 'Update task details and progress in MongoDB' : 'Add a new task to one of your projects'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="max-h-[72vh] overflow-y-auto px-6 py-5 space-y-4">
          
          {/* Task Name */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Task Name *</label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Design Login UI"
                required
                className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 pr-9 text-sm font-semibold text-slate-700 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
              <Pencil size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Project & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Project *</label>
              <div className="relative">
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  required
                  className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                >
                  {projects.length === 0 ? (
                    <option value="">No projects available</option>
                  ) : (
                    projects.map((p) => (
                      <option key={p._id || p.id} value={p._id || p.id}>
                        {p.name}
                      </option>
                    ))
                  )}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Due Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                />
                <Calendar size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Status</label>
              <select
                value={status}
                onChange={(e) => {
                  const s = e.target.value;
                  setStatus(s);
                  if (s === 'Completed') setProgress(100);
                }}
                className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Assigned To (GitHub Search Autocomplete) */}
          <div className="relative">
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Assigned To (GitHub Search)</label>
            
            {selectedGithubUser ? (
              <div className="flex items-center justify-between rounded-lg border border-indigo-200 bg-indigo-50/70 p-2">
                <div className="flex items-center gap-2">
                  <img
                    src={selectedGithubUser.avatar_url}
                    alt={selectedGithubUser.login}
                    className="h-7 w-7 rounded-full border border-white object-cover"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800">@{selectedGithubUser.login}</span>
                    {selectedGithubUser.html_url && (
                      <a
                        href={selectedGithubUser.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-[10px] text-primary-600 hover:underline inline-flex items-center gap-0.5"
                      >
                        GitHub Profile <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedGithubUser(null)}
                  className="rounded-full p-1 text-slate-400 hover:bg-white hover:text-slate-700"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  value={githubSearchQuery}
                  onChange={(e) => setGithubSearchQuery(e.target.value)}
                  placeholder="Type GitHub username (e.g. abhi)..."
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 pr-9 text-xs font-semibold text-slate-700 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100"
                />
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                
                {/* Search Results Dropdown */}
                {githubSearchQuery.trim().length >= 2 && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
                    {isSearchingGithub ? (
                      <div className="p-3 text-center text-xs font-semibold text-slate-400">Searching GitHub...</div>
                    ) : githubSearchResults.length === 0 ? (
                      <div className="p-3 text-center text-xs text-slate-400">No GitHub users found</div>
                    ) : (
                      githubSearchResults.map((user) => (
                        <button
                          key={user.id || user.login}
                          type="button"
                          onClick={() => {
                            setSelectedGithubUser(user);
                            setGithubSearchQuery('');
                            setGithubSearchResults([]);
                          }}
                          className="flex w-full items-center gap-2.5 rounded-md p-2 text-left hover:bg-indigo-50 transition"
                        >
                          <img
                            src={user.avatar_url}
                            alt={user.login}
                            className="h-6 w-6 rounded-full object-cover"
                          />
                          <span className="text-xs font-bold text-slate-800">@{user.login}</span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Progress (0-100) */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Progress (%)</label>
              <span className="text-xs font-bold text-primary-600">{progress}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => {
                const val = Number(e.target.value);
                setProgress(val);
                if (val === 100) setStatus('Completed');
              }}
              className="h-2 w-full cursor-pointer accent-primary-600 bg-gray-200 rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task details and instructions..."
              className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary-600 px-6 py-2 text-sm font-bold text-white shadow-md shadow-primary-600/20 transition hover:bg-primary-700 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Saving...' : taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
