export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 max-w-md space-y-4">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <h2 className="text-2xl font-bold text-slate-200">Page Not Found</h2>
        <p className="text-slate-400 text-sm">
          The link you followed may be broken, or the page may have been removed. Let's get you back on track.
        </p>
        <div className="pt-4">
          <a
            href="/"
            className="inline-block px-6 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-500 font-medium transition-all shadow-lg shadow-primary-500/20"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}
