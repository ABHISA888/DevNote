import { Link } from 'react-router-dom';
import DeadlineCard from './DeadlineCard';

export default function UpcomingDeadlines({ projects = [] }) {
  // Filter projects with deadlines that are not completed, sort by deadline ascending
  const upcomingDeadlines = projects
    .filter(p => p.deadline && p.status !== 'Completed')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Upcoming Deadlines</h2>
        <Link to="/projects" className="text-xs font-bold text-primary-600 hover:text-primary-700">
          View all
        </Link>
      </div>
      
      {upcomingDeadlines.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center text-slate-400">
          <p className="text-xs font-semibold">No tasks available.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {upcomingDeadlines.map((p) => {
            let progressPercent = 0;
            if (p.status === 'In Review') progressPercent = 75;
            else if (p.status === 'In Progress') progressPercent = 50;

            const diffTime = new Date(p.deadline) - new Date();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            let timeLabel = '';
            let timeColor = '';
            if (diffDays < 0) {
              timeLabel = 'Overdue';
              timeColor = 'text-red-500 font-extrabold';
            } else if (diffDays === 0) {
              timeLabel = 'Today';
              timeColor = 'text-red-500 font-extrabold';
            } else if (diffDays === 1) {
              timeLabel = 'Tomorrow';
              timeColor = 'text-amber-600 font-bold';
            } else {
              timeLabel = `In ${diffDays} days`;
              timeColor = 'text-slate-400 font-semibold';
            }

            return (
              <DeadlineCard 
                key={p._id || p.id} 
                id={p._id || p.id}
                title={p.name}
                timeLabel={timeLabel}
                timeColor={timeColor}
                progressPercent={progressPercent}
                iconBg="bg-slate-50"
                iconColor="text-slate-500"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
