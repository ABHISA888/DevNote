import { LayoutDashboard, CheckSquare, FileCode, Rocket } from 'lucide-react';

/**
 * WHY THIS SECTION EXISTS:
 * After the hero sells the "what", the Features section explains the "how".
 * It answers the visitor's second question: "But what exactly does it do?"
 * Feature cards are scannable — users can skim all 4 in seconds.
 *
 * REACT CONCEPT: Data-driven rendering with Array.map()
 * Instead of writing 4 identical card JSX blocks, we define the data
 * in a `features` array and map over it. This is the DRY (Don't Repeat Yourself)
 * principle applied to React — one change to the card template updates all 4.
 *
 * TAILWIND:
 * - `group` on the card + `group-hover:` on children enables parent-driven hover.
 * - `transition-all duration-300` for smooth animations.
 * - `bg-indigo-50 group-hover:bg-indigo-100` — icon container changes on card hover.
 */

const features = [
  {
    icon: LayoutDashboard,
    title: 'Unified Workspaces',
    description:
      'Centralize all your projects in one workspace for your team or individual review across multiple domains.',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    hoverBg: 'group-hover:bg-indigo-100',
  },
  {
    icon: CheckSquare,
    title: 'Smart Tasks',
    description:
      'Context-aware task management that integrates seamlessly with your project timeline and requires no setup.',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    hoverBg: 'group-hover:bg-violet-100',
  },
  {
    icon: FileCode,
    title: 'Live API Docs',
    description:
      'Auto-generate living API documentation from your endpoints with real-time update capabilities and searchable index.',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    hoverBg: 'group-hover:bg-blue-100',
  },
  {
    icon: Rocket,
    title: 'Instant Deployment',
    description:
      'Configure your environment and deployments in a single command without complex configuration setups.',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    hoverBg: 'group-hover:bg-emerald-100',
  },
];

function FeatureCard({ icon: Icon, title, description, iconBg, iconColor, hoverBg }) {
  return (
    <article className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${hoverBg} transition-colors duration-300`}
      >
        <Icon size={20} className={iconColor} />
      </div>
      <h3 className="mb-2 text-base font-semibold text-gray-900">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-500">{description}</p>
    </article>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Built for the Modern Workflow
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-500">
            DevNote is wherever a team between individual writing and production. Everything your
            team needs in one high-performance interface.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
