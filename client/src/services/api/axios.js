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
  baseURL: '/api', // Vite proxy forwards /api -> http://localhost:5000/api
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
