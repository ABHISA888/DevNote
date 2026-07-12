import api from '../api/axios';

/**
 * 🎓 TEACHING MOMENT: Authentication Service Layer
 * 
 * Centralizes authentication API request routing and handles HTTP calls:
 * - `register`: Register a new account.
 * - `login`: Login with email and password credentials.
 * - `logout`: Sign out user and clear session cookie on the backend.
 * - `getCurrentUser`: Retrieve the authenticated user profile using the stored token.
 */
export const authService = {
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data; // e.g. { success: true, token, user }
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // e.g. { success: true, token, user }
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data; // e.g. { success: true, message }
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data; // e.g. { success: true, user }
  },

  googleLogin: () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  }
};
