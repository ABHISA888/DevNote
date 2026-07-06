import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white font-sans p-6">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl text-center space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
          DevNote
        </h1>
        <p className="text-slate-400 text-sm">
          The All-in-One Workspace for Developers to Plan, Build and Ship Projects.
        </p>
        <div className="pt-4 border-t border-slate-700">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Frontend Foundation Active
          </span>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
