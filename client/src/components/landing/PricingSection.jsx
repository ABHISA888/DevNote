import { Link } from 'react-router-dom';
import { Check, ShieldAlert } from 'lucide-react';

export default function PricingSection() {
  const planFeatures = [
    'Unlimited Projects',
    'GitHub Integration',
    'Project Notes',
    'Environment Variables',
    'Team Members',
    'Repository Import',
    'Task Management',
    'No credit card required'
  ];

  return (
    <section id="pricing" className="bg-white py-20 sm:py-24 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            Start organizing your development workflow with zero friction.
          </p>
        </div>

        {/* Pricing Card Wrapper */}
        <div className="flex justify-center">
          <div className="relative group w-full max-w-md">
            {/* Animated Glow Border */}
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-primary-500 to-violet-600 opacity-20 blur-lg transition duration-500 group-hover:opacity-30" />
            
            {/* Pricing Card */}
            <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-xl flex flex-col justify-between">
              
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-extrabold text-slate-800">Free Forever</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-0.5 text-[10px] font-bold text-primary-600 uppercase tracking-wide border border-primary-100">
                    Active
                  </span>
                </div>
                
                <p className="text-sm text-slate-400 font-medium">
                  Everything you need to manage your development projects.
                </p>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-900">₹0</span>
                  <span className="ml-1 text-sm font-semibold text-slate-400">/ month</span>
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-slate-100" />

                {/* Features checklist */}
                <ul className="space-y-4">
                  {planFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 leading-normal">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 space-y-4">
                <Link
                  to="/signup"
                  className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary-200 transition-all hover:opacity-95 hover:shadow-lg active:scale-[0.98]"
                >
                  Start Free
                </Link>

                {/* More Plans Badge */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50/50 border border-amber-100/50 rounded-xl py-2 px-3">
                  <ShieldAlert size={12} />
                  <span>More plans coming soon</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
