import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import EnvHeader from './EnvHeader';
import StatsCards from './StatsCards';
import EnvironmentTabs from './EnvironmentTabs';
import VariableTable from './VariableTable';
import { MOCK_VARIABLES, ENV_STATS } from '../../../mock/environment';

/**
 * 🎓 TEACHING MOMENT: EnvironmentTab.jsx
 * 
 * WHY THIS EXISTS:
 * This is the root orchestrator for the entire Environment Variables module.
 * It owns all the state (variables list, active tab, search query) and
 * passes down filtered data and action handlers to the child components.
 * 
 * BACKEND SYNC:
 * `handleDelete` and `handleEdit` currently mutate local state.
 * In production, they would each trigger an API call before updating state:
 *   - DELETE /api/projects/:id/variables/:varId
 *   - PUT /api/projects/:id/variables/:varId
 */
export default function EnvironmentTab() {
  const [variables, setVariables] = useState(MOCK_VARIABLES);
  const [activeEnvTab, setActiveEnvTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Derived filtered list — efficiently memoized to avoid re-filtering on unrelated re-renders
  const filteredVariables = useMemo(() => {
    return variables
      .filter((v) => {
        if (activeEnvTab === 'All') return true;
        const envMap = { Development: 'DEV', Staging: 'STG', Production: 'PRD' };
        return v.environments.includes(envMap[activeEnvTab]);
      })
      .filter((v) =>
        v.key.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [variables, activeEnvTab, searchQuery]);

  const handleDelete = (id) => {
    setVariables((prev) => prev.filter((v) => v.id !== id));
  };

  const handleEdit = (variable) => {
    // In a future implementation, open an edit modal here
    console.log('Edit variable:', variable.key);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <EnvHeader />
      <StatsCards stats={ENV_STATS} />

      {/* Table Tooling */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <EnvironmentTabs activeTab={activeEnvTab} onTabChange={setActiveEnvTab} />

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search size={13} />
            </div>
            <input
              type="text"
              placeholder="Search keys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-48 sm:w-56 rounded-lg border border-gray-200 bg-slate-50 pl-8 pr-3 text-xs font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Filter icon */}
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 transition">
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </div>

      {/* Variable Table */}
      <VariableTable
        variables={filteredVariables}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
