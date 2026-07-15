import { Shield } from 'lucide-react';
import loginImg from '../../assets/login.png';

/**
 * AuthLayout component
 * 
 * WHY it exists:
 * Shared split-screen template for both Login and Signup screens.
 * Centralizes layout grids, responsiveness breakpoints, ambient glows,
 * trust badges, and footers.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-[#eef0f8]">
      {/* ── LEFT PANEL: Illustration (Desktop Only) ── */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-b from-[#f8f9fe] to-[#ecf0fc] px-16 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-primary-500/5 blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-1/4 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <img
          src={loginImg}
          alt="DevNote Workspace Illustration"
          className="w-full max-w-[460px] h-auto object-contain select-none rounded-2xl"
          draggable="false"
        />
      </div>

      {/* ── RIGHT PANEL: Active Card Context ── */}
      <div className="flex flex-1 flex-col items-center justify-start pt-16 lg:pt-24 px-4 pb-12 sm:px-6 lg:px-12">
        <div className="w-full max-w-[420px] space-y-6">
          {children}

          {/* Security Shield Trust Badge */}
          <div className="flex items-start gap-3 rounded-2xl border border-primary-100 bg-[#f4f6fc] p-4 text-left shadow-sm">
            <Shield size={16} className="mt-0.5 text-primary-500 flex-shrink-0" />
            <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
              Your account and project data are securely protected using modern authentication
              and encrypted storage.
            </p>
          </div>

          {/* Footer Navigation links */}
          <div className="flex items-center justify-center gap-6 text-[11px] font-semibold text-slate-400">
            <a href="#" className="hover:text-slate-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition">Security</a>
          </div>
        </div>
      </div>
    </div>
  );
}
