import { MessageSquare, Paperclip, CheckSquare, MoreHorizontal } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: TaskCard.jsx
 * 
 * WHY THIS EXISTS:
 * Reusable task cards are the basic atomic units of lists, grids, and board views.
 * Having one card component ensures that if a designer changes the font size or shadow
 * of a task, it updates everywhere.
 * 
 * BACKEND POPULATION:
 * Task attributes map to standard document schemas: ID, name, description, priority, etc.
 */
export default function TaskCard({ task }) {
  const priorityColors = {
    HIGH: 'bg-red-50 text-red-600 border-red-100',
    MEDIUM: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    NORMAL: 'bg-slate-50 text-slate-500 border-slate-200',
    LOW: 'bg-slate-50 text-slate-400 border-slate-200'
  };

  const isCompleted = task.status === 'COMPLETED';
  const showProgress = task.status === 'IN PROGRESS';

  return (
    <div 
      className={`group relative flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md cursor-grab active:cursor-grabbing ${
        isCompleted ? 'opacity-85 hover:opacity-100' : ''
      }`}
    >
      {/* Card Header Priority + Options */}
      <div className="flex items-center justify-between mb-2.5">
        <span className={`rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider border ${
          priorityColors[task.priority] || priorityColors.NORMAL
        }`}>
          {task.priority === 'HIGH' ? 'High Priority' : task.priority}
        </span>
        <button className="text-slate-400 hover:text-slate-700 transition">
          <MoreHorizontal size={14} />
        </button>
      </div>

      {/* Task Content */}
      <div className="space-y-1.5">
        <h4 className={`text-xs font-extrabold text-slate-800 leading-snug group-hover:text-indigo-600 transition ${
          isCompleted ? 'line-through text-slate-400' : ''
        }`}>
          {task.name}
        </h4>
        {task.description && (
          <p className="text-[11px] leading-relaxed text-slate-400 font-medium line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      {/* Labels / Tags */}
      {task.labels && task.labels.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {task.labels.map((lbl) => (
            <span 
              key={lbl}
              className="rounded bg-slate-50 border border-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-500"
            >
              {lbl}
            </span>
          ))}
        </div>
      )}

      {/* Dynamic Progress Bar */}
      {showProgress && (
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-[9px] font-bold text-slate-400">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer Divider */}
      <div className="mt-4 pt-3.5 border-t border-gray-50 flex items-center justify-between">
        
        {/* Assignees Avatars */}
        <div className="flex -space-x-1.5">
          {task.assignees && task.assignees.map((user) => (
            <img 
              key={user.id} 
              src={user.avatar} 
              alt="Avatar" 
              className="h-5.5 w-5.5 rounded-full border border-white bg-slate-100"
            />
          ))}
          {(!task.assignees || task.assignees.length === 0) && (
            <div className="h-5.5 w-5.5 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-[8px] font-bold text-gray-400">
              ?
            </div>
          )}
        </div>

        {/* Indicators checklist, comments, attachments, due date */}
        <div className="flex items-center gap-2.5 text-[10px] font-bold text-slate-400">
          
          {/* Subtasks */}
          {task.subtasksTotal > 0 && (
            <div className="flex items-center gap-0.5" title="Subtasks">
              <CheckSquare size={11} className="text-slate-400" />
              <span>{task.subtasksCompleted}/{task.subtasksTotal}</span>
            </div>
          )}

          {/* Comments */}
          {task.commentsCount > 0 && (
            <div className="flex items-center gap-0.5" title="Comments">
              <MessageSquare size={11} className="text-slate-400" />
              <span>{task.commentsCount}</span>
            </div>
          )}

          {/* Attachments */}
          {task.attachmentsCount > 0 && (
            <div className="flex items-center gap-0.5" title="Attachments">
              <Paperclip size={11} className="text-slate-400" />
              <span>{task.attachmentsCount}</span>
            </div>
          )}

          {/* Badge indicator text */}
          {task.badgeText && (
            <span className="rounded bg-indigo-50 px-1 py-0.5 text-[8px] text-indigo-600 uppercase border border-indigo-100">
              {task.badgeText}
            </span>
          )}

          {/* Due date */}
          {task.dueDate && (
            <span className={`text-[9px] font-semibold ${
              task.dueDate === 'Due Today' 
                ? 'text-red-500 bg-red-50 border border-red-100 px-1 rounded' 
                : isCompleted 
                ? 'text-emerald-500' 
                : 'text-slate-400'
            }`}>
              {task.dueDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
