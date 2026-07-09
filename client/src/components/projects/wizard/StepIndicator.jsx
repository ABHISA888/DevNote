import React from 'react';
import { Check } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: StepIndicator.jsx
 * 
 * WHY THIS EXISTS:
 * Clear progress indicators manage user expectations in long processes. Letting developers
 * know that they are at "Step 2 of 5" prevents form abandonment.
 * 
 * DESIGN DETAILS:
 * - Completed steps display a checkmark.
 * - Active step is highlighted with a solid purple border and text.
 * - Future steps are grayed out.
 */
export default function StepIndicator({ currentStep }) {
  const steps = [
    { id: 1, label: 'Basic Info' },
    { id: 2, label: 'Tech Stack' },
    { id: 3, label: 'Integrations' },
    { id: 4, label: 'Timeline' },
    { id: 5, label: 'Review' }
  ];

  return (
    <div className="w-full py-4 border-b border-gray-100 bg-slate-50/50">
      <div className="max-w-xl mx-auto flex items-center justify-between px-4 sm:px-6">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle & Text */}
              <div className="flex flex-col items-center flex-1 relative">
                <div 
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 border-2 ${
                    isCompleted
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : isActive
                      ? 'border-primary-600 bg-white text-primary-600 shadow-md shadow-primary-100 scale-105'
                      : 'border-gray-200 bg-white text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : step.id}
                </div>
                <span 
                  className={`mt-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-primary-600' : isCompleted ? 'text-slate-700' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting line (not after the last step) */}
              {index < steps.length - 1 && (
                <div 
                  className={`h-0.5 flex-1 transition-all duration-500 mx-2 -mt-4 ${
                    isCompleted ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
