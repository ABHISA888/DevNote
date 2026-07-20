import axios from 'axios';

/**
 * 🎓 TEACHING MOMENT: Centralized Axios Instance
 * 
 * In standard single-page applications (SPAs):
 * - Setting a `baseURL` lets us write queries like `api.get('/projects')` instead of full URLs.
 * - `withCredentials: true` is crucial if the backend uses secure HTTP-only cookies for JWT storage,
 *   instructing the browser to automatically attach authentication cookies on cross-origin requests.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL  || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Automatically attach Bearer token to Authorization header for every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
