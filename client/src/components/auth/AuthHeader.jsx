/**
 * AuthHeader component
 * 
 * WHY it exists:
 * Groups the branding logo and page titles at the top of the auth cards.
 */
export default function AuthHeader() {
  return (
    <div className="flex flex-col items-center space-y-1 text-center">
      {/* Brand logo rocket icon */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-200">
        <span className="text-xl">🚀</span>
      </div>

      {/* Brand Name */}
      <div className="pt-2 flex items-center gap-1.5 justify-center">
        <span className="text-sm font-bold tracking-wider text-slate-800 uppercase">DevNote</span>
      </div>

      {/* Tagline */}
      <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
        The workspace built for developers.
      </p>

      {/* Form title & subtitle */}
      <div className="pt-2 space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-slate-800">
          Create Your Account
        </h1>
        <p className="text-xs text-slate-400 leading-normal">
          Join thousands of developers building smarter projects.
        </p>
      </div>
    </div>
  );
}
