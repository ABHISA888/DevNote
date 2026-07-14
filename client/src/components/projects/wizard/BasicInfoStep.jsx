import { useState } from 'react';
import { Heart, Globe, Lock, ShieldCheck, CheckCircle2, Github, Loader2 } from 'lucide-react';
import { projectService } from '../../../services/api/projectService';
import toast from 'react-hot-toast';

export default function BasicInfoStep({ projectData, onChange }) {
  const [importSource, setImportSource] = useState('manual');
  const [githubOwner, setGithubOwner] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [loadingRepo, setLoadingRepo] = useState(false);

  const setupChecklist = [
    'Use a clear, descriptive name so teammates can identify it at a glance.',
    'Write a concise description capturing the purpose and scope.',
    'Pick the correct category — it drives search filters across the dashboard.',
    'Set visibility carefully. Private projects are only accessible to invited members.',
    'Mark as Favourite to pin it to your quick-access feed.',
  ];

  const mapLanguageToCategory = (lang) => {
    if (!lang) return 'Fullstack';
    const l = lang.toLowerCase();
    if (['javascript', 'typescript', 'html', 'css', 'vue', 'react'].includes(l)) return 'Frontend';
    if (['python', 'go', 'rust', 'ruby', 'java', 'php', 'c#', 'cpp'].includes(l)) return 'Backend';
    return 'Fullstack';
  };

  const handleFetchGithubInfo = async () => {
    if (!githubOwner.trim() || !githubRepo.trim()) {
      toast.error('Please enter both Owner and Repository name.');
      return;
    }
    try {
      setLoadingRepo(true);
      const res = await projectService.getGithubRepoInfo(githubOwner, githubRepo);
      if (res.success) {
        toast.success('Successfully loaded GitHub repository details!');
        
        const repoDetails = res.data;
        // Phase 3E: Show languages as Tech Stack badges
        const importedLanguages = repoDetails.languages ? Object.keys(repoDetails.languages) : (repoDetails.language ? [repoDetails.language] : []);
        
        // Phase 3F: Automatically suggest Project Members from contributors
        const mappedContributors = (repoDetails.contributors || []).map(c => ({
          githubUsername: c.login,
          displayName: c.login,
          githubAvatar: c.avatar_url,
          githubUrl: c.html_url,
          role: 'Viewer'
        }));

        onChange({
          name: repoDetails.name || '',
          description: repoDetails.description || '',
          visibility: repoDetails.visibility || 'private',
          githubUrl: repoDetails.htmlUrl || '',
          deploymentUrl: repoDetails.homepage || '', // Phase 3I: deploy link
          techStack: importedLanguages.length > 0 ? importedLanguages : ['JavaScript'],
          category: mapLanguageToCategory(repoDetails.language || importedLanguages[0]),
          githubStats: {
            stars: repoDetails.stats?.stars || 0,
            forks: repoDetails.stats?.forks || 0,
            openIssues: repoDetails.stats?.openIssues || 0,
            watchers: repoDetails.stats?.watchers || 0,
            defaultBranch: repoDetails.stats?.defaultBranch || 'main',
            lastUpdated: repoDetails.stats?.lastUpdated
          },
          githubRelease: repoDetails.latestRelease || null, // Phase 3H: Releases
          suggestedContributors: mappedContributors
        });
        setImportSource('manual'); // Switch back so they can see and edit the fields
      } else {
        toast.error(res.message || 'Failed to fetch repository details.');
      }
    } catch (err) {
      console.error('Error fetching github details:', err);
      toast.error(err.response?.data?.message || 'Failed to retrieve repository details from GitHub.');
    } finally {
      setLoadingRepo(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

      {/* ── Form Fields — left 2 columns ───────────────────────────────────── */}
      <div className="lg:col-span-2 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">Start a New Project</h3>
        </div>

        {/* Source Toggle */}
        <div className="flex rounded-lg border border-gray-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setImportSource('manual')}
            className={`flex flex-1 items-center justify-center gap-1.5 py-1.5 text-xs font-bold transition-all rounded-md ${
              importSource === 'manual'
                ? 'bg-slate-100 text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Create Manually
          </button>
          <button
            type="button"
            onClick={() => setImportSource('github')}
            className={`flex flex-1 items-center justify-center gap-1.5 py-1.5 text-xs font-bold transition-all rounded-md ${
              importSource === 'github'
                ? 'bg-slate-100 text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Github size={13} /> Import from GitHub
          </button>
        </div>

        {importSource === 'github' ? (
          <div className="space-y-4 rounded-xl border border-indigo-50 bg-indigo-50/20 p-4">
            <h4 className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider">
              GitHub Import Details
            </h4>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Owner / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. facebook"
                  value={githubOwner}
                  onChange={(e) => setGithubOwner(e.target.value)}
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Repository Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. react"
                  value={githubRepo}
                  onChange={(e) => setGithubRepo(e.target.value)}
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleFetchGithubInfo}
              disabled={loadingRepo}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:opacity-50"
            >
              {loadingRepo ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Github size={14} />
              )}
              Load Repository Details
            </button>
          </div>
        ) : (
          <>
            {/* Project Name */}
            <div>
              <label htmlFor="projectName" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                id="projectName"
                type="text"
                required
                placeholder="e.g. Spacecraft Analytics Dash"
                value={projectData.name}
                onChange={(e) => onChange({ name: e.target.value })}
                className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              />
            </div>

            {/* Description — 4 rows gives comfortable writing space */}
            <div>
              <label htmlFor="projectDesc" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="projectDesc"
                rows={4}
                required
                placeholder="Briefly describe the purpose of this project..."
                value={projectData.description}
                onChange={(e) => onChange({ description: e.target.value })}
                className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              />
            </div>

            {/* Category & Visibility — 2-column row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="projectCategory" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Project Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="projectCategory"
                  value={projectData.category}
                  onChange={(e) => onChange({ category: e.target.value })}
                  className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-slate-600 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                >
                  <option value="">Select Category</option>
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Fullstack">Fullstack</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Project Visibility
                </label>
                <div className="flex h-10 overflow-hidden rounded-lg border border-gray-200 bg-white">
                  <button
                    type="button"
                    onClick={() => onChange({ visibility: 'public' })}
                    className={`flex flex-1 items-center justify-center gap-1.5 text-xs font-bold transition-colors ${
                      projectData.visibility === 'public'
                        ? 'bg-primary-600 text-white'
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Globe size={13} /> Public
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ visibility: 'private' })}
                    className={`flex flex-1 items-center justify-center gap-1.5 text-xs font-bold transition-colors ${
                      projectData.visibility === 'private'
                        ? 'bg-primary-600 text-white'
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Lock size={13} /> Private
                  </button>
                </div>
              </div>
            </div>

            {/* Favourite toggle */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Favourite
              </label>
              <button
                type="button"
                onClick={() => onChange({ isFavorite: !projectData.isFavorite })}
                className={`flex h-10 w-full items-center justify-center gap-2 rounded-lg border text-xs font-bold transition sm:w-1/2 ${
                  projectData.isFavorite
                    ? 'border-primary-200 bg-primary-50 text-primary-600 shadow-sm'
                    : 'border-gray-200 bg-white text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Heart size={14} className={projectData.isFavorite ? 'fill-current' : ''} />
                {projectData.isFavorite ? 'Marked as Favourite' : 'Add to Favourites'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── Pro Tip Sidebar — right column ─────────────────────────────────── */}
      <div className="flex flex-col gap-4 rounded-xl bg-primary-50/40 border border-primary-100/40 p-5 lg:col-span-1">
        {/* Header */}
        <div className="flex items-start gap-2.5">
          <ShieldCheck size={18} className="text-primary-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-extrabold text-primary-900 uppercase tracking-wider">Pro Tip</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-primary-700 font-medium">
              A well-described project saves hours of onboarding time for every collaborator who joins later.
            </p>
          </div>
        </div>

        {/* Setup Checklist — replaces Template Footprints, keeps sidebar balanced */}
        <div className="pt-4 border-t border-primary-100/60">
          <h5 className="text-[10px] font-extrabold text-primary-900 uppercase tracking-widest mb-3">
            Setup Checklist
          </h5>
          <ul className="space-y-2.5">
            {setupChecklist.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-[10px] text-primary-700 font-medium leading-relaxed">
                <CheckCircle2 size={12} className="shrink-0 mt-0.5 text-primary-400" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
