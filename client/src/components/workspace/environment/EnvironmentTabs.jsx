/**
 * 🎓 TEACHING MOMENT: EnvironmentTabs.jsx
 * 
 * WHY THIS EXISTS:
 * Environment tabs are a core UX pattern borrowed from Vercel and Railway.
 * They allow developers to scope their view to a specific environment (Dev, Stg, Prod)
 * rather than scrolling through a massive combined list of secrets.
 */
export default function EnvironmentTabs({ activeTab, onTabChange }) {
  const TABS = ['All', 'Development', 'Testing', 'Production'];

  return (
    <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
      {TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-all ${
              isActive 
                ? 'bg-white text-slate-800 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
