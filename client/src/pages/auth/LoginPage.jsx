import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import loginImg from '../../assets/login.png';

/* ─── Main Login Page ───────────────────────────────────────────────────────── */
export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Signed in successfully!', {
        icon: '🔑',
      });
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: '#eef0f8' }}
    >
      {/* ── Main content: split visual grid matching design ── */}
      <div className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-4xl flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-center">

          {/* ── LEFT CARD: Isometric Illustration ── */}
          <div className="hidden flex-1 lg:flex lg:items-center lg:justify-center">
            <img
              src={loginImg}
              alt="DevNote Dashboard Preview"
              className="w-full max-w-[420px] h-auto object-contain select-none rounded-2xl"
              draggable="false"
            />
          </div>

          {/* ── RIGHT CARD: Credentials Auth ── */}
          <div className="w-full rounded-2xl bg-white px-8 py-10 shadow-xl shadow-primary-100/30 sm:px-10 lg:w-[420px] lg:flex-none">
            <div className="flex flex-col items-center space-y-1 text-center">
              {/* Logo rocket badge */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 shadow-md shadow-primary-200">
                <span className="text-xl">🚀</span>
              </div>

              {/* DevNote header */}
              <h2 className="pt-2 text-sm font-bold tracking-wider text-slate-800 uppercase">
                DevNote
              </h2>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                The workspace built for developers.
              </p>
            </div>

            <div className="mt-8 space-y-1 text-left">
              <h1 className="text-xl font-bold tracking-tight text-slate-800">Welcome Back</h1>
              <p className="text-xs text-slate-400">
                Sign in to continue managing your projects.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Email */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-semibold text-slate-600">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-slate-700 placeholder-gray-400 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-600">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs font-medium text-primary-500 transition hover:text-primary-700"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm text-slate-700 placeholder-gray-400 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-slate-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Remember checkbox */}
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((v) => !v)}
                  className="h-4 w-4 rounded border-gray-300 accent-indigo-600 focus:ring-primary-500"
                />
                <span className="text-xs text-slate-500 font-medium select-none">Remember Me</span>
              </label>

              {/* Action submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-primary-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-200 transition hover:bg-primary-700"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Signing In…
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Or</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Navigation redirect button */}
            <Link
              to="/signup"
              className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 text-center text-sm font-semibold text-slate-600 shadow-sm transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
            >
              Create Account
            </Link>

            {/* Redirect text links */}
            <p className="mt-4 text-center text-xs text-slate-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-primary-500 transition hover:text-primary-700"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── Security trust layout footer ── */}
      <div className="pb-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-2xl border border-primary-100 bg-[#f4f6fc] px-4 py-2 text-xs text-slate-500 shadow-sm">
          <Shield size={14} className="text-primary-500" />
          <span>Your data is securely encrypted using JWT authentication.</span>
        </div>

        <p className="text-[11px] font-semibold text-slate-400">
          © {new Date().getFullYear()} DevNote{' '}
          <span className="mx-1.5">|</span>
          <a href="#" className="hover:text-slate-600 transition">Privacy Policy</a>
          <span className="mx-1.5">|</span>
          <a href="#" className="hover:text-slate-600 transition">Terms of Service</a>
        </p>
      </div>
    </div>
  );
}
