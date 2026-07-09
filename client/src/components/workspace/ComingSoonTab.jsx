import { ArrowLeft } from 'lucide-react';

export default function ComingSoonTab({
  title,
  description,
  features,
  icon: Icon,
  onBackToOverview,
}) {
  return (
    <div className="mx-auto flex min-h-[520px] max-w-4xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 shadow-sm">
          <Icon size={34} strokeWidth={1.8} />
        </div>

        <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.2em] text-primary-600">
          Coming Soon
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
        <p className="mt-2 text-sm font-medium text-slate-500">
          This feature is planned for a future DevNote release.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-xl border border-gray-100 bg-white p-5 text-left shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Upcoming Features
            </h3>
            <span className="inline-flex items-center rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
              🚧 Planned
            </span>
          </div>

          <ul className="mt-4 space-y-2.5">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={onBackToOverview}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-primary-600/20 transition hover:bg-primary-700 active:scale-95"
        >
          <ArrowLeft size={16} />
          Back to Overview
        </button>
      </div>
    </div>
  );
}
