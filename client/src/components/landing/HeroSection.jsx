import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import heroMockup from '../../assets/hero_mockup.png';

export default function HeroSection() {
  const trustBadges = [
    'Free Forever',
    'GitHub Integration',
    'Team Collaboration',
    'Modern Workspace'
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Subtle background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-50/60 via-white to-violet-50/40"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: Value Prop Copy ── */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Your Complete <br />
              <span className="bg-gradient-to-r from-primary-600 to-violet-600 bg-clip-text text-transparent">
                Developer Workspace
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-500 lg:mx-0 lg:text-[1.05rem]">
              Plan projects, collaborate with your team, organize notes, manage APIs,
              store environment variables, and import GitHub repositories — all from one workspace.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-600 to-violet-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-200 transition-all hover:opacity-95 hover:shadow-xl active:scale-[0.98]"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
              >
                Explore Features
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-y-2 gap-x-5 lg:justify-start">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Premium Mockup Image ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group max-w-lg lg:max-w-none">
              {/* Decorative Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-500 to-violet-600 opacity-20 blur-xl transition duration-500 group-hover:opacity-30" />
              <img
                src={heroMockup}
                alt="DevNote Premium SaaS Mockup"
                className="relative rounded-2xl border border-slate-200/80 bg-white shadow-2xl transition duration-500 group-hover:scale-[1.01]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
