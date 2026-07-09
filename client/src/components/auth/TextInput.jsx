import { forwardRef } from 'react';

/**
 * TextInput component
 * 
 * WHY it exists:
 * Wraps standard input element to enforce consistent styling, support labels,
 * and display validation errors.
 * 
 * REACT CONCEPT: forwardRef
 * React Hook Form needs direct access to the underlying DOM node to register
 * input values and set focus. Since React doesn't pass refs through components by default,
 * we use forwardRef to forward the input ref to the native input element.
 */
const TextInput = forwardRef(({ label, id, error, placeholder, type = 'text', ...props }, ref) => {
  return (
    <div className="space-y-1.5 w-full text-left">
      <label htmlFor={id} className="block text-xs font-semibold text-slate-600">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-slate-700 placeholder-gray-400 outline-none transition focus:bg-white focus:ring-2 ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
            : 'border-gray-200 focus:border-primary-400 focus:ring-primary-100'
        }`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500 font-medium mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
