import { Quote } from 'lucide-react';

/**
 * WHY THIS SECTION EXISTS:
 * Testimonials are social proof — the most powerful conversion mechanism
 * in SaaS. A stranger trusting your product matters more than you claiming it.
 * "Loved by engineers worldwide" sets the credibility frame.
 *
 * REACT CONCEPT: Prop destructuring in functional components.
 * `TestimonialCard` receives all its data via props. The parent maps over
 * an array and passes each object as spread props `{...t}`. This pattern
 * is used throughout Stripe's and Vercel's component libraries.
 *
 * TAILWIND:
 * - `hover:-translate-y-1` lifts the card on hover for depth.
 * - `transition-all duration-200` ensures smooth animation.
 * - `line-clamp-4` (via Tailwind) would truncate long reviews gracefully.
 */

const testimonials = [
  {
    quote:
      'DevNote gives our team 20+ hours of work back per week by consolidating our docs, tasks, and environment in one workspace.',
    name: 'Grant Jordan',
    role: 'Dev Team Lead, Fintech Startup',
    initials: 'GJ',
    color: 'bg-primary-500',
  },
  {
    quote:
      'The most intuitive deployment pipeline I have ever used. You just push and it actually deploys correctly — wow, what an idea.',
    name: 'Monica Wu',
    role: 'Staff Engineer, DataScale',
    initials: 'MW',
    color: 'bg-violet-500',
  },
  {
    quote:
      'From team onboarding to environment management, DevNote has completely replaced four other tools we were paying for.',
    name: 'Ana Rodriguez',
    role: 'CTO, SaaS Platform',
    initials: 'AR',
    color: 'bg-primary-500',
  },
];

function TestimonialCard({ quote, name, role, initials, color }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <Quote size={20} className="mb-4 text-primary-200" />
      <p className="flex-1 text-sm leading-relaxed text-gray-600">"{quote}"</p>
      <div className="mt-6 flex items-center gap-3">
        <div
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${color} text-xs font-bold text-white`}
        >
          {initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{name}</div>
          <div className="text-xs text-gray-400">{role}</div>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Loved by engineers worldwide
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
