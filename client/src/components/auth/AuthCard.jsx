/**
 * AuthCard component
 * 
 * WHY it exists:
 * Serves as the primary white floating container wrapper for credentials forms.
 */
export default function AuthCard({ children }) {
  return (
    <div className="w-full rounded-2xl border border-gray-100/50 bg-white p-6 shadow-xl shadow-indigo-100/40 sm:p-10">
      {children}
    </div>
  );
}
