import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth/authService';

const AuthContext = createContext(null);

/**
 * 🎓 TEACHING MOMENT: AuthProvider State Orchestration
 * 
 * - Checks localStorage for token on startup and fetches current user.
 * - `loading` state prevents flash of unauthenticated screens while restoring sessions on page refresh.
 * - Automatically configures Bearer token using Axios interceptors.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth state on application load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const result = await authService.getCurrentUser();
          if (result.success && result.user) {
            setUser(result.user);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Failed to restore authentication session:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      if (result.success && result.token) {
        localStorage.setItem('token', result.token);
        setUser(result.user);
        return result;
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const result = await authService.register(name, email, password);
      if (result.success && result.token) {
        localStorage.setItem('token', result.token);
        setUser(result.user);
        return result;
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error on server:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    authService.googleLogin();
  };

  const getCurrentUser = async () => {
    try {
      const result = await authService.getCurrentUser();
      if (result.success && result.user) {
        setUser(result.user);
        return result.user;
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
    return null;
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        googleLogin,
        getCurrentUser,
        isAuthenticated,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}
