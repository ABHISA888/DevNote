/**
 * WHY THIS SECTION EXISTS:
 * The Workflow section converts a complex product into a simple 3-step mental model.
 * Users fear complexity. "Create → Organize → Ship" makes DevNote feel immediately
 * approachable and reduces cognitive load before signup.
 *
 * LAYOUT DECISION (Numbered timeline):
 * The horizontal connecting line between circles signals forward progression.
 * This is a proven UI pattern used by Stripe, Linear, and Notion onboarding flows.
 *
 * REACT CONCEPT: Rendering indexed lists.
 * We use the array index to dynamically generate the step number inside the circle.
 * This means adding a 4th step in the `steps` array auto-generates step "4" —
 * zero config change to JSX.
 *
 * TAILWIND:
 * - `relative` + `absolute` on the connecting line creates the horizontal rule.
 * - Hidden on mobile (`hidden md:block`) because on small screens, steps stack.
 */

const steps = [
  {
    title: 'Create',
    description:
      'Initiate your project structure, define teams, set environments and project analytics repos.',
  },
  {
    title: 'Organize',
    description:
      'Plan your architecture, set up variables, create tasks, and organize your project deliverables.',
  },
  {
    title: 'Ship',
    description:
      'Push your code and deploy your application with all environment configs automatically applied.',
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Steps grid */}
        <div className="relative grid gap-12 sm:gap-8 md:grid-cols-3">
          {/* Connecting horizontal line (desktop only) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[22px] hidden border-t-2 border-dashed border-gray-200 md:block"
            style={{ zIndex: 0 }}
          />

          {steps.map((step, index) => (
            <div key={step.title} className="relative z-10 flex flex-col items-center text-center">
              {/* Numbered circle */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-sm font-bold text-gray-700 shadow-sm">
                {index + 1}
              </div>

              {/* Content */}
              <div className="mt-6 space-y-2">
                <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
