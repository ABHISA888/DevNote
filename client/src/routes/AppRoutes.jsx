import { Routes, Route } from 'react-router-dom';

// ─── Public Pages ─────────────────────────────────────────────────────────────
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import ContactPage from '../pages/contact/ContactPage';

// ─── App Pages & Layout ───────────────────────────────────────────────────────
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPage from '../pages/dashboard/DashboardPage';
import WorkspacePage from '../pages/workspace/WorkspacePage';
import ProfilePage from '../pages/profile/ProfilePage';
import SettingsPage from '../pages/settings/SettingsPage';
import NotificationsPage from '../pages/notifications/NotificationsPage';
import ProjectsPage from '../pages/projects/ProjectsPage';
import TasksPage from '../pages/tasks/TasksPage';

// ─── Project Workspace (full-screen, own chrome) ──────────────────────────────
import ProjectWorkspacePage from '../pages/workspace/ProjectWorkspacePage';

// ─── Fallback ──────────────────────────────────────────────────────────────────
import NotFoundPage from '../pages/not-found/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Public full-screen routes (no shell) ── */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* ── Project Workspace (outside DashboardLayout — has its own header) ── */}
      <Route path="/project/:projectId" element={<ProjectWorkspacePage />} />

      {/* ── Interior app routes (Dashboard Layout Shell) ──── */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/workspace/:workspaceId" element={<WorkspacePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* ── Feature Modules ── */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/tasks" element={<TasksPage />} />

        {/* ── Placeholder routes ── */}
        <Route path="/notes" element={<div className="p-8 text-slate-500 font-semibold">Notes — Coming Soon</div>} />
        <Route path="/apis" element={<div className="p-8 text-slate-500 font-semibold">APIs — Coming Soon</div>} />
        <Route path="/env" element={<div className="p-8 text-slate-500 font-semibold">Environment Variables — Coming Soon</div>} />
        <Route path="/favorites" element={<div className="p-8 text-slate-500 font-semibold">Favorites — Coming Soon</div>} />
      </Route>

      {/* ── Wildcard 404 ─────────────────────────── */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
