import { Bell, Calendar, Clock, AlertTriangle } from 'lucide-react';

export default function TimelineAlertsCard({ startDate, deadline, estimatedDuration, reminderToggle, reminderDaysBefore, priority }) {
  const formattedStart = startDate ? new Date(startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not set';
  const formattedDeadline = deadline ? new Date(deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not set';

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        Timeline & Alerts
      </h3>
      <div className="space-y-3.5">
        {/* Start Date */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar size={14} />
            <span>Start Date</span>
          </div>
          <span className="text-slate-800">{formattedStart}</span>
        </div>

        {/* Deadline */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar size={14} />
            <span>Deadline</span>
          </div>
          <span className="text-slate-800">{formattedDeadline}</span>
        </div>

        {/* Estimated Duration */}
        {estimatedDuration && (
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 text-slate-500">
              <Clock size={14} />
              <span>Est. Duration</span>
            </div>
            <span className="text-slate-800">{estimatedDuration}</span>
          </div>
        )}

        {/* Priority */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2 text-slate-500">
            <AlertTriangle size={14} />
            <span>Priority</span>
          </div>
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
            priority === 'Critical' ? 'bg-red-50 text-red-700 border border-red-100' :
            priority === 'High' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
            priority === 'Low' ? 'bg-slate-50 text-slate-600 border border-slate-100' :
            'bg-blue-50 text-blue-700 border border-blue-100'
          }`}>
            {priority || 'Medium'}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-2 pt-2" />

        {/* Reminder Settings */}
        <div className="flex items-start justify-between text-xs font-semibold">
          <div className="flex items-center gap-2 text-slate-500">
            <Bell size={14} className={reminderToggle ? 'text-primary-600' : 'text-slate-400'} />
            <div className="flex flex-col">
              <span>Reminders</span>
              <span className="text-[9px] font-medium text-slate-400">
                {reminderToggle ? 'Email Alert Enabled' : 'Alert Disabled'}
              </span>
            </div>
          </div>
          <div className="text-right">
            {reminderToggle ? (
              <span className="rounded bg-primary-50 px-1.5 py-0.5 text-[10px] font-bold text-primary-700 border border-primary-100">
                {reminderDaysBefore} {reminderDaysBefore === 1 ? 'day' : 'days'} before
              </span>
            ) : (
              <span className="rounded bg-slate-50 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-100">
                Disabled
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
