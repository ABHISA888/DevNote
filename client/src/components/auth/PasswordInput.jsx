import { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * PasswordInput component
 * 
 * WHY it exists:
 * Wraps password input field, handles password visibility toggle internally,
 * manages accessibility (aria-invalid), and displays validation errors.
 */
const PasswordInput = forwardRef(({ label, id, error, placeholder = '••••••••', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5 w-full text-left">
      <label htmlFor={id} className="block text-xs font-semibold text-slate-600">
        {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-lg border bg-gray-50 px-4 py-2.5 pr-10 text-sm text-slate-700 placeholder-gray-400 outline-none transition focus:bg-white focus:ring-2 ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
              : 'border-gray-200 focus:border-primary-400 focus:ring-primary-100'
          }`}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-slate-600"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500 font-medium mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
