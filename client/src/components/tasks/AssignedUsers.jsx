/**
 * 🎓 TEACHING MOMENT: AssignedUsers.jsx
 *
 * WHY THIS EXISTS:
 * Avatar groups (stacked overlapping circles) are a hallmark of collaborative SaaS
 * UIs. GitHub, Linear, Notion, and Jira all use them because they communicate
 * "who owns this" at a glance without taking up column space.
 *
 * FUTURE INTEGRATION:
 * `assignees` will be an array of user objects from the backend:
 *   [{ id, name, avatarUrl }]
 */
export default function AssignedUsers({ assignees, additionalAssignees }) {
  const hasAnyAssignees = assignees.length > 0 || additionalAssignees > 0;

  if (!hasAnyAssignees) {
    return <span className="text-xs text-slate-300">—</span>;
  }

  return (
    <div className="flex items-center -space-x-2">
      {assignees.map((user) => (
        <img
          key={user.id}
          src={user.avatar}
          alt="Assignee avatar"
          className="h-7 w-7 rounded-full border-2 border-white bg-slate-200 object-cover"
        />
      ))}
      {additionalAssignees > 0 && (
        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-[10px] font-bold text-indigo-700">
          +{additionalAssignees}
        </div>
      )}
    </div>
  );
}
