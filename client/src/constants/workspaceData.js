/**
 * workspaceData.js — Mock data for the Project Workspace Overview
 *
 * 🎓 TEACHING MOMENT: Why a separate constants file?
 * Products like GitHub, Linear, and Jira load project data from REST APIs:
 *   GET /api/projects/:projectId
 *   GET /api/projects/:projectId/activity
 *   GET /api/projects/:projectId/deadlines
 *
 * By isolating all data here, your backend developer only needs to:
 * 1. Create an API that returns the same shape as these objects
 * 2. Replace the static import with a `useFetchProject(projectId)` hook
 * Zero changes to the component tree needed.
 */

import {
  CheckCircle2,
  GitPullRequest,
  Rocket,
  Code2,
  Users,
  Activity,
} from 'lucide-react';

// ─── Project Info ─────────────────────────────────────────────────────────────
export const PROJECT_INFO = {
  id: 'neural-api-gateway',
  name: 'Neural API Gateway',
  initials: 'NA',
  initialsColor: 'bg-indigo-100 text-indigo-700',
  status: 'ACTIVE',
  description:
    'High-performance Rust-based routing engine for core infrastructure.',
  isFavorite: false,
  fullDescription:
    'The Neural API Gateway serves as the centralized entry point for all internal microservices. It handles protocol translation between gRPC and REST, implements dynamic rate-limiting via Redis, and provides distributed tracing across the cluster. Currently in v2.4 development focusing on zero-copy serialization and enhanced security headers.',
  tags: ['Infrastructure', 'High Priority', 'Internal'],
  tagStyles: {
    Infrastructure: 'bg-slate-100 text-slate-600 border-slate-200',
    'High Priority': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    Internal: 'bg-slate-100 text-slate-600 border-slate-200',
  },
};

// ─── Project Statistics ───────────────────────────────────────────────────────
export const PROJECT_STATS = [
  { id: 'status',    label: 'STATUS',     value: 'Active',       valueColor: 'text-emerald-600' },
  { id: 'progress',  label: 'PROGRESS',   value: '75%',          valueColor: 'text-slate-800' },
  { id: 'tasks',     label: 'TASKS',      value: '12/16',        valueColor: 'text-slate-800' },
  { id: 'days',      label: 'DAYS LEFT',  value: '4',            valueColor: 'text-amber-600' },
  { id: 'stack',     label: 'STACK',      value: 'Rust, gRPC',   valueColor: 'text-slate-800' },
  { id: 'updated',   label: 'UPDATED',    value: '2h ago',       valueColor: 'text-slate-800' },
];

// ─── Workspace Tabs ───────────────────────────────────────────────────────────
export const WORKSPACE_TABS = [
  { id: 'overview',     label: 'Overview',             path: 'overview' },
  { id: 'tasks',        label: 'Tasks',                path: 'tasks' },
  { id: 'notes',        label: 'Notes',                path: 'notes' },
  { id: 'apis',         label: 'APIs',                 path: 'apis' },
  { id: 'environment',  label: 'Env Vars',             path: 'environment' },
  { id: 'settings',     label: 'Settings',             path: 'settings' },
];

// ─── Completion / Module Progress ─────────────────────────────────────────────
export const COMPLETION_DATA = {
  overallPercent: 75,
  modules: [
    { id: 1, name: 'Core Engine',       progress: 90, color: 'bg-emerald-500' },
    { id: 2, name: 'Auth Integration',  progress: 55, color: 'bg-indigo-500' },
  ],
};

// ─── Upcoming Deadlines ───────────────────────────────────────────────────────
export const UPCOMING_DEADLINES = [
  { id: 1, title: 'API v2.4 Release',      dueDate: 'Oct 24, 2023', isPrimary: true },
  { id: 2, title: 'Auth Refactor Final',   dueDate: 'Nov 02, 2023', isPrimary: false },
];

// ─── Recent Activity ──────────────────────────────────────────────────────────
export const RECENT_ACTIVITY = [
  {
    id: 1,
    icon: CheckCircle2,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Sarah Jenkins completed task',
    highlight: '"Fix memory leak in buffer pool"',
    time: '22 minutes ago',
  },
  {
    id: 2,
    icon: Code2,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    title: 'Dev Bot added new endpoint',
    highlight: 'POST /v2/token/refresh',
    isCode: true,
    time: '1 hour ago',
  },
  {
    id: 3,
    icon: Rocket,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Deployment successful on Production-Cluster-A',
    highlight: null,
    time: '2 hours ago',
  },
];

// ─── Health Score ─────────────────────────────────────────────────────────────
export const HEALTH_SCORE = {
  score: 'Excellent',
  riskLabel: '↓ Low Risk Index',
  docsStatus: 'Updated',
};

// ─── Task Snapshot ────────────────────────────────────────────────────────────
export const TASK_SNAPSHOT = [
  { id: 'todo',        label: 'Todo',        value: 4,  color: 'text-slate-700' },
  { id: 'inprogress',  label: 'In Progress', value: 8,  color: 'text-indigo-600' },
  { id: 'endpoints',   label: 'Endpoints',   value: 12, color: 'text-emerald-600' },
];

// ─── Technology Stack ─────────────────────────────────────────────────────────
export const TECH_STACK = [
  { id: 1, name: 'Rust',        color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 2, name: 'gRPC',        color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 3, name: 'Kubernetes',  color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 4, name: 'Redis',       color: 'bg-red-50 text-red-700 border-red-200' },
];

// ─── Team Members ─────────────────────────────────────────────────────────────
export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Elena Rodriguez',
    role: 'Owner & Architect',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=c7d2fe',
  },
  {
    id: 2,
    name: 'James Wilson',
    role: 'Backend Engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=ddd6fe',
  },
  {
    id: 3,
    name: 'Jordan Kyosho',
    role: 'Product Designer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan&backgroundColor=e2e8f0',
  },
];
