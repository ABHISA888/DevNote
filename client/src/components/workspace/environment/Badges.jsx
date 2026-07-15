/**
 * 🎓 TEACHING MOMENT: Badges.jsx
 * 
 * WHY THIS EXISTS:
 * Centralizing all badge variants in one file ensures visual consistency.
 * Color-coded badges create an immediate visual hierarchy in a dense table view,
 * making it effortless to scan which environments a secret applies to.
 */

// Environment badge — colored pill for DEV, STG, PRD
const ENV_STYLES = {
  DEV: 'bg-primary-100 text-primary-700 border border-primary-200',
  TST: 'bg-amber-100 text-amber-700 border border-amber-200',
  PRD: 'bg-blue-100 text-blue-700 border border-blue-200'
};

export function EnvironmentBadge({ env }) {
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest ${
      ENV_STYLES[env] || 'bg-slate-100 text-slate-500'
    }`}>
      {env}
    </span>
  );
}

// Category badge — pill for Auth, Database, Infrastructure, Billing, etc.
const CATEGORY_STYLES = {
  Auth: 'bg-purple-50 text-purple-700 border border-purple-100',
  Database: 'bg-blue-50 text-blue-700 border border-blue-100',
  Infrastructure: 'bg-slate-100 text-slate-600 border border-slate-200',
  Billing: 'bg-teal-50 text-teal-700 border border-teal-100',
  Analytics: 'bg-orange-50 text-orange-700 border border-orange-100'
};

export function CategoryBadge({ category }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
      CATEGORY_STYLES[category] || 'bg-slate-100 text-slate-500'
    }`}>
      {category}
    </span>
  );
}
