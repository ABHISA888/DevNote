import { Link } from 'react-router-dom';

/**
 * WHY THIS SECTION EXISTS:
 * This is the final conversion opportunity before the user leaves.
 * Every high-converting SaaS page (Linear, Vercel, Stripe) ends with a strong
 * CTA section because users who have read this far are warm leads.
 * The gradient background creates visual urgency and distinction from the rest.
 *
 * TWO-BUTTON PATTERN:
 * "Start Building Now" → primary (self-service, high intent)
 * "Talk to Sales"      → secondary (enterprise, lower friction)
 * This covers both buyer types without alienating either.
 *
 * TAILWIND:
 * - `bg-gradient-to-br from-indigo-600 to-violet-700` matches the design.
 * - The ambient glow (`blur-3xl bg-white/10`) adds depth without images.
 */

export default function CTASection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 px-8 py-16 text-center shadow-2xl shadow-indigo-300/30 sm:py-20">
          {/* Ambient glow overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-violet-500/20 blur-2xl"
          />

          {/* Content */}
          <div className="relative">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
              Ready to accelerate your launch?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-indigo-200">
              Join thousands of developers who have simplified their entire development
              workflow with DevNote.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
              >
                Start Building Now
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
