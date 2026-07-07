import { forwardRef } from 'react';

/**
 * TermsCheckbox component
 * 
 * WHY it exists:
 * Wraps checkbox input field and displays custom term link anchors and validation errors.
 */
const TermsCheckbox = forwardRef(({ id, error, ...props }, ref) => {
  return (
    <div className="space-y-1 text-left w-full">
      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-indigo-600 focus:ring-indigo-500"
          {...props}
        />
        <span className="text-xs text-slate-500 leading-relaxed">
          I agree to the{' '}
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-700 transition">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-700 transition">
            Privacy Policy
          </a>
          .
        </span>
      </label>
      {error && (
        <p className="text-xs text-red-500 font-medium mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
});

TermsCheckbox.displayName = 'TermsCheckbox';

export default TermsCheckbox;
