/**
 * SubmitButton component
 * 
 * WHY it exists:
 * Wraps buttons to handle loading states, icons, and disable behaviors during submit.
 */
export default function SubmitButton({ children, isLoading, ...props }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full rounded-lg bg-primary-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-200 transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
