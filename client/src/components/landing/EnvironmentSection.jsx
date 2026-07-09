import { Key, Sliders, GitBranch, CheckCircle } from 'lucide-react';

/**
 * WHY THIS SECTION EXISTS:
 * Environment variables are one of the most painful parts of developer workflows.
 * This section targets that pain directly. Showing real (fake) code in a terminal
 * creates immediate developer empathy — "yes, THAT is my problem."
 *
 * LAYOUT DECISION (Two-column: code left, text right):
 * Dark code panels feel technical and credible to developers. Placing copy on
 * the right lets the code speak first, then the benefits reinforce it.
 *
 * REACT CONCEPT: Component composition.
 * `CodePanel` is extracted separately because it is a self-contained visual unit.
 * If we needed it in 3 places, we'd import it 3 times — no copy-paste.
 *
 * TAILWIND:
 * - `font-mono` for the code font family.
 * - Custom color tokens like `text-yellow-300` for syntax highlighting effect.
 * - `lg:grid-cols-2` for responsive two-column layout.
 */

function CodePanel() {
  return (
    <div className="overflow-hidden rounded-2xl bg-gray-900 shadow-2xl shadow-gray-900/40">
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 border-b border-gray-700/60 bg-gray-800 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <div className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-gray-400">.env.production</span>
      </div>

      {/* Code content */}
      <pre className="overflow-x-auto p-6 font-mono text-sm leading-loose">
        <code>
          <span className="text-gray-500"># Database</span>{'\n'}
          <span className="text-yellow-300">DATABASE_URL</span>
          <span className="text-gray-400"> = </span>
          <span className="text-green-400">"postgresql://user:pass@host/db"</span>{'\n\n'}
          <span className="text-gray-500"># Authentication</span>{'\n'}
          <span className="text-yellow-300">JWT_SECRET</span>
          <span className="text-gray-400"> = </span>
          <span className="text-green-400">"sk-prod-a1b2c3d4e5f6..."</span>{'\n'}
          <span className="text-yellow-300">JWT_EXPIRES_IN</span>
          <span className="text-gray-400"> = </span>
          <span className="text-blue-400">"7d"</span>{'\n\n'}
          <span className="text-gray-500"># External Services</span>{'\n'}
          <span className="text-yellow-300">STRIPE_API_KEY</span>
          <span className="text-gray-400"> = </span>
          <span className="text-green-400">"sk_live_51..."</span>{'\n'}
          <span className="text-yellow-300">AWS_BUCKET_NAME</span>
          <span className="text-gray-400"> = </span>
          <span className="text-green-400">"devnote-prod-storage"</span>{'\n'}
          <span className="text-yellow-300">AWS_REGION</span>
          <span className="text-gray-400"> = </span>
          <span className="text-blue-400">"us-east-1"</span>{'\n\n'}
          <span className="text-gray-500"># App Config</span>{'\n'}
          <span className="text-yellow-300">PORT</span>
          <span className="text-gray-400"> = </span>
          <span className="text-blue-400">3000</span>{'\n'}
          <span className="text-yellow-300">NODE_ENV</span>
          <span className="text-gray-400"> = </span>
          <span className="text-green-400">"production"</span>
        </code>
      </pre>
    </div>
  );
}

const envFeatures = [
  {
    icon: Key,
    title: 'API Key Storage',
    desc: 'Secure vault for all your secrets and third-party tokens.',
  },
  {
    icon: Sliders,
    title: 'Dynamic Env Variables',
    desc: 'Per-environment config that injects into your container builds.',
  },
  {
    icon: GitBranch,
    title: 'Versionized Infrastructure',
    desc: 'Track changes, rollback quickly, and keep your team in sync.',
  },
];

export default function EnvironmentSection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: Code panel ── */}
          <div>
            <CodePanel />
          </div>

          {/* ── Right: Text content ── */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Total control over your development environment
              </h2>
            </div>

            <div className="space-y-6">
              {envFeatures.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100">
                    <Icon size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={13} className="text-primary-500" />
                      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
