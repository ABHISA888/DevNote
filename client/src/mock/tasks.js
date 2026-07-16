/**
 * 🎓 TEACHING MOMENT: mock/tasks.js
 * 
 * WHY THIS EXISTS:
 * A mock data file acts as a structural prototype for backend payloads.
 * By using correct types and matching names (keys), your frontend remains completely
 * backend-agnostic. When APIs are built, we replace this file with HTTP requests,
 * and components don't experience key/prop breaks.
 */

export const BOARD_TASKS = [
  {
    id: 'TSK-101',
    name: 'Implement JWT Authentication',
    description: 'Secure the gateway endpoint routes and add session token rotations.',
    priority: 'MEDIUM',
    status: 'TODO',
    labels: ['Node.js', 'Security'],
    assignees: [
      { id: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
      { id: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' }
    ],
    commentsCount: 4,
    attachmentsCount: 0,
    subtasksCompleted: 0,
    subtasksTotal: 3,
    dueDate: 'Oct 29, 2023',
    progress: 30
  },
  {
    id: 'TSK-102',
    name: 'Fix Navbar Bug on Safari',
    description: 'Resolve CSS flexbox alignment issues appearing specifically in Safari 16+ viewports.',
    priority: 'HIGH',
    status: 'TODO',
    labels: ['Safari', 'CSS'],
    assignees: [
      { id: 3, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' }
    ],
    commentsCount: 12,
    attachmentsCount: 1,
    subtasksCompleted: 0,
    subtasksTotal: 0,
    dueDate: 'Due Today',
    progress: 10
  },
  {
    id: 'TSK-103',
    name: 'Build Dashboard UI',
    description: 'Developing the core dashboard layouts and component library mapping.',
    priority: 'NORMAL',
    status: 'IN PROGRESS',
    labels: ['React', 'Tailwind'],
    assignees: [
      { id: 4, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }
    ],
    commentsCount: 3,
    attachmentsCount: 2,
    subtasksCompleted: 3,
    subtasksTotal: 5,
    dueDate: 'Oct 28, 2023',
    progress: 60
  },
  {
    id: 'TSK-104',
    name: 'Create MongoDB Models',
    description: 'Design schemas for users, projects, and tasks with indexes.',
    priority: 'NORMAL',
    status: 'REVIEW',
    labels: ['Database', 'MongoDB'],
    assignees: [
      { id: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' }
    ],
    commentsCount: 1,
    attachmentsCount: 0,
    subtasksCompleted: 1,
    subtasksTotal: 1,
    dueDate: 'Oct 27, 2023',
    progress: 90,
    badgeText: '2 Pending'
  },
  {
    id: 'TSK-105',
    name: 'Database Schema Design',
    description: 'Establish ERD diagrams and finalize relational tables for workspace configs.',
    priority: 'LOW',
    status: 'COMPLETED',
    labels: ['SQL', 'Design'],
    assignees: [
      { id: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' }
    ],
    commentsCount: 0,
    attachmentsCount: 0,
    subtasksCompleted: 4,
    subtasksTotal: 4,
    dueDate: 'Finished Oct 12',
    progress: 100
  }
];

export const TASK_STATS = [
  { id: 'total', label: 'Total Tasks', value: '24' },
  { id: 'todo', label: 'Todo', value: '5', valueColor: 'text-slate-600' },
  { id: 'inprogress', label: 'In Progress', value: '4', valueColor: 'text-primary-600' },
  { id: 'review', label: 'Review', value: '1', valueColor: 'text-purple-500' },
  { id: 'completed', label: 'Completed', value: '14', valueColor: 'text-emerald-500' }
];

export const PRODUCTIVITY_METRICS = {
  streak: '12 Days',
  avgTime: '2.4h'
};

export const TASK_DEADLINES = [
  {
    id: 1,
    time: 'Today, 5:00 PM',
    taskName: 'Safari Navbar Fix',
    label: 'Critical Bugfix',
    colorClass: 'text-red-500'
  },
  {
    id: 2,
    time: 'Oct 24, 10:00 AM',
    taskName: 'Beta Release v0.4',
    label: 'Milestone Reach',
    colorClass: 'text-primary-600'
  },
  {
    id: 3,
    time: 'Oct 28',
    taskName: 'API Documentation',
    label: 'Documentation',
    colorClass: 'text-slate-400'
  }
];

export const LIVE_ACTIVITY = [
  { id: 1, message: 'CI/CD Pipeline succeeded in 2m 14s' },
  { id: 2, message: 'Jasmine assigned you to \'Create API Keys\'' },
  { id: 3, message: 'Jasmine assigned you to \'Create API Keys\'' },
  { id: 4, message: 'Jasmine assigned you to \'Create API Keys\'' }
];
