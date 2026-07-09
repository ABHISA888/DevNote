import { Calendar, UserPlus, Clock, BellRing, Info } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: TimelineStep.jsx
 * 
 * WHY THIS EXISTS:
 * Aligning the project timeline establishes realistic milestones.
 * Reminder toggles ensure the app can send automated Slack or email alerts before milestones,
 * improving team tracking.
 */
export default function TimelineStep({ projectData, onChange }) {
  const membersList = [
    { id: 1, name: 'Elena Rodriguez', role: 'Architect', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
    { id: 2, name: 'James Wilson', role: 'Backend', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
    { id: 3, name: 'Jordan Kyosho', role: 'Designer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan' },
    { id: 4, name: 'Sarah Jenkins', role: 'QA Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }
  ];

  const handleMemberToggle = (memberId) => {
    const isSelected = projectData.teamMembers.includes(memberId);
    let updatedMembers;
    if (isSelected) {
      updatedMembers = projectData.teamMembers.filter(id => id !== memberId);
    } else {
      updatedMembers = [...projectData.teamMembers, memberId];
    }
    onChange({ teamMembers: updatedMembers });
  };

  const handleStatusChange = (e) => {
    onChange({ status: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Form Fields */}
      <div className="lg:col-span-2 space-y-4">
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

        {/* Team Members Assignment (UI-Only checklist) */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Assign Team Members (Optional)
          </label>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {membersList.map((member) => {
              const isSelected = projectData.teamMembers.includes(member.id);
              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => handleMemberToggle(member.id)}
                  className={`flex items-center gap-2 rounded-xl border p-2.5 text-left transition ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50/20 text-primary-700 shadow-sm shadow-primary-100/30'
                      : 'border-gray-200 bg-white text-slate-600 hover:border-primary-100 hover:bg-primary-50/10'
                  }`}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200/60"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold truncate leading-snug">{member.name}</p>
                    <p className="text-[9px] font-medium text-slate-400 leading-tight">{member.role}</p>
                  </div>
                </button>
              );
            })}
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
          {/* Decorative velocity meter */}
          <div className="flex items-center gap-2 bg-white rounded-lg border border-primary-100 p-2.5">
            <span className="text-[9px] font-extrabold text-primary-500 bg-primary-50 border border-primary-100 px-1.5 py-0.5 rounded uppercase">Metric</span>
            <span className="text-[10px] font-bold text-slate-600">Calculated automatically upon task completion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
