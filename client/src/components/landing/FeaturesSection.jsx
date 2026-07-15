import { 
  FolderKanban, 
  FileText, 
  Users, 
  Key, 
  CheckSquare, 
  Terminal 
} from 'lucide-react';
import { Github } from '../common/BrandIcons';

const features = [
  {
    icon: FolderKanban,
    title: 'Project Management',
    description: 'Create, organize, pin, archive, and manage all your engineering projects inside a premium dashboard.',
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-600',
    hoverBg: 'group-hover:bg-primary-100',
  },
  {
    icon: Github,
    title: 'GitHub Integration',
    description: 'Import repositories, Markdown README documentation, live statistics, and contributor activity instantly.',
    iconBg: 'bg-slate-900/10',
    iconColor: 'text-slate-800',
    hoverBg: 'group-hover:bg-slate-900/20',
  },
  {
    icon: FileText,
    title: 'Developer Notes',
    description: 'Write project-specific notes and document architecture decisions using a fully functional Markdown editor.',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    hoverBg: 'group-hover:bg-amber-100',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Invite members to your workspace, assign editor/viewer roles, and track project contributions in real-time.',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    hoverBg: 'group-hover:bg-emerald-100',
  },
  {
    icon: Key,
    title: 'Environment Variables',
    description: 'Securely manage project configuration keys across Development, Testing, and Production with visibility controls.',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    hoverBg: 'group-hover:bg-purple-100',
  },
  {
    icon: CheckSquare,
    title: 'Task Management',
    description: 'Track development progress efficiently with board lists, due dates, statuses, and custom urgency labels.',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    hoverBg: 'group-hover:bg-blue-100',
  },
  {
    icon: Terminal,
    title: 'Modern Workspace',
    description: 'Everything developers need in one high-performance interface, eliminating tool sprawl and context-switching.',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    hoverBg: 'group-hover:bg-rose-100',
  },
];

function FeatureCard({ icon: Icon, title, description, iconBg, iconColor, hoverBg }) {
  return (
    <article className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-200/80">
      <div
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${hoverBg} transition-colors duration-300`}
      >
        <Icon size={20} className={iconColor} />
      </div>
      <h3 className="mb-2 text-base font-bold text-gray-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500">{description}</p>
    </article>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-slate-50/50 py-20 sm:py-24 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Real Developer Capabilities
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            DevNote aggregates the core tools developers need daily to construct, document, and ship production-grade systems.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
