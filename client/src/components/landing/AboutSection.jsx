import { Award, Compass, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="bg-slate-50/50 py-20 sm:py-24 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            About DevNote
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            A developer workspace built to simplify project management, collaboration, documentation, and GitHub integration.
          </p>
        </div>

        {/* Content Box */}
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-lg">
          <div className="space-y-8">
            
            {/* Description */}
            <div className="text-center space-y-4">
              <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                DevNote was designed and developed as a collaborative software engineering project. Our mission is to provide developers with a single workspace to plan, organize, and build software efficiently.
              </p>
            </div>

            {/* Grid details */}
            <div className="grid gap-6 sm:grid-cols-2 pt-6 border-t border-slate-100">
              
              {/* Creator credits */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 border border-primary-100">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Engineered By</h4>
                  <p className="text-sm font-extrabold text-slate-800 mt-1">Abhinivesh S</p>
                </div>
              </div>

              {/* Our Mission */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 border border-violet-100">
                  <Compass size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Our Goal</h4>
                  <p className="text-sm font-semibold text-slate-600 mt-1">
                    Provide a fast, unified workspace for developers.
                  </p>
                </div>
              </div>

            </div>

            {/* Dedicated tagline */}
            <div className="flex items-center justify-center gap-2 pt-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Made with</span>
              <Heart size={10} className="fill-rose-500 text-rose-500" />
              <span>for software engineers</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
