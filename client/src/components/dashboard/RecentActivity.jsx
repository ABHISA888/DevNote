import ActivityItem from './ActivityItem';
import { Rocket, FolderPlus } from 'lucide-react';

export default function RecentActivity({ projects = [] }) {
  // Sort projects by updatedAt desc to determine recent modifications
  const sorted = [...projects].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  
  const activities = [];
  sorted.forEach((p) => {
    const timeStr = new Date(p.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    
    // If the project was modified after its creation
    if (p.updatedAt && p.createdAt && p.updatedAt !== p.createdAt) {
      activities.push({
        id: `update-${p._id}`,
        title: `Updated project "${p.name}" profile`,
        time: timeStr,
        category: 'Update',
        icon: Rocket,
        iconBg: 'bg-indigo-50',
        iconColor: 'text-indigo-600',
      });
    }
    
    // Standard initialization activity
    activities.push({
      id: `create-${p._id}`,
      title: `Initialized project "${p.name}"`,
      time: new Date(p.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      category: 'Creation',
      icon: FolderPlus,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-500',
    });
  });

  const displayActivities = activities.slice(0, 5);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Recent Activity</h2>
      </div>
      
      {displayActivities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center text-slate-400">
          <p className="text-xs font-semibold">No recent activity.</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {displayActivities.map((activity, idx) => (
            <ActivityItem 
              key={activity.id} 
              {...activity} 
              isLast={idx === displayActivities.length - 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
