import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';

/**
 * App.jsx — Root Application Shell
 *
 * WHY this stays minimal:
 * - App.jsx is the boundary between the browser mount (main.jsx) and the
 *   route system (AppRoutes.jsx). It should only hold concerns that affect
 *   the *entire* application equally — global styling, toast notifications,
 *   and future global providers (AuthProvider, QueryClient).
 *
 * WHY we removed the container wrapper:
 * - Authentication pages (Login, Signup) are designed as full-viewport
 *   split-screen layouts. Wrapping them in a constrained container would
 *   break their layout. Each page is responsible for its own layout context.
 */
function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-primary-500 selection:text-white">
      <AppRoutes />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#334155',
            border: '1px solid #e5e7eb',
            fontSize: '0.875rem',
          },
        }}
      />
    </div>
  );
}

export default App;
