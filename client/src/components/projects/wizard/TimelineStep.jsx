import { useState, useEffect } from 'react';
import { Calendar, Clock, BellRing, Search, Trash2, Loader2 } from 'lucide-react';
import { projectService } from '../../../services/api/projectService';
import toast from 'react-hot-toast';

export default function TimelineStep({ projectData, onChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Viewer');

  // Debounced search on GitHub
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const searchTimer = setTimeout(async () => {
      try {
        setSearching(true);
        const res = await projectService.searchGithubUsers(searchQuery);
        if (res.success) {
          setSearchResults(res.items || []);
        }
      } catch (err) {
        console.error('Github search error:', err);
      } finally {
        setSearching(false);
      }
    }, 450);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  const handleAddMember = (user) => {
    // Check if already added
    const alreadyAdded = (projectData.teamMembers || []).some(
      (m) => m.githubUsername.toLowerCase() === user.login.toLowerCase()
    );
    if (alreadyAdded) {
      toast.error('User already added to team list');
      return;
    }

    const newMember = {
      githubUsername: user.login,
      displayName: user.login,
      githubAvatar: user.avatar_url,
      githubUrl: user.html_url,
      role: selectedRole
    };

    onChange({ teamMembers: [...(projectData.teamMembers || []), newMember] });
    setSearchQuery('');
    setSearchResults([]);
    toast.success(`Added @${user.login} as ${selectedRole}`);
  };

  const handleRemoveMember = (username) => {
    const updated = (projectData.teamMembers || []).filter(
      (m) => m.githubUsername.toLowerCase() !== username.toLowerCase()
    );
    onChange({ teamMembers: updated });
    toast.success(`Removed @${username}`);
  };

  const handleRoleChange = (username, role) => {
    const updated = (projectData.teamMembers || []).map((m) => {
      if (m.githubUsername.toLowerCase() === username.toLowerCase()) {
        return { ...m, role };
      }
      return m;
    });
    onChange({ teamMembers: updated });
  };

  const handleStatusChange = (e) => {
    onChange({ status: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Form Fields */}
      <div className="lg:col-span-2 space-y-5">
        <h3 className="text-base font-bold text-slate-800">Timeline & Schedule</h3>

        {/* Status Dropdown */}
        <div>
          <label htmlFor="projStatus" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Project Status
          </label>
          <select
            id="projStatus"
            value={projectData.status || 'Todo'}
            onChange={handleStatusChange}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-slate-600 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="In Review">In Review</option>
          </select>
        </div>

        {/* Start Date & Deadline Date fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="startDate" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Start Date
            </label>
            <div className="relative">
              <input
                id="startDate"
                type="date"
                value={projectData.startDate}
                onChange={(e) => onChange({ startDate: e.target.value })}
                className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-slate-600 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              />
              <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="deadline" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Deadline <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="deadline"
                type="date"
                required
                value={projectData.deadline}
                onChange={(e) => onChange({ deadline: e.target.value })}
                className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-slate-600 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              />
              <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Reminders Toggle & Config */}
        <div className="rounded-xl border border-gray-100 bg-slate-50/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BellRing size={16} className="text-primary-600" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-700">Reminders Schedule</span>
                <span className="text-[10px] text-slate-400 font-semibold">Notify key stakeholders before deadlines approach</span>
              </div>
            </div>
            {/* Toggle Switch */}
            <button
              type="button"
              onClick={() => onChange({ reminderToggle: !projectData.reminderToggle })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                projectData.reminderToggle ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  projectData.reminderToggle ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {projectData.reminderToggle && (
            <div className="mt-3.5 flex items-center gap-3 border-t border-gray-200/50 pt-3 animate-in slide-in-from-top-1 duration-200">
              <span className="text-xs font-semibold text-slate-600">Send reminder notifications:</span>
              <select
                value={projectData.reminderDaysBefore}
                onChange={(e) => onChange({ reminderDaysBefore: parseInt(e.target.value) })}
                className="h-8 rounded-lg border border-gray-200 bg-white px-2.5 text-xs font-bold text-slate-700 outline-none focus:border-primary-400"
              >
                <option value={1}>1 day before</option>
                <option value={3}>3 days before</option>
                <option value={5}>5 days before</option>
                <option value={7}>7 days before</option>
              </select>
            </div>
          )}
        </div>

        {/* Team Members Assignment (Real GitHub Search & Add) */}
        <div className="space-y-3">
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Assign Team Members (Optional)
          </label>
          
          {/* GitHub Search box */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search GitHub username to add..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-10 text-sm text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              />
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              {searching && (
                <Loader2 size={15} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-slate-400" />
              )}
            </div>
            
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-xs font-bold text-slate-600 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100 cursor-pointer"
            >
              <option value="Viewer">Viewer</option>
              <option value="Editor">Editor</option>
            </select>
          </div>

          {/* Github Search Results Dropdown/Box */}
          {searchResults.length > 0 && (
            <div className="max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-md space-y-0.5">
              {searchResults.slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleAddMember(item)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={item.avatar_url}
                      alt={item.login}
                      className="h-6 w-6 rounded-full bg-slate-100 border border-slate-200"
                    />
                    <span>{item.login}</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                    Add
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Currently Added Team Members List */}
          <div className="space-y-2 pt-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Added Team Members ({(projectData.teamMembers || []).length})
            </span>
            {(!projectData.teamMembers || projectData.teamMembers.length === 0) ? (
              <p className="text-xs text-slate-400 font-semibold italic bg-slate-50 border border-dashed border-slate-200 rounded-lg p-4 text-center">
                No team members added yet. Search a GitHub user above to invite them.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {projectData.teamMembers.map((member) => (
                  <div
                    key={member.githubUsername}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-2.5 shadow-sm"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={member.githubAvatar}
                        alt={member.githubUsername}
                        className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200/60"
                      />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-slate-700 truncate leading-snug">
                          {member.githubUsername}
                        </p>
                        <select
                          value={member.role}
                          onChange={(e) => handleRoleChange(member.githubUsername, e.target.value)}
                          className="text-[9px] font-bold text-primary-600 bg-primary-50 px-1 py-0.5 rounded border border-transparent hover:border-primary-200 focus:outline-none cursor-pointer mt-0.5"
                        >
                          <option value="Viewer">Viewer</option>
                          <option value="Editor">Editor</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.githubUsername)}
                      className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                      title="Remove member"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pro Tip Sidebar */}
      <div className="flex flex-col gap-4 rounded-xl bg-primary-50/40 border border-primary-100/40 p-5 lg:col-span-1 h-fit">
        <div className="flex items-start gap-2.5">
          <Clock size={18} className="text-primary-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-extrabold text-primary-900 uppercase tracking-wider">Pro Tip</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-primary-700 font-medium">
              Clear deadlines help calculate project health scores, velocity indexes, and upcoming schedule warnings automatically.
            </p>
          </div>
        </div>

        <div className="mt-2 pt-3 border-t border-primary-100/60 space-y-3">
          <h5 className="text-[10px] font-extrabold text-primary-900 uppercase tracking-widest">Velocity Insights</h5>
          <div className="flex items-center gap-2 bg-white rounded-lg border border-primary-100 p-2.5">
            <span className="text-[9px] font-extrabold text-primary-500 bg-primary-50 border border-primary-100 px-1.5 py-0.5 rounded uppercase">Metric</span>
            <span className="text-[10px] font-bold text-slate-600">Calculated automatically upon task completion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
