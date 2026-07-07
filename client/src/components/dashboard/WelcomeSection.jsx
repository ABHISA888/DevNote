/**
 * 🎓 TEACHING MOMENT: WelcomeSection.jsx
 * 
 * WHY THIS EXISTS:
 * The greeting header. Often, enterprise dashboards extract this into a component 
 * because the greeting logic (Morning/Afternoon/Evening) and user's first name 
 * require computation.
 */
export default function WelcomeSection() {
  return (
    <div className="mb-8 border-b border-dashed border-gray-300 pb-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
        Good Morning, Harshu <span className="inline-block animate-wave origin-bottom-right">👋</span>
      </h1>
      <p className="mt-2 text-sm font-medium text-slate-500">
        Here's what's happening with your projects today.
      </p>
    </div>
  );
}
