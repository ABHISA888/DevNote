import ProjectStatCard from './ProjectStatCard';

/**
 * 🎓 TEACHING MOMENT: ProjectStats.jsx
 *
 * WHY THIS EXISTS:
 * The stat row (Status, Progress, Tasks, Days Left, Stack, Updated) gives
 * engineers a complete project snapshot without reading a single word of prose.
 * GitHub uses this for stars/forks/watchers, Linear for priority/estimate/cycle.
 * It's the data density pattern — maximum info in minimum space.
 */
export default function ProjectStats({ stats }) {
  return (
    <div className="mx-4 sm:mx-6 mt-4 overflow-x-auto">
      <div className="flex min-w-max divide-x divide-gray-100 rounded-xl border border-gray-200 bg-white shadow-sm">
        {stats.map((stat) => (
          <ProjectStatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            valueColor={stat.valueColor}
          />
        ))}
      </div>
    </div>
  );
}
