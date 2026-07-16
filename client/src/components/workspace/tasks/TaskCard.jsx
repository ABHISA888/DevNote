import { MoreHorizontal, Calendar } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const priorityColors = {
  HIGH: 'bg-red-50 text-red-600 border-red-100',
  MEDIUM: 'bg-amber-50 text-amber-600 border-amber-100',
  NORMAL: 'bg-primary-50 text-primary-600 border-primary-100',
  LOW: 'bg-slate-50 text-slate-600 border-slate-200',
};

function ThreeDotMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-400 hover:text-slate-600 transition p-1 rounded-md hover:bg-slate-50"
      >
        <MoreHorizontal size={16} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-36 rounded-md border border-gray-100 bg-white shadow-lg z-10 py-1">
          <button className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 transition">Edit Task</button>
          <button className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 transition">Move To...</button>
          <button className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 transition">Duplicate Task</button>
          <div className="my-1 h-px w-full bg-gray-100" />
          <button className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 transition">Delete Task</button>
        </div>
      )}
    </div>
  );
}

export default function TaskCard({ task }) {
  const badgeClass = priorityColors[task.priority] || priorityColors.NORMAL;

  return (
    <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm transition-shadow hover:shadow-md cursor-grab active:cursor-grabbing">
      {/* Header: Priority & Menu */}
      <div className="flex items-center justify-between mb-2">
        <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${badgeClass}`}>
          {task.priority}
        </span>
        <ThreeDotMenu />
      </div>

      {/* Title & Description */}
      <h4 className="text-sm font-bold text-slate-800 leading-tight mb-1">{task.name}</h4>
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
        {task.description}
      </p>

      {/* Tags */}
      {task.labels && task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {task.labels.map(label => (
            <span key={label} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Progress Bar (Optional) */}
      {typeof task.progress === 'number' && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</span>
            <span className="text-[10px] font-bold text-slate-600">{task.progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div 
              className="h-full bg-primary-500 rounded-full" 
              style={{ width: `${task.progress}%` }} 
            />
          </div>
        </div>
      )}

      {/* Footer: Due Date */}
      <div className="flex items-center gap-1.5 mt-auto pt-1 text-slate-400">
        <Calendar size={12} />
        <span className="text-[10px] font-semibold text-slate-500">{task.dueDate}</span>
      </div>
    </div>
  );
}
