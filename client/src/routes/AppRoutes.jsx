import { Routes, Route } from 'react-router-dom';

// Public Pages
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import ContactPage from '../pages/contact/ContactPage';

// Protected / Dashboard Pages (SaaS core workspace)
import DashboardPage from '../pages/dashboard/DashboardPage';
import WorkspacePage from '../pages/workspace/WorkspacePage';
import ProfilePage from '../pages/profile/ProfilePage';
import SettingsPage from '../pages/settings/SettingsPage';
import NotificationsPage from '../pages/notifications/NotificationsPage';

// Fallback Page
import NotFoundPage from '../pages/not-found/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Workspace & Dashboard Core Pages */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/workspace/:workspaceId" element={<WorkspacePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />

      {/* Wildcard / Catch-all 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
