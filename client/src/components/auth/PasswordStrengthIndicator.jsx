import { Check } from 'lucide-react';

/**
 * PasswordStrengthIndicator component
 * 
 * WHY it exists:
 * Provides real-time interactive feedback on password complexity.
 * This guides users to create strong passwords and prevents form submission errors.
 * 
 * DESIGN SPEC:
 * Matches the layout under the Password field in the mockup:
 * - Strength bar with multiple color sections.
 * - Icon validation bullets ("8+ characters" and "One symbol").
 */
export default function PasswordStrengthIndicator({ value = '' }) {
  const hasMinLength = value.length >= 8;
  const hasSymbol = /[^A-Za-z0-9]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);

  // Calculate score (0 to 4)
  let score = 0;
  if (value.length > 0) {
    if (hasMinLength) score++;
    if (hasSymbol) score++;
    if (hasUpper && hasLower) score++;
    if (hasNumber) score++;
  }

  const getBarColor = (index) => {
    if (score === 0) return 'bg-gray-100';
    if (score === 1) return index < 1 ? 'bg-red-500' : 'bg-gray-100';
    if (score === 2) return index < 2 ? 'bg-yellow-500' : 'bg-gray-100';
    if (score === 3) return index < 3 ? 'bg-primary-400' : 'bg-gray-100';
    return 'bg-primary-500';
  };

  return (
    <div className="space-y-2 mt-1">
      {/* Visual strength bar segments */}
      <div className="flex gap-1 h-1 w-full">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-full flex-1 rounded-full transition-colors duration-300 ${getBarColor(
              index
            )}`}
          />
        ))}
      </div>

      {/* Requirement bullets */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
        {/* Requirement 1: 8+ chars */}
        <div
          className={`flex items-center gap-1 transition ${
            hasMinLength ? 'text-primary-600 font-semibold' : 'text-slate-400'
          }`}
        >
          <div
            className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border transition ${
              hasMinLength
                ? 'border-primary-600 bg-primary-50 text-primary-600'
                : 'border-slate-300 bg-transparent text-transparent'
            }`}
          >
            <Check size={9} strokeWidth={3} />
          </div>
          <span>8+ characters</span>
        </div>

        {/* Requirement 2: One symbol */}
        <div
          className={`flex items-center gap-1 transition ${
            hasSymbol ? 'text-primary-600 font-semibold' : 'text-slate-400'
          }`}
        >
          <div
            className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border transition ${
              hasSymbol
                ? 'border-primary-600 bg-primary-50 text-primary-600'
                : 'border-slate-300 bg-transparent text-transparent'
            }`}
          >
            <Check size={9} strokeWidth={3} />
          </div>
          <span>One symbol</span>
        </div>
      </div>
    </div>
  );
}
