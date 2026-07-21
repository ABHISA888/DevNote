import React, { useState, useEffect } from 'react';
import { Edit2, Check, Sun, Moon, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  // Profile State
  const [profileForm, setProfileForm] = useState({
    fullName: 'Alex Rivera',
    username: 'arivera_dev',
    email: 'alex.dev@workspace.com',
    bio: 'Full-stack developer passionate about building clean, efficient tools for creators. Currently focused on React and Go.',
    github: 'github.com/arivera',
  });

  // Appearance State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    toast.success('Successfully logged out');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-900 pb-12">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h1>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-200 dark:border-dark-700">
          <nav className="-mb-px flex space-x-8">
            {['Profile', 'Appearance'].map((tab) => {
              const tabId = tab.toLowerCase();
              const isActive = activeTab === tabId;
              return (
                <button
                  key={tabId}
                  onClick={() => setActiveTab(tabId)}
                  className={`relative whitespace-nowrap py-4 px-1 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                  }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-600 dark:bg-primary-400 rounded-t-full transition-all" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-dark-700 dark:bg-dark-800">
              <div className="flex flex-col md:flex-row">
                
                {/* Left Side: Avatar Card */}
                <div className="flex flex-col items-center justify-center border-b border-gray-100 bg-slate-50/50 p-8 md:w-1/3 md:border-b-0 md:border-r dark:border-dark-700 dark:bg-dark-800/50">
                  <div className="relative mb-5 h-32 w-32">
                    <div className="h-full w-full overflow-hidden rounded-full ring-4 ring-white shadow-sm dark:ring-dark-800">
                      <img 
                        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${profileForm.username}&backgroundColor=c0aede`} 
                        alt="Profile Avatar" 
                        className="h-full w-full object-cover bg-slate-200 dark:bg-dark-700"
                      />
                    </div>
                    <button 
                      type="button" 
                      className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-1 ring-gray-200 hover:bg-gray-50 hover:text-primary-600 transition dark:bg-dark-700 dark:text-slate-300 dark:ring-dark-600 dark:hover:text-primary-400"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{profileForm.fullName}</h3>
                  <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{profileForm.email}</p>
                </div>

                {/* Right Side: Editable Fields */}
                <div className="p-8 md:w-2/3">
                  <form onSubmit={handleSaveProfile} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={profileForm.fullName}
                          onChange={handleProfileChange}
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-dark-600 dark:bg-dark-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Username</label>
                        <input
                          type="text"
                          name="username"
                          value={profileForm.username}
                          onChange={handleProfileChange}
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-dark-600 dark:bg-dark-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-dark-600 dark:bg-dark-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Bio</label>
                      <textarea
                        name="bio"
                        rows="3"
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-slate-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-dark-600 dark:bg-dark-900 dark:text-white resize-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">GitHub Profile</label>
                      <input
                        type="text"
                        name="github"
                        value={profileForm.github}
                        onChange={handleProfileChange}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-dark-600 dark:bg-dark-900 dark:text-white"
                      />
                    </div>
                    
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-900"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <div className="space-y-8">
              
              {/* Appearance Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-dark-700 dark:bg-dark-800">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Appearance</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Customize the appearance of DevNote.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-3xl">
                  {/* Light Mode Preview */}
                  <div 
                    onClick={() => setTheme('light')}
                    className={`group cursor-pointer rounded-2xl border-2 p-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      theme === 'light' 
                        ? 'border-primary-500 bg-primary-50/50 shadow-md dark:bg-primary-900/10' 
                        : 'border-transparent bg-transparent hover:border-gray-200 dark:hover:border-dark-600'
                    }`}
                  >
                    <div className="h-48 w-full overflow-hidden rounded-xl bg-[#f8f9fe] border border-gray-200 shadow-sm relative p-4 flex flex-col gap-3">
                       <div className="flex items-center gap-1.5 mb-2">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                       </div>
                       <div className="h-3 w-1/3 bg-slate-200 rounded-full"></div>
                       <div className="h-16 w-full bg-white border border-gray-100 rounded-lg shadow-sm"></div>
                       <div className="flex gap-2">
                         <div className="h-8 w-1/2 bg-white border border-gray-100 rounded-lg shadow-sm"></div>
                         <div className="h-8 w-1/2 bg-white border border-gray-100 rounded-lg shadow-sm"></div>
                       </div>
                       
                       {theme === 'light' && (
                         <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-white shadow-md">
                           <Check size={16} strokeWidth={3} />
                         </div>
                       )}
                    </div>
                    <div className="mt-4 px-2 pb-2 text-center">
                      <span className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                        <Sun size={18} className={theme === 'light' ? 'text-primary-600' : 'text-slate-400'} /> 
                        Light Mode
                      </span>
                    </div>
                  </div>

                  {/* Dark Mode Preview */}
                  <div 
                    onClick={() => setTheme('dark')}
                    className={`group cursor-pointer rounded-2xl border-2 p-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      theme === 'dark' 
                        ? 'border-primary-500 bg-primary-50/50 shadow-md dark:bg-primary-900/10' 
                        : 'border-transparent bg-transparent hover:border-gray-200 dark:hover:border-dark-600'
                    }`}
                  >
                    <div className="h-48 w-full overflow-hidden rounded-xl bg-[#0f172a] border border-dark-600 shadow-sm relative p-4 flex flex-col gap-3">
                       <div className="flex items-center gap-1.5 mb-2">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                       </div>
                       <div className="h-3 w-1/3 bg-slate-700 rounded-full"></div>
                       <div className="h-16 w-full bg-[#1e293b] border border-dark-600 rounded-lg shadow-sm"></div>
                       <div className="flex gap-2">
                         <div className="h-8 w-1/2 bg-[#1e293b] border border-dark-600 rounded-lg shadow-sm"></div>
                         <div className="h-8 w-1/2 bg-[#1e293b] border border-dark-600 rounded-lg shadow-sm"></div>
                       </div>

                       {theme === 'dark' && (
                         <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-white shadow-md">
                           <Check size={16} strokeWidth={3} />
                         </div>
                       )}
                    </div>
                    <div className="mt-4 px-2 pb-2 text-center">
                      <span className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                        <Moon size={18} className={theme === 'dark' ? 'text-primary-400' : 'text-slate-400'} /> 
                        Dark Mode
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone Section */}
              <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm dark:border-red-900/30 dark:bg-dark-800">
                <h2 className="text-xl font-bold text-red-600 dark:text-red-400">Danger Zone</h2>
                
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-red-100 pt-6 dark:border-red-900/20">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">Logout from DevNote</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      You will need to log back in to access your workspace.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsLogoutDialogOpen(true)}
                    className="shrink-0 rounded-xl border-2 border-red-200 px-8 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20 dark:focus:ring-offset-dark-900"
                  >
                    Logout
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {isLogoutDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-dark-800">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <LogOut size={28} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Logout</h3>
              <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
                Are you sure you want to logout?
              </p>
              
              <div className="flex w-full flex-col gap-3">
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-dark-800"
                >
                  Logout
                </button>
                <button
                  onClick={() => setIsLogoutDialogOpen(false)}
                  className="w-full rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:bg-dark-700 dark:text-slate-300 dark:hover:bg-dark-600 dark:focus:ring-offset-dark-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
