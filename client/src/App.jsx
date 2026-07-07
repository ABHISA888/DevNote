import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';

/**
 * App.jsx — Root Application Shell
 *
 * WHY this stays minimal:
 * - App.jsx is the boundary between the browser mount (main.jsx) and the
 *   route system (AppRoutes.jsx). It should only hold concerns that affect
 *   the *entire* application equally — global styling, toast notifications,
 *   and future global providers (ThemeProvider, AuthProvider, QueryClient).
 *
 * WHY we removed the container wrapper:
 * - Authentication pages (Login, Signup) are designed as full-viewport
 *   split-screen layouts. Wrapping them in a constrained container would
 *   break their layout. Each page is responsible for its own layout context.
 */
function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      <AppRoutes />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid rgba(99,102,241,0.2)',
            fontSize: '0.875rem',
          },
        }}
      />
    </div>
  );
}

export default App;
