import { 
  Monitor, 
  Terminal, 
  Github, 
  Users, 
  EyeOff, 
  Sparkles 
} from 'lucide-react';

function TerminalMockup() {
  return (
    <div className="overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-xs font-mono text-slate-400">production.env</span>
        <span className="ml-auto text-[9px] font-mono text-slate-500 flex items-center gap-1">
          <EyeOff size={10} /> SECURED
        </span>
      </div>

      {/* Code content */}
      <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-loose text-slate-300">
        <code>
          <span className="text-slate-500"># Mapped to Project Workspace</span>{'\n'}
          <span className="text-primary-400">PROJECT_ID</span>
          <span className="text-slate-400"> = </span>
          <span className="text-violet-400">"devnote-core-prod"</span>{'\n\n'}
          <span className="text-slate-500"># Secure Secret Variables (Shielded)</span>{'\n'}
          <span className="text-amber-400">DATABASE_URL</span>
          <span className="text-slate-400"> = </span>
          <span className="text-emerald-400">"••••••••••••••••••••••••••••••••"</span>{'\n'}
          <span className="text-amber-400">JWT_SECRET</span>
          <span className="text-slate-400"> = </span>
          <span className="text-emerald-400">"••••••••••••••••••••"</span>{'\n'}
          <span className="text-amber-400">GITHUB_TOKEN</span>
          <span className="text-slate-400"> = </span>
          <span className="text-emerald-400">"••••••••••••••••••••••••••••••••"</span>{'\n\n'}
          <span className="text-slate-500"># Public Environment Configurations</span>{'\n'}
          <span className="text-primary-400">PORT</span>
          <span className="text-slate-400"> = </span>
          <span className="text-violet-400">5000</span>{'\n'}
          <span className="text-primary-400">NODE_ENV</span>
          <span className="text-slate-400"> = </span>
          <span className="text-violet-400">"production"</span>
        </code>
      </pre>
    </div>
  );
}

const benefits = [
  {
    icon: Monitor,
    title: 'Single Workspace',
    desc: 'Everything in one place. Consolidate your projects, documents, tasks, and environment keys.',
    color: 'bg-primary-50 text-primary-600 border-primary-100',
  },
  {
    icon: Terminal,
    title: 'Developer Focused',
    desc: 'Designed specifically for software engineers with native support for code, markdown, and config structures.',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
  },
  {
    icon: Github,
    title: 'GitHub Connected',
    desc: 'Connect repositories instantly to synchronize readmes, stars, forks, open issues, and contributors.',
    color: 'bg-slate-900/10 text-slate-800 border-slate-200',
  },
  {
    icon: Users,
    title: 'Team Ready',
    desc: 'Collaborate with your team. Invite members, assign ownership roles, and manage permissions.',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  {
    icon: Sparkles,
    title: 'Clean UI & Fast Experience',
    desc: 'Distraction-free workspace optimized for performance, quick navigation, and instant updates.',
    color: 'bg-rose-50 text-rose-600 border-rose-100',
  },
];

export default function EnvironmentSection() {
  return (
    <section className="bg-slate-50/30 py-20 sm:py-24 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* ── Left: Copy & Benefits list ── */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Why Developers Choose DevNote
              </h2>
              <p className="text-base text-slate-500 leading-relaxed">
                We remove the tooling sprawl that slows developers down. By combining documentation, task management, environment secrets, and Git metadata, you spend less time switching windows and more time shipping code.
              </p>
            </div>

            <div className="space-y-5">
              {benefits.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="flex gap-4">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border ${color}`}>
                    <Icon size={16} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 font-medium">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Terminal display ── */}
          <div className="relative">
            <TerminalMockup />
            {/* Ambient decoration */}
            <div className="absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-primary-500/5 blur-3xl pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
