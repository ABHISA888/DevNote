import { Rocket, BrainCircuit, Star } from 'lucide-react';

export const PROJECT_STATS = [
  { id: 'total', label: 'TOTAL', value: '24' },
  { id: 'active', label: 'ACTIVE', value: '12', valueColor: 'text-primary-600' },
  { id: 'completed', label: 'COMPLETED', value: '8' },
  { id: 'archived', label: 'ARCHIVED', value: '4' },
  { id: 'favorites', label: 'FAVORITES', value: '6', icon: Star, iconColor: 'text-primary-600', fill: true },
];

export const PINNED_PROJECTS = [
  {
    id: 1,
    title: 'DevLaunch Core',
    description: 'The main infrastructure and dashboard engine for the platform.',
    badges: ['REACT', 'TYPESCRIPT'],
    icon: Rocket,
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-600',
    isPinned: true,
  },
  {
    id: 2,
    title: 'AI Resume Builder',
    description: 'Intelligent career document generator using GPT-4 models.',
    badges: ['NEXT.JS', 'OPENAI'],
    icon: BrainCircuit,
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-600',
    isPinned: false,
  },
];

export const RECENTLY_EDITED = [
  { id: 1, title: 'DevLaunch Core', time: '24 minutes ago', initials: 'DL', color: 'bg-primary-100 text-primary-700' },
  { id: 2, title: 'Portfolio Website', time: '2 hours ago', initials: 'PW', color: 'bg-blue-100 text-blue-700' },
  { id: 3, title: 'Expense Tracker', time: 'yesterday', initials: 'ET', color: 'bg-slate-100 text-slate-700' },
];

export const STACK_OVERVIEW = [
  { id: 1, language: 'JavaScript/TS', percentage: 65, color: 'bg-primary-600' },
  { id: 2, language: 'Python', percentage: 20, color: 'bg-slate-300' },
  { id: 3, language: 'Other', percentage: 15, color: 'bg-slate-800' },
];

export const ALL_PROJECTS = [
  {
    id: 'devlaunch',
    title: 'DevLaunch',
    initials: 'DL',
    initialsColor: 'bg-primary-50 text-primary-600 border-primary-100',
    lastUpdated: 'Updated 2d ago',
    isFavorite: true,
    description: 'The primary platform for managing developer workflows and deployment pipelines.',
    badges: ['React', 'Tailwind', 'Firebase'],
    progress: 85,
    members: [{ id: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice&backgroundColor=e2e8f0' }],
    additionalMembers: 2,
    status: 'ACTIVE',
    statusColor: 'bg-primary-50 text-primary-600',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    initials: 'PW',
    initialsColor: 'bg-slate-50 text-slate-600 border-slate-100',
    lastUpdated: 'Updated 1d ago',
    isFavorite: false,
    description: 'Personal portfolio site showcasing development skills and open-source contributions.',
    badges: ['Next.js', 'Framer Motion'],
    progress: 100,
    members: [{ id: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob&backgroundColor=e2e8f0' }],
    additionalMembers: 0,
    status: 'COMPLETED',
    statusColor: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'expense',
    title: 'Expense Tracker',
    initials: 'ET',
    initialsColor: 'bg-primary-50 text-primary-600 border-primary-100',
    lastUpdated: 'Updated 5d ago',
    isFavorite: true,
    description: 'Mobile-first financial dashboard with automated receipt scanning features.',
    badges: ['React Native', 'Node.js'],
    progress: 45,
    members: [{ id: 3, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie&backgroundColor=e2e8f0' }],
    additionalMembers: 0,
    status: 'ACTIVE',
    statusColor: 'bg-primary-50 text-primary-600',
  },
  {
    id: 'chat',
    title: 'Chat Application',
    initials: 'CA',
    initialsColor: 'bg-primary-50 text-primary-600 border-primary-100',
    lastUpdated: 'Updated 5d ago',
    isFavorite: false,
    description: 'Real-time collaboration tool with end-to-end encryption and file sharing.',
    badges: ['Socket.io', 'Redis'],
    progress: 20,
    members: [{ id: 4, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=e2e8f0' }],
    additionalMembers: 0,
    status: 'IN REVIEW',
    statusColor: 'bg-amber-50 text-amber-600',
  },
];
