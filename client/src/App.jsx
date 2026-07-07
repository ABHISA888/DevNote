import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      <main className="container mx-auto p-4 min-h-screen flex flex-col justify-between">
        <AppRoutes />
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
