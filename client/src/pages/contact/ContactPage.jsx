export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-slate-800/50 border border-slate-700/80 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
            Contact Support
          </h2>
          <p className="text-slate-400 text-sm">Need help? Send us a message and our team will reach out.</p>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Subject</label>
            <input
              type="text"
              placeholder="How can we help?"
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Message</label>
            <textarea
              placeholder="Describe your issue..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
            />
          </div>
          <button className="w-full py-3 mt-2 rounded-lg bg-primary-600 hover:bg-primary-500 font-semibold transition-all shadow-lg shadow-primary-500/20">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
