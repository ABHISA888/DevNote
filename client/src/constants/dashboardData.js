import { 
  FolderGit2, 
  CheckCircle2, 
  Clock, 
  Star, 
  Rocket,
  GitPullRequest,
  CheckCircle,
  LayoutDashboard,
  CheckSquare,
  FileText,
  Code2,
  Database,
  Settings,
  Target
} from 'lucide-react';

export const SIDEBAR_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'projects', label: 'Projects', icon: FolderGit2, path: '/projects' },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, path: '/tasks' },
  { id: 'notes', label: 'Notes', icon: FileText, path: '/notes' },
  { id: 'apis', label: 'APIs', icon: Code2, path: '/apis' },
  { id: 'env', label: 'Environment Variables', icon: Database, path: '/env' },
  { id: 'favorites', label: 'Favorites', icon: Star, path: '/favorites' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

export const STATS = [
  { id: 'total', label: 'TOTAL PROJECTS', value: '12', metaText: '+2 new', metaColor: 'text-primary-600' },
  { id: 'active', label: 'ACTIVE', value: '8', type: 'progress', progressValue: 65 },
  { id: 'completed', label: 'COMPLETED', value: '24', icon: CheckCircle2, iconColor: 'text-primary-600' },
  { id: 'deadlines', label: 'DEADLINES', value: '3', metaText: 'Critical', metaColor: 'text-red-500' },
  { id: 'tasks', label: 'TASKS', value: '15', metaText: 'Pending', metaColor: 'text-slate-500' },
  { id: 'favorites', label: 'FAVORITES', value: '5', icon: Star, iconColor: 'text-primary-600', fill: true },
];

export const UPCOMING_DEADLINES = [
  {
    id: 1,
    title: 'Cloud Dashboard Migration',
    timeLabel: 'Tomorrow',
    timeColor: 'text-red-500',
    progressPercent: 85,
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    id: 2,
    title: 'CLI Tool Refactoring',
    timeLabel: 'In 3 days',
    timeColor: 'text-slate-400',
    progressPercent: 40,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-500',
  },
];

export const PINNED_PROJECTS = [
  {
    id: 1,
    title: 'DevLaunch v3',
    badges: ['REACT', 'GO'],
    progressPercent: 72,
  },
  {
    id: 2,
    title: 'DataSphere Analytics',
    badges: ['NODE.JS', 'REACT'],
    progressPercent: 45,
  },
];

export const RECENT_ACTIVITY = [
  {
    id: 1,
    title: 'Successfully deployed v2.4.1-stable to Production',
    time: '12 minutes ago',
    category: 'Deployment',
    icon: Rocket,
    iconBg: 'bg-primary-600',
    iconColor: 'text-white',
  },
  {
    id: 2,
    title: 'Updated API Documentation for Auth Module',
    time: '2 hours ago',
    category: 'API Update',
    icon: Target,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-400',
  },
  {
    id: 3,
    title: 'Merged Pull Request #442: Fix mobile nav',
    time: '4 hours ago',
    category: 'Task Completed',
    icon: CheckCircle,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-400',
  },
];

export const PRODUCTIVITY_INSIGHTS = {
  completedThisMonth: 4,
  currentStreak: 12,
  quote: '"The only way to do great work is to love what you do. Stay focused, Harshu."',
};

export const RECENT_PROJECTS = [
  {
    id: 1,
    title: 'NeoStock Portfolio',
    description: 'A high-frequency trading simulation engine with...',
    badges: ['Rust', 'Wasm'],
    thumbnailColor: 'bg-primary-50',
  },
  {
    id: 2,
    title: 'PyLens AI',
    description: 'Computer vision library for identifying hardware...',
    badges: ['Python', 'PyTorch'],
    thumbnailColor: 'bg-primary-50',
  },
  {
    id: 3,
    title: 'Orbit Sync',
    description: 'Distributed database synchronization tool for...',
    badges: ['Go', 'gRPC'],
    thumbnailColor: 'bg-blue-50',
  },
  {
    id: 4,
    title: 'Vivid UI Kit',
    description: 'Internal design system for DevLaunch with...',
    badges: ['Tailwind', 'Next.js'],
    thumbnailColor: 'bg-orange-50',
  },
];
