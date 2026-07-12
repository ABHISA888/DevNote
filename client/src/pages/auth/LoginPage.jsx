import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import loginImg from '../../assets/login.png';
import { useAuth } from '../../context/AuthContext';

/* ─── Main Login Page ───────────────────────────────────────────────────────── */
export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, googleLogin, getCurrentUser } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const error = queryParams.get('error');

    if (token) {
      localStorage.setItem('token', token);
      setIsLoading(true);
      getCurrentUser()
        .then((user) => {
          if (user) {
            toast.success('Signed in successfully with Google!', {
              icon: '🔑',
            });
            navigate('/dashboard');
          } else {
            toast.error('Session verification failed.');
          }
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || 'Failed to complete Google sign-in');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (error) {
      toast.error(
        error === 'GoogleAuthFailed'
          ? 'Google authentication failed.'
          : 'An error occurred during authentication.'
      );
    }
  }, [navigate, getCurrentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result && result.success) {
        toast.success('Signed in successfully!', {
          icon: '🔑',
        });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
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

              {/* Google Sign-in Button */}
              <button
                type="button"
                onClick={googleLogin}
                className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Sign In with Google
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
