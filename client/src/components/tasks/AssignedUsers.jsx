import { User } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: AssignedUsers.jsx
 * Displays GitHub avatar and username for assigned users.
 */
export default function AssignedUsers({ githubUsername, githubAvatar, githubProfile, assignees }) {
  if (githubUsername || githubAvatar) {
    return (
      <div className="flex items-center gap-2">
        {githubAvatar ? (
          <img
            src={githubAvatar}
            alt={githubUsername || 'Assignee'}
            className="h-7 w-7 rounded-full border border-gray-200 object-cover shadow-sm"
          />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <User size={14} />
          </div>
        )}
        {githubProfile ? (
          <a
            href={githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-semibold text-slate-700 hover:text-primary-600 hover:underline"
          >
            @{githubUsername}
          </a>
        ) : (
          <span className="text-xs font-semibold text-slate-700">
            @{githubUsername}
          </span>
        )}
      </div>
    );
  }

  if (Array.isArray(assignees) && assignees.length > 0) {
    return (
      <div className="flex items-center gap-2">
        {assignees.map((u, i) => (
          <div key={u._id || u.id || i} className="flex items-center gap-1.5">
            <img
              src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name || 'User'}`}
              alt={u.name || 'Assignee'}
              className="h-7 w-7 rounded-full border border-white bg-slate-200 object-cover"
            />
            <span className="text-xs font-semibold text-slate-700">{u.name || u.githubUsername}</span>
          </div>
        ))}
      </div>
    );
  }

  return <span className="text-xs font-semibold text-slate-400">Unassigned</span>;
}
