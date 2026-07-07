/**
 * tasksData.js — Mock data for the Tasks Management Module
 *
 * 🎓 TEACHING MOMENT: Why a separate constants file?
 * In real apps like Linear or Jira, this data would come from a REST API like:
 *   GET /api/tasks?projectId=devlaunch-core
 *
 * By isolating data here, the backend developer only needs to replace this static
 * array with a `useFetchTasks()` hook — ZERO changes to the component tree needed.
 *
 * STRUCTURE CONTRACT:
 * Each task object matches exactly one <TaskRow /> component's expected props.
 */

export const TASKS = [
  {
    id: 'DL-102',
    name: 'Implement JWT Authentication',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    dueDate: 'Oct 24, 2023',
    progress: 65,
    isSelected: true,
    assignees: [
      { id: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice&backgroundColor=c7d2fe' },
      { id: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob&backgroundColor=ddd6fe' },
    ],
    additionalAssignees: 0,
  },
  {
    id: 'DL-105',
    name: 'Redesign Dashboard Bento Grid',
    priority: 'MEDIUM',
    status: 'TODO',
    dueDate: 'Oct 28, 2023',
    progress: 0,
    isSelected: false,
    assignees: [
      { id: 3, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie&backgroundColor=c7d2fe' },
    ],
    additionalAssignees: 0,
  },
  {
    id: 'DL-98',
    name: 'Database Migration - V3',
    priority: 'HIGH',
    status: 'TODO',
    dueDate: 'Oct 30, 2023',
    progress: 12,
    isSelected: false,
    assignees: [],
    additionalAssignees: 3,
  },
  {
    id: 'DL-94',
    name: 'API Documentation Update',
    priority: 'LOW',
    status: 'DONE',
    dueDate: 'Oct 20, 2023',
    progress: 100,
    isSelected: true,
    assignees: [
      { id: 4, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=c7d2fe' },
    ],
    additionalAssignees: 0,
  },
];

export const TASK_PROJECTS = [
  { value: 'devlaunch-core', label: 'DevLaunch Core' },
  { value: 'portfolio', label: 'Portfolio Website' },
  { value: 'nexus-api', label: 'Nexus API Gateway' },
  { value: 'expense', label: 'Expense Tracker' },
];

export const TASK_TOTAL_COUNT = 24;
export const TASK_CURRENT_PAGE_COUNT = TASKS.length;
