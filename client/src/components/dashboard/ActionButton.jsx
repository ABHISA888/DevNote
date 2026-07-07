import React from 'react';

/**
 * 🎓 TEACHING MOMENT: ActionButton.jsx
 * 
 * WHY THIS EXISTS:
 * A standardized button component specifically for the "Quick Actions" bar.
 * It enforces consistent padding, borders, and typography.
 */
export default function ActionButton({ 
  label, 
  icon: Icon, 
  variant = 'outline', 
  onClick 
}) {
  const baseClasses = "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all shadow-sm";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 border border-indigo-600",
    outline: "bg-white text-slate-700 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700",
    dark: "bg-slate-900 text-white hover:bg-slate-800 border border-slate-900",
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {Icon && <Icon size={16} strokeWidth={2.5} />}
      {label}
    </button>
  );
}
