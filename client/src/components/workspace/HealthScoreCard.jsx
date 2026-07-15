import { ShieldCheck, ShieldAlert } from 'lucide-react';

export default function HealthScoreCard({ tasks = [], apiDocUrl }) {
  // Calculate score
  let scorePoints = 100;
  let overdueCount = 0;
  let pendingCount = 0;
  
  const now = new Date();

  tasks.forEach(task => {
    const isCompleted = task.status === 'Completed';
    if (!isCompleted) {
      pendingCount++;
      // Check if overdue
      if (task.dueDate && new Date(task.dueDate) < now) {
        overdueCount++;
        scorePoints -= 15;
      } else {
        // Pending task deduction based on priority
        if (task.priority === 'Critical') scorePoints -= 10;
        else if (task.priority === 'High') scorePoints -= 5;
        else if (task.priority === 'Medium') scorePoints -= 2;
        else scorePoints -= 1;
      }
    }
  });

  // Bound the score between 0 and 100
  scorePoints = Math.max(0, Math.min(100, scorePoints));

  let scoreLabel = 'Excellent';
  let riskLabel = 'Low Risk Index';
  let bgClass = 'bg-emerald-700 shadow-emerald-700/30';
  let textClass = 'text-emerald-200';
  let riskColor = 'text-emerald-300';
  let Icon = ShieldCheck;

  if (tasks.length === 0) {
    scoreLabel = 'Excellent';
    riskLabel = 'Healthy (No Tasks)';
  } else if (scorePoints >= 90) {
    scoreLabel = 'Excellent';
    riskLabel = 'Low Risk Index';
    bgClass = 'bg-emerald-700 shadow-emerald-700/30';
    textClass = 'text-emerald-200';
    riskColor = 'text-emerald-300';
  } else if (scorePoints >= 75) {
    scoreLabel = 'Good';
    riskLabel = 'Stable Status';
    bgClass = 'bg-indigo-700 shadow-indigo-700/30';
    textClass = 'text-indigo-200';
    riskColor = 'text-indigo-300';
  } else if (scorePoints >= 50) {
    scoreLabel = 'Fair';
    riskLabel = 'Needs Attention';
    bgClass = 'bg-amber-600 shadow-amber-600/30';
    textClass = 'text-amber-100';
    riskColor = 'text-amber-200';
    Icon = ShieldAlert;
  } else {
    scoreLabel = 'Poor';
    riskLabel = 'Critical Priority Action Needed';
    bgClass = 'bg-rose-700 shadow-rose-700/30';
    textClass = 'text-rose-100';
    riskColor = 'text-rose-200';
    Icon = ShieldAlert;
  }

  const docsStatus = apiDocUrl ? 'Linked' : 'Missing Docs';

  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-lg transition-all duration-300 ${bgClass}`}>
      {/* Decorative circles */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5" />
      <div className="absolute -bottom-8 -right-2 h-32 w-32 rounded-full bg-white/5" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${textClass}`}>
            Health Score
          </span>
          <Icon size={16} className={riskColor} />
        </div>

        {/* Score */}
        <p className="text-2xl font-extrabold text-white">{scoreLabel}</p>
        <p className={`mt-1 text-xs font-semibold ${riskColor}`}>{riskLabel}</p>

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* Docs Status */}
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${textClass}`}>
            DOCS STATUS
          </span>
          <span className="text-sm font-bold text-white">{docsStatus}</span>
        </div>
      </div>
    </div>
  );
}
