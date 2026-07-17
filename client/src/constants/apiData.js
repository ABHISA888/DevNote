/**
 * apiData.js — Dummy API documentation data for DevNote API Workspace.
 *
 * This is purely frontend dummy data. No backend, no axios, no API calls.
 * This file represents the "Project API Catalog" for the API documentation tab.
 */

export const API_COLLECTIONS = [
  { id: 'auth',     name: 'Authentication', icon: 'lock',     count: 3 },
  { id: 'users',    name: 'Users',          icon: 'user',     count: 3 },
  { id: 'projects', name: 'Projects',       icon: 'folder',   count: 2 },
  { id: 'tasks',    name: 'Tasks',          icon: 'check',    count: 2 },
  { id: 'notes',    name: 'Notes',          icon: 'file',     count: 2 },
  { id: 'settings', name: 'Settings',       icon: 'settings', count: 1 },
];

export const API_ENDPOINTS = [
  // ─── Authentication ────────────────────────────────────────────────────────
  {
    id: 'auth-login',
    collectionId: 'auth',
    method: 'POST',
    name: 'Login API',
    url: '/api/auth/login',
    description: 'Authenticate a user using their email and password. Returns a signed JWT bearer token valid for 24 hours. Used as the primary entry point for all client sessions.',
    headers: [
      { key: 'Content-Type', value: 'application/json', required: true },
      { key: 'Accept', value: 'application/json', required: true },
    ],
    requestBody: `{
  "email": "john@example.com",
  "password": "••••••••••"
}`,
    responseBody: `{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr_1029",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}`,
    note: 'Returns a JWT bearer token. Store securely and attach to all subsequent requests via Authorization header.',
  },
  {
    id: 'auth-register',
    collectionId: 'auth',
    method: 'POST',
    name: 'Register User',
    url: '/api/auth/register',
    description: 'Create a new user account. Triggers a verification email to the provided address. Username must be unique across the platform.',
    headers: [
      { key: 'Content-Type', value: 'application/json', required: true },
    ],
    requestBody: `{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "StrongP@ss123",
  "username": "janesmith"
}`,
    responseBody: `{
  "success": true,
  "message": "Account created. Check your email to verify.",
  "userId": "usr_1030"
}`,
    note: 'Verification email expires in 24 hours. Resend endpoint: POST /api/auth/resend-verification',
  },
  {
    id: 'auth-logout',
    collectionId: 'auth',
    method: 'POST',
    name: 'Logout',
    url: '/api/auth/logout',
    description: 'Invalidate the current session token and clear the refresh token cookie. Should be called on user-initiated sign-out.',
    headers: [
      { key: 'Authorization', value: 'Bearer <token>', required: true },
      { key: 'Content-Type', value: 'application/json', required: true },
    ],
    requestBody: null,
    responseBody: `{
  "success": true,
  "message": "Logged out successfully."
}`,
    note: 'After this call, the provided token becomes invalid. Client should clear local storage.',
  },

  // ─── Users ─────────────────────────────────────────────────────────────────
  {
    id: 'users-list',
    collectionId: 'users',
    method: 'GET',
    name: 'Get All Users',
    url: '/api/users',
    description: 'Retrieve a paginated list of all users in the system. Supports filtering by role, status, and search query. Admin-only route.',
    headers: [
      { key: 'Authorization', value: 'Bearer <token>', required: true },
      { key: 'Accept', value: 'application/json', required: true },
    ],
    requestBody: null,
    responseBody: `{
  "success": true,
  "count": 142,
  "page": 1,
  "data": [
    {
      "id": "usr_001",
      "name": "Alice Kim",
      "email": "alice@example.com",
      "role": "admin",
      "status": "active"
    },
    {
      "id": "usr_002",
      "name": "Bob Chen",
      "email": "bob@example.com",
      "role": "member",
      "status": "active"
    }
  ]
}`,
    note: 'Use ?page=2&limit=20 query params for pagination. Default limit is 10.',
  },
  {
    id: 'users-profile',
    collectionId: 'users',
    method: 'GET',
    name: 'Get Current User',
    url: '/api/users/me',
    description: "Fetch the authenticated user's own profile, preferences, and account metadata. Use this to populate user dashboards and profile settings pages.",
    headers: [
      { key: 'Authorization', value: 'Bearer <token>', required: true },
    ],
    requestBody: null,
    responseBody: `{
  "success": true,
  "data": {
    "id": "usr_1029",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://cdn.example.com/avatars/usr_1029.jpg",
    "role": "admin",
    "createdAt": "2024-01-15T09:32:00Z"
  }
}`,
    note: 'This endpoint uses the token from the Authorization header — no userId required in URL.',
  },
  {
    id: 'users-update',
    collectionId: 'users',
    method: 'PUT',
    name: 'Update User Profile',
    url: '/api/users/:id',
    description: 'Update a user profile by ID. Fields not provided in the request body remain unchanged. Only the user themselves or an admin may perform this action.',
    headers: [
      { key: 'Authorization', value: 'Bearer <token>', required: true },
      { key: 'Content-Type', value: 'application/json', required: true },
    ],
    requestBody: `{
  "name": "John Updated",
  "bio": "Senior backend engineer at DevNote.",
  "avatar": "https://cdn.example.com/new-avatar.jpg"
}`,
    responseBody: `{
  "success": true,
  "message": "Profile updated successfully.",
  "data": {
    "id": "usr_1029",
    "name": "John Updated",
    "bio": "Senior backend engineer at DevNote."
  }
}`,
    note: 'Password changes must be done via a separate PATCH /api/users/:id/password endpoint.',
  },

  // ─── Projects ──────────────────────────────────────────────────────────────
  {
    id: 'projects-list',
    collectionId: 'projects',
    method: 'GET',
    name: 'Get Projects',
    url: '/api/projects',
    description: 'Return all projects belonging to or shared with the current authenticated user. Supports filtering by status and sorting by deadline or updated date.',
    headers: [
      { key: 'Authorization', value: 'Bearer <token>', required: true },
    ],
    requestBody: null,
    responseBody: `{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": "proj_001",
      "name": "DevNote Platform",
      "status": "Active",
      "deadline": "2024-12-01",
      "membersCount": 5
    }
  ]
}`,
    note: 'Archived projects are excluded by default. Use ?include=archived to include them.',
  },
  {
    id: 'projects-update',
    collectionId: 'projects',
    method: 'PUT',
    name: 'Update Project',
    url: '/api/projects/:id',
    description: 'Update project metadata including name, status, description, deadline, and tech stack. Only the project owner or members with Editor role can perform this action.',
    headers: [
      { key: 'Authorization', value: 'Bearer <token>', required: true },
      { key: 'Content-Type', value: 'application/json', required: true },
    ],
    requestBody: `{
  "name": "DevNote Platform v2",
  "status": "In Progress",
  "description": "Next generation DevNote with real-time collaboration.",
  "deadline": "2025-03-15"
}`,
    responseBody: `{
  "success": true,
  "message": "Project updated.",
  "data": {
    "id": "proj_001",
    "name": "DevNote Platform v2",
    "status": "In Progress"
  }
}`,
    note: 'Changing project status to "Archived" is irreversible via this endpoint. Use the dedicated archive route.',
  },

  // ─── Tasks ─────────────────────────────────────────────────────────────────
  {
    id: 'tasks-create',
    collectionId: 'tasks',
    method: 'POST',
    name: 'Create Task',
    url: '/api/tasks',
    description: 'Create a new task within a project. Task must be assigned to a valid projectId. Optionally assign to a team member and set a due date.',
    headers: [
      { key: 'Authorization', value: 'Bearer <token>', required: true },
      { key: 'Content-Type', value: 'application/json', required: true },
    ],
    requestBody: `{
  "projectId": "proj_001",
  "title": "Implement API documentation page",
  "description": "Build the full API workspace UI for the DevNote workspace.",
  "priority": "High",
  "assigneeId": "usr_1029",
  "dueDate": "2024-11-20"
}`,
    responseBody: `{
  "success": true,
  "data": {
    "id": "task_4821",
    "title": "Implement API documentation page",
    "status": "Todo",
    "priority": "High",
    "createdAt": "2024-10-30T14:22:00Z"
  }
}`,
    note: 'Status defaults to "Todo" on creation. Use PATCH /api/tasks/:id/status to transition through the workflow.',
  },
  {
    id: 'tasks-delete',
    collectionId: 'tasks',
    method: 'DELETE',
    name: 'Delete Task',
    url: '/api/tasks/:id',
    description: 'Permanently delete a task by its ID. This action is irreversible and will also remove all comments and attachments associated with the task.',
    headers: [
      { key: 'Authorization', value: 'Bearer <token>', required: true },
    ],
    requestBody: null,
    responseBody: `{
  "success": true,
  "message": "Task task_4821 deleted successfully."
}`,
    note: 'Only the task creator or a project admin can delete tasks. Deleted tasks cannot be recovered.',
  },

  // ─── Notes ─────────────────────────────────────────────────────────────────
  {
    id: 'notes-create',
    collectionId: 'notes',
    method: 'POST',
    name: 'Create Note',
    url: '/api/notes',
    description: 'Create a new note within a project. Notes support rich-text content. Pinned notes appear at the top of the notes list.',
    headers: [
      { key: 'Authorization', value: 'Bearer <token>', required: true },
      { key: 'Content-Type', value: 'application/json', required: true },
    ],
    requestBody: `{
  "projectId": "proj_001",
  "title": "Architecture Decision Record",
  "content": "<p>We decided to use PostgreSQL for the primary datastore...</p>",
  "isPinned": true
}`,
    responseBody: `{
  "success": true,
  "data": {
    "id": "note_991",
    "title": "Architecture Decision Record",
    "isPinned": true,
    "createdAt": "2024-10-30T15:00:00Z"
  }
}`,
    note: 'Content field accepts HTML from the rich-text editor. Plain text is also accepted.',
  },
  {
    id: 'notes-delete',
    collectionId: 'notes',
    method: 'DELETE',
    name: 'Delete Note',
    url: '/api/notes/:id',
    description: 'Permanently delete a note by its ID. Once deleted, the note and all its content is unrecoverable. Only the author or project admin can delete notes.',
    headers: [
      { key: 'Authorization', value: 'Bearer <token>', required: true },
    ],
    requestBody: null,
    responseBody: `{
  "success": true,
  "message": "Note note_991 deleted successfully."
}`,
    note: 'Deletion cascades — any comments or attachments on this note are also removed.',
  },

  // ─── Settings ──────────────────────────────────────────────────────────────
  {
    id: 'settings-update',
    collectionId: 'settings',
    method: 'PATCH',
    name: 'Update Project Settings',
    url: '/api/projects/:id/settings',
    description: 'Update project-level configuration including notification preferences, visibility, and feature toggles. Admin-only endpoint.',
    headers: [
      { key: 'Authorization', value: 'Bearer <token>', required: true },
      { key: 'Content-Type', value: 'application/json', required: true },
    ],
    requestBody: `{
  "notifications": {
    "onTaskComplete": true,
    "onDeadlineApproach": true,
    "emailDigest": "weekly"
  },
  "visibility": "team",
  "features": {
    "enableGithubSync": true,
    "enableApiDocs": true
  }
}`,
    responseBody: `{
  "success": true,
  "message": "Project settings updated.",
  "data": {
    "projectId": "proj_001",
    "visibility": "team",
    "updatedAt": "2024-10-30T16:00:00Z"
  }
}`,
    note: 'Changing visibility from "public" to "private" immediately restricts access for non-members.',
  },
];

export const API_STATS = [
  { id: 'total',    label: 'Total APIs',    value: 13, icon: 'box',     color: 'text-indigo-600' },
  { id: 'rest',     label: 'REST APIs',     value: 11, icon: 'server',  color: 'text-slate-500' },
  { id: 'graphql',  label: 'GraphQL',       value: 0,  icon: 'share2',  color: 'text-slate-500' },
  { id: 'webhooks', label: 'Webhooks',      value: 2,  icon: 'zap',     color: 'text-slate-500' },
];

export const METHOD_COLORS = {
  GET:    { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  POST:   { bg: 'bg-blue-100',   text: 'text-blue-700',    dot: 'bg-blue-500'   },
  PUT:    { bg: 'bg-amber-100',  text: 'text-amber-700',   dot: 'bg-amber-500'  },
  PATCH:  { bg: 'bg-purple-100', text: 'text-purple-700',  dot: 'bg-purple-500' },
  DELETE: { bg: 'bg-red-100',    text: 'text-red-700',     dot: 'bg-red-500'    },
};

export const METHOD_OPTIONS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export const COLLECTION_OPTIONS = [
  'Authentication',
  'Users',
  'Projects',
  'Tasks',
  'Notes',
  'Settings',
];

// Map display name → collection id
export const COLLECTION_NAME_TO_ID = {
  Authentication: 'auth',
  Users:          'users',
  Projects:       'projects',
  Tasks:          'tasks',
  Notes:          'notes',
  Settings:       'settings',
};
