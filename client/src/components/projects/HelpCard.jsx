import { ExternalLink } from 'lucide-react';

export default function HelpCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-800 p-6 text-white shadow-lg shadow-slate-800/20">
      <div className="absolute -bottom-4 -right-4 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
        </svg>
      </div>
      <div className="relative z-10 space-y-2">
        <h3 className="text-sm font-bold">Need Help?</h3>
        <p className="text-[11px] leading-relaxed text-slate-300">
          Check out our technical docs for best practices on project structure.
        </p>
        <a href="#" className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary-300 transition hover:text-primary-200">
          Read Documentation
          <ExternalLink size={12} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
