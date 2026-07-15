const steps = [
  {
    title: 'Create or Import Project',
    description: 'Create manually or import directly from GitHub to auto-fill configurations.',
  },
  {
    title: 'Manage Everything',
    description: 'Coordinate tasks, markdown notes, connected endpoints, env vars, and team member permissions.',
  },
  {
    title: 'Track Progress',
    description: 'Monitor deadlines, GitHub sync events, repository stats, contributors, and recent updates.',
  },
  {
    title: 'Collaborate',
    description: 'Assign team members to projects, manage shared documentation, and share resources.',
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="bg-white py-20 sm:py-24 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            How DevNote Works
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            A simplified, high-performance lifecycle designed to accelerate developer workflows.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative grid gap-12 sm:gap-8 md:grid-cols-4">
          {/* Connecting horizontal line (desktop only) */}
          <div
            aria-hidden
            className="absolute left-[12%] right-[12%] top-[22px] hidden border-t-2 border-dashed border-slate-200 md:block"
            style={{ zIndex: 0 }}
          />

          {steps.map((step, index) => (
            <div key={step.title} className="relative z-10 flex flex-col items-center text-center">
              {/* Numbered circle */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary-500 bg-white text-sm font-bold text-primary-600 shadow-md">
                {index + 1}
              </div>

              {/* Content */}
              <div className="mt-6 space-y-2 px-4">
                <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
