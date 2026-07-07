import React from 'react';

/**
 * 🎓 TEACHING MOMENT: StatCard.jsx
 * 
 * WHY THIS EXISTS:
 * Stat cards display high-level KPI (Key Performance Indicator) metrics.
 * By making this a generic reusable component, we ensure that adding a new stat 
 * (like "Total Revenue") requires zero new CSS — just passing new props.
 */
export default function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  iconColor, 
  metaText, 
  metaColor, 
  type, 
  progressValue,
  fill 
}) {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all">
      <h3 className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
        {label}
      </h3>
      
      <div className="mt-4 flex items-end justify-between">
        <span className="text-3xl font-extrabold text-slate-800 leading-none">
          {value}
        </span>
        
        {/* Dynamic Meta Content */}
        {Icon && (
          <Icon 
            size={20} 
            className={`${iconColor} ${fill ? 'fill-current' : ''}`} 
            strokeWidth={2.5} 
          />
        )}
        
        {metaText && (
          <span className={`text-xs font-bold ${metaColor}`}>
            {metaText}
          </span>
        )}
      </div>

      {/* Progress Bar Variant */}
      {type === 'progress' && (
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-100">
          <div 
            className="h-full rounded-full bg-indigo-600" 
            style={{ width: `${progressValue}%` }}
          />
        </div>
      )}
    </div>
  );
}
