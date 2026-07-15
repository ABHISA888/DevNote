import { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, Loader2, X, AlertCircle } from 'lucide-react';
import EnvHeader from './EnvHeader';
import StatsCards from './StatsCards';
import EnvironmentTabs from './EnvironmentTabs';
import VariableTable from './VariableTable';
import { envVarService } from '../../../services/api/envVarService';
import toast from 'react-hot-toast';

export default function EnvironmentTab({ project }) {
  const projectId = project?._id || project?.id;

  const [variables, setVariables] = useState([]);
  const [activeEnvTab, setActiveEnvTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [selectedVarId, setSelectedVarId] = useState(null);
  const [formData, setFormData] = useState({
    key: '',
    value: '',
    description: '',
    environment: 'Development',
    isSecret: false
  });
  const [formError, setFormError] = useState('');

  // Fetch variables
  const fetchVariables = async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const res = await envVarService.getEnvVars(projectId);
      if (res.success) {
        setVariables(res.data || []);
      }
    } catch (err) {
      console.error('Error fetching env vars:', err);
      toast.error('Failed to load environment variables.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariables();
  }, [projectId]);

  // Derived filtered list
  const filteredVariables = useMemo(() => {
    return variables
      .filter((v) => {
        if (activeEnvTab === 'All') return true;
        return v.environment === activeEnvTab;
      })
      .filter((v) =>
        v.key.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [variables, activeEnvTab, searchQuery]);

  // Dynamic Statistics
  const dynamicStats = useMemo(() => {
    const total = variables.length;
    const secrets = variables.filter((v) => v.isSecret).length;
    const dev = variables.filter((v) => v.environment === 'Development').length;
    const testing = variables.filter((v) => v.environment === 'Testing').length;
    const prod = variables.filter((v) => v.environment === 'Production').length;

    const secretPercentage = total ? Math.round((secrets / total) * 100) : 0;

    return [
      { id: 'total', label: 'Total Vars', value: total, isSecure: false },
      { id: 'secrets', label: 'Hidden Secrets', value: secrets, subtext: `${secretPercentage}%`, isSecure: true },
      { id: 'dev', label: 'Development', value: dev, isSecure: false },
      { id: 'testing', label: 'Testing', value: testing, isSecure: false },
      { id: 'prod', label: 'Production', value: prod, isSecure: false }
    ];
  }, [variables]);

  // Delete Variable Action
  const handleDelete = async (varId) => {
    if (!window.confirm('Are you sure you want to delete this environment variable?')) return;
    try {
      const res = await envVarService.deleteEnvVar(projectId, varId);
      if (res.success) {
        setVariables((prev) => prev.filter((v) => (v._id || v.id) !== varId));
        toast.success('Variable deleted successfully');
      }
    } catch (err) {
      console.error('Error deleting variable:', err);
      toast.error('Failed to delete variable.');
    }
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setModalMode('create');
    setFormData({
      key: '',
      value: '',
      description: '',
      environment: 'Development',
      isSecret: false
    });
    setFormError('');
    setSelectedVarId(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (variable) => {
    setModalMode('edit');
    setSelectedVarId(variable._id || variable.id);
    setFormData({
      key: variable.key,
      value: variable.value,
      description: variable.description || '',
      environment: variable.environment,
      isSecret: !!variable.isSecret
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = type === 'checkbox' ? checked : value;
    
    // Automatically uppercase env key names and replace invalid chars
    if (name === 'key') {
      finalValue = value.toUpperCase().replace(/[^A-Z0-9_]/g, '');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue
    }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const { key, value, environment } = formData;
    if (!key.trim()) return setFormError('Key name is required');
    if (!value.trim()) return setFormError('Value is required');

    // Local duplicate key check
    const isDuplicate = variables.some(
      (v) => 
        (v._id || v.id) !== selectedVarId && 
        v.key === key.trim() && 
        v.environment === environment
    );

    if (isDuplicate) {
      return setFormError(`Key "${key.trim()}" already exists in the "${environment}" environment.`);
    }

    try {
      if (modalMode === 'create') {
        const res = await envVarService.createEnvVar(projectId, formData);
        if (res.success && res.data) {
          setVariables([res.data, ...variables]);
          toast.success('Environment variable created');
          setIsModalOpen(false);
        }
      } else {
        const res = await envVarService.updateEnvVar(projectId, selectedVarId, formData);
        if (res.success && res.data) {
          setVariables((prev) => 
            prev.map((v) => ((v._id || v.id) === selectedVarId ? res.data : v))
          );
          toast.success('Environment variable updated');
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error saving variable:', err);
      const errMsg = err.response?.data?.message || 'Failed to save variable.';
      setFormError(errMsg);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center bg-white rounded-2xl border border-gray-150">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <p className="text-sm font-semibold text-slate-500">Loading environment vault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <EnvHeader onAddClick={handleOpenCreate} />
      
      <StatsCards stats={dynamicStats} />

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
              className="h-9 w-48 sm:w-56 rounded-lg border border-gray-200 bg-slate-50 pl-8 pr-3 text-xs font-medium text-slate-700 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 transition">
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </div>

      {/* Variable Table */}
      <VariableTable
        variables={filteredVariables}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* Modern Dialog Modal (Create & Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Blur backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-slate-900">
                {modalMode === 'create' ? 'Add Environment Variable' : 'Edit Environment Variable'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-3.5 py-2.5 text-xs text-red-700 font-semibold">
                <AlertCircle size={15} className="shrink-0 text-red-500" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Variable Key */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  Key / Variable Name
                </label>
                <input
                  type="text"
                  name="key"
                  value={formData.key}
                  onChange={handleInputChange}
                  placeholder="e.g. DATABASE_URL"
                  disabled={modalMode === 'edit'}
                  className="w-full h-9 rounded-lg border border-slate-200 px-3 text-xs font-mono text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>

              {/* Variable Value */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  Value
                </label>
                <textarea
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="e.g. mongodb+srv://..."
                  rows={2}
                  className="w-full rounded-lg border border-slate-200 p-3 text-xs font-mono text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what this variable is used for"
                  className="w-full h-9 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </div>

              {/* Environment Target & isSecret controls side-by-side */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                    Environment
                  </label>
                  <select
                    name="environment"
                    value={formData.environment}
                    onChange={handleInputChange}
                    className="w-full h-9 rounded-lg border border-slate-200 px-2 text-xs font-bold text-slate-700 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 bg-white"
                  >
                    <option value="Development">Development</option>
                    <option value="Testing">Testing</option>
                    <option value="Production">Production</option>
                  </select>
                </div>

                {/* Secret Toggle */}
                <div className="flex flex-col justify-end">
                  <div className="flex items-center gap-2 h-9">
                    <input
                      type="checkbox"
                      id="isSecret"
                      name="isSecret"
                      checked={formData.isSecret}
                      onChange={handleInputChange}
                      className="h-4.5 w-4.5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                    />
                    <label htmlFor="isSecret" className="text-xs font-bold text-slate-700 select-none cursor-pointer">
                      Encrypt Secret
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-50">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-primary-600/20 transition hover:bg-primary-700"
                >
                  {modalMode === 'create' ? 'Create' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
