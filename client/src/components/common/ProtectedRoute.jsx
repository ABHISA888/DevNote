import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Loader';

/**
 * 🎓 TEACHING MOMENT: ProtectedRoute Pattern
 * 
 * Protects application sub-trees by checking the authentication state before rendering
 * child components via `<Outlet />`. Redirects unauthenticated sessions to `/login`.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
