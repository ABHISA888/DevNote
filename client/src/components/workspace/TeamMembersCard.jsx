/**
 * 🎓 TEACHING MOMENT: TeamMembersCard.jsx
 *
 * WHY THIS EXISTS:
 * Knowing WHO is on a project is as important as knowing WHAT it does.
 * GitHub shows contributors, Linear shows members, Jira shows assignees.
 * The team card answers "who do I talk to?" instantly without digging through
 * settings or a separate People page.
 *
 * Each row is a mini MemberCard that shows avatar + name + role.
 * This is a reusable pattern — the same component can later appear in modals,
 * assignment dropdowns, and notification recipients lists.
 */
function MemberRow({ avatar, name, role }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={avatar}
        alt={`${name} avatar`}
        className="h-9 w-9 rounded-full border-2 border-white bg-slate-200 object-cover shadow-sm"
      />
      <div>
        <p className="text-sm font-bold text-slate-800">{name}</p>
        <p className="text-[11px] font-medium text-slate-400">{role}</p>
      </div>
    </div>
  );
}

export default function TeamMembersCard({ members }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        Project Team
      </h3>

      {!members || members.length === 0 ? (
        <p className="text-xs font-semibold text-slate-400 py-1">No team members added.</p>
      ) : (
        <div className="space-y-4">
          {members.map((member) => (
            <MemberRow key={member.id || member.name} {...member} />
          ))}
        </div>
      )}
    </div>
  );
}
