# FRONTEND_HANDOFF.md

## DevNote — Developer Workspace
### Frontend Architecture & Backend Integration Guide

> **Document Status:** Active
> **Document Version:** 1.0.0
> **Prepared By:** Frontend Engineering
> **Intended Audience:** Backend Engineers, New Team Members, Technical Leads
> **Last Updated:** July 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Folder Structure](#3-folder-structure)
4. [Application Flow](#4-application-flow)
5. [Completed Screens](#5-completed-screens)
6. [Current Status](#6-current-status)
7. [Mock Data](#7-mock-data)
8. [Routing](#8-routing)
9. [Component Architecture](#9-component-architecture)
10. [Backend Responsibilities](#10-backend-responsibilities)
11. [Expected API Structure](#11-expected-api-structure)
12. [Frontend Integration Guide](#12-frontend-integration-guide)
13. [Coding Standards](#13-coding-standards)
14. [Future Scope](#14-future-scope)
15. [Development Workflow](#15-development-workflow)

---

## 1. Project Overview

**DevNote** is a full-stack developer productivity platform inspired by Notion, Linear, GitHub Projects, Postman, and Vercel.

| Module | Purpose |
|---|---|
| **Projects** | Manage all developer projects in one place |
| **Tasks** | Kanban board for tracking development tasks |
| **Notes** | Markdown-based notes workspace |
| **APIs** | API documentation manager |
| **Environment Variables** | Secrets manager |
| **Settings** | User preferences and account management |

**Core Value Proposition:** Developers currently switch between 4-6 tools daily. DevNote provides all of this in one integrated workspace, scoped per project.

**Target Users:** Solo developers, small to mid-size engineering teams, full-stack developers who manage both frontend and backend configuration.

---

## 2. Tech Stack

### Frontend Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.x | UI framework |
| **Vite** | 5.x | Build tool and dev server |
| **Tailwind CSS** | 3.x | Utility-first CSS framework |
| **React Router DOM** | 6.x | Client-side routing (SPA) |
| **Axios** | 1.x | HTTP client (scaffolded, not active yet) |
| **Lucide React** | Latest | Icon library |
| **React Hot Toast** | Latest | Toast notification system |

### Expected Backend Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **MongoDB** | Primary database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **bcrypt** | Password hashing |

### Deployment (Planned)

| Service | Purpose |
|---|---|
| **Vercel / Netlify** | Frontend |
| **Railway / Render** | Backend |
| **MongoDB Atlas** | Cloud database |


---

## 3. Folder Structure

### Root Structure

```
DevNote/
+-- client/                   <- React frontend application
|   +-- public/
|   +-- src/
|       +-- App.jsx           <- Root component (global providers, toasts)
|       +-- main.jsx          <- React DOM entry point
|       +-- index.css         <- Global CSS reset and Tailwind directives
|       +-- assets/           <- Static assets (images, fonts)
|       +-- components/       <- All React UI components
|       +-- constants/        <- Static data, configuration arrays
|       +-- context/          <- React Context providers
|       +-- hooks/            <- Custom React hooks
|       +-- layouts/          <- Page layout shells
|       +-- mock/             <- Mock data (replaces backend temporarily)
|       +-- pages/            <- Page-level components (one per route)
|       +-- routes/           <- React Router route definitions
|       +-- services/         <- Axios API service functions
|       +-- styles/           <- Modular CSS files
|       +-- utils/            <- Pure helper functions
|   +-- package.json
|   +-- vite.config.js
+-- server/                   <- Backend (not yet implemented)
+-- FRONTEND_HANDOFF.md       <- This document
```

### `src/components/` — Organized by Domain

```
src/components/
+-- auth/             <- Login form, Signup form
+-- common/           <- Shared: Navbar, Sidebar, Footer, Loader, EmptyState, ErrorState
+-- dashboard/        <- Dashboard-specific: StatCard, ActivityItem, DeadlineCard, etc.
+-- forms/            <- Reusable form primitives
+-- landing/          <- Landing page sections: Hero, Features, Pricing, CTA
+-- projects/         <- Projects page + Create Project Wizard
|   +-- wizard/       <- 5-step wizard: BasicInfoStep, ConfigStep, IntegrationsStep, TimelineStep, ReviewStep
+-- tasks/            <- Global Tasks page components
+-- ui/               <- Atomic UI primitives: Modal, Dropdown, Badge
+-- workspace/        <- Project Workspace tab components
    +-- apis/         <- API documentation module (10 components)
    +-- environment/  <- Environment variables module (8 components)
    +-- notes/        <- Markdown notes module (9 components)
    +-- tasks/        <- Kanban board module (10 components)
```

### `src/pages/` — One File Per Route

```
src/pages/
+-- auth/             <- LoginPage, SignupPage
+-- contact/          <- ContactPage
+-- dashboard/        <- DashboardPage
+-- landing/          <- LandingPage
+-- not-found/        <- NotFoundPage (404)
+-- notifications/    <- NotificationsPage
+-- profile/          <- ProfilePage
+-- projects/         <- ProjectsPage
+-- settings/         <- SettingsPage
+-- tasks/            <- TasksPage (global task view)
+-- workspace/        <- ProjectWorkspacePage, WorkspacePage
```

### `src/layouts/` — Persistent Layout Shells

```
DashboardLayout.jsx  <- Sidebar + TopNavbar + <Outlet /> + Footer
                        Used by: Dashboard, Projects, Tasks, Settings, Profile, Notifications
PublicLayout.jsx     <- Minimal chrome for public pages
WorkspaceLayout.jsx  <- Reserved for future workspace-level layout
```

### `src/mock/` — API Response Blueprints

```
apis.js              -> Mirrors GET /api/projects/:id/collections
environment.js       -> Mirrors GET /api/projects/:id/env-vars
notes.js             -> Mirrors GET /api/projects/:id/notes
tasks.js             -> Mirrors GET /api/projects/:id/tasks
```

### `src/constants/` — Static UI Configuration (NOT replaced by backend)

```
dashboardData.js     <- Quick action links, stat card definitions
projectsData.js      <- Project status options, tech stack choices
routes.js            <- Route path constants
tasksData.js         <- Task priority/status label maps, filter options
workspaceData.js     <- Workspace tab definitions, sidebar nav items
```

### `src/services/api/` — Axios API Layer

```
axios.js             <- Axios instance with baseURL, JWT interceptors, 401 handler
(per module files to be added, e.g. projects.js, tasks.js, notes.js...)
```

---

## 4. Application Flow

```
[ UNAUTHENTICATED ]
Landing Page (/)  ->  Signup (/signup)  ->  Login (/login)

[ AUTHENTICATED ]
Dashboard (/dashboard)
    |-- Projects (/projects)
    |       |-- Project Grid
    |       +-- + New Project -> CreateProjectWizard (5-step modal)
    |               Step 1: Basic Info (name, description, color, icon)
    |               Step 2: Configuration (type, visibility, stack)
    |               Step 3: Integrations (GitHub, CI/CD)
    |               Step 4: Timeline (start/end dates, milestones)
    |               Step 5: Review & Create
    |
    +-- Project Workspace (/project/:projectId)
            Overview Tab   -> Project stats, health score, team, activity
            Tasks Tab      -> Kanban board (Todo, In Progress, Review, Done)
            Notes Tab      -> Markdown editor with preview and autosave
            APIs Tab       -> API collection browser and endpoint viewer
            Env Vars Tab   -> Secrets manager with masked values
```

---

## 5. Completed Screens

| # | Screen | Route | Status |
|---|---|---|---|
| 1 | Landing Page | `/` | COMPLETE |
| 2 | Login Page | `/login` | COMPLETE |
| 3 | Signup Page | `/signup` | COMPLETE |
| 4 | Dashboard | `/dashboard` | COMPLETE |
| 5 | Projects Page | `/projects` | COMPLETE |
| 6 | Create Project Wizard | Modal from `/projects` | COMPLETE |
| 7 | Project Workspace — Overview | `/project/:id` | COMPLETE |
| 8 | Project Workspace — Tasks | `/project/:id` Tasks tab | COMPLETE |
| 9 | Project Workspace — Notes | `/project/:id` Notes tab | COMPLETE |
| 10 | Project Workspace — APIs | `/project/:id` APIs tab | COMPLETE |
| 11 | Project Workspace — Env Vars | `/project/:id` Env Vars tab | COMPLETE |
| 12 | Settings Page | `/settings` | COMPLETE |
| 13 | Profile Page | `/profile` | COMPLETE |
| 14 | Notifications Page | `/notifications` | COMPLETE |
| 15 | Global Tasks Page | `/tasks` | COMPLETE |
| 16 | 404 Not Found | `/*` | COMPLETE |
| 17 | Contact Page | `/contact` | COMPLETE |

---

## 6. Current Status

> THE ENTIRE FRONTEND IS IMPLEMENTED USING STATIC MOCK DATA. NO REAL BACKEND INTEGRATION EXISTS YET.

### What Is Working (Frontend-Only)

- All UI screens are built and visually complete
- All navigation and routing works via React Router
- All CRUD operations mutate local useState only
- Search and filter logic operates on mock arrays in memory
- Axios client is scaffolded at `src/services/api/axios.js`
- Toast notifications display on user actions
- Responsive layouts work on desktop and mobile

### What Is NOT Working (Pending Backend)

- No real authentication — clicking Login navigates without validation
- No data persistence — refreshing the page resets all state
- No real user accounts or sessions
- No server-side search or filtering
- No real secrets encryption


---

## 7. Mock Data

### Philosophy
Mock data files are **contracts**. They define the exact shape of JSON the backend must return.
Treat each mock file as the API response specification for that module.

### How Components Consume Mock Data (Current)

```jsx
import { MOCK_VARIABLES, ENV_STATS } from '../../../mock/environment';

export default function EnvironmentTab() {
  const [variables, setVariables] = useState(MOCK_VARIABLES);
}
```

### How It Will Be Replaced (Future)

```jsx
import { getEnvVariables } from '../../../services/api/envVars';

export default function EnvironmentTab() {
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);
  const { projectId } = useParams();

  useEffect(() => {
    getEnvVariables(projectId)
      .then(setVariables)
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) return <Loader />;
}
```

### Mock Data Schemas

**mock/tasks.js — Individual Task**
```json
{
  "id": "task-1",
  "title": "Implement JWT Auth middleware",
  "status": "in-progress",
  "priority": "high",
  "labels": ["Backend", "Auth"],
  "assignees": [{ "id": "u1", "name": "Alice", "avatar": "..." }],
  "dueDate": "2024-01-15"
}
```

**Board structure:**
```json
{
  "todo": [task, task],
  "in-progress": [task],
  "review": [task],
  "done": [task, task]
}
```

**mock/notes.js**
```json
{
  "id": "note-1",
  "title": "Architecture Decisions",
  "content": "## Architecture\n\n...",
  "folder": "Technical Docs",
  "isPinned": false,
  "lastEdited": "2024-01-10T14:30:00Z",
  "wordCount": 342
}
```

**mock/apis.js — Collection**
```json
{ "id": "col-1", "name": "Authentication", "count": 4 }
```

**mock/apis.js — Endpoint**
```json
{
  "id": "ep-1",
  "collectionId": "col-1",
  "name": "User Login",
  "method": "POST",
  "path": "/api/auth/login",
  "description": "Authenticates a user and returns a JWT.",
  "requestBody": "{\n  \"email\": \"...\",\n  \"password\": \"...\"\n}",
  "responseBody": "{\n  \"token\": \"jwt...\",\n  \"user\": {...}\n}",
  "responseStatus": "200 OK",
  "responseTime": "142ms"
}
```

**mock/environment.js**
```json
{
  "id": "var-1",
  "key": "JWT_SECRET",
  "description": "System Token",
  "value": "sk_live_1234567890abcdef",
  "environments": ["DEV", "STG", "PRD"],
  "category": "Auth",
  "lastUpdated": "2 hrs ago"
}
```

---

## 8. Routing

| Route | Component | Layout | Auth Required |
|---|---|---|---|
| `/` | `LandingPage` | None | No |
| `/login` | `LoginPage` | None | No |
| `/signup` | `SignupPage` | None | No |
| `/contact` | `ContactPage` | None | No |
| `/dashboard` | `DashboardPage` | `DashboardLayout` | Yes |
| `/projects` | `ProjectsPage` | `DashboardLayout` | Yes |
| `/tasks` | `TasksPage` | `DashboardLayout` | Yes |
| `/profile` | `ProfilePage` | `DashboardLayout` | Yes |
| `/settings` | `SettingsPage` | `DashboardLayout` | Yes |
| `/notifications` | `NotificationsPage` | `DashboardLayout` | Yes |
| `/workspace/:workspaceId` | `WorkspacePage` | `DashboardLayout` | Yes |
| `/project/:projectId` | `ProjectWorkspacePage` | None (own chrome) | Yes |
| `*` | `NotFoundPage` | None | No |

### Important Route Notes

- Public routes (Landing, Login, Signup) use NO layout — full-screen standalone pages.
- Authenticated routes use `DashboardLayout` with persistent Sidebar + TopNavbar via `<Outlet />`.
- `/project/:projectId` uses its OWN header (`WorkspaceHeader`) and does NOT use `DashboardLayout`.
- Tab navigation within the workspace uses LOCAL `activeTab` state, not sub-routes.
  Future: migrate to URL params (`/project/:id?tab=tasks`) for deep-linking support.

### Route Guards (To Be Implemented by Backend Team)

```jsx
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
```

All `DashboardLayout` routes and `/project/:projectId` must be wrapped in `<ProtectedRoute>`.


---

## 9. Component Architecture

### 9.1 Dashboard

```
DashboardLayout
+-- Sidebar
|   +-- Logo
|   +-- NavItem[] (Dashboard, Projects, Tasks, Notes, APIs, Env Vars, Settings)
|   +-- Pinned Projects
|   +-- User Avatar / Logout
+-- TopNavbar
|   +-- Search Bar
|   +-- Notifications Bell
|   +-- User Avatar
+-- <Outlet /> -> DashboardPage
    +-- WelcomeSection (greeting, date)
    +-- StatsGrid
    |   +-- StatCard[] (Projects Count, Tasks Count, Notes Count, APIs Count)
    +-- RecentProjects
    |   +-- ProjectCard[]
    +-- QuickActions
    |   +-- ActionButton[]
    +-- ProductivityCard
    +-- UpcomingDeadlines
    |   +-- DeadlineCard[]
    +-- RecentActivity
    |   +-- ActivityItem[]
    +-- PinnedProjects
        +-- PinnedProjectCard[]
```

### 9.2 Projects Page

```
<Outlet /> -> ProjectsPage
+-- ProjectsHeader (title, + New Project button)
+-- StatsCards (Total, Active, Completed, Archived)
+-- ProjectsToolbar
|   +-- SearchBar
|   +-- Filter Dropdown (by status, category)
|   +-- View Toggle (Grid / List)
+-- PinnedProjects -> PinnedProjectCard[]
+-- ProjectGrid -> ProjectCard[] (name, status, stack, progress bar)
+-- FloatingActionButton (mobile CTA)
+-- CreateProjectWizard (Modal overlay)
    +-- StepIndicator (shows current step 1-5)
    +-- BasicInfoStep     (Step 1: name, description, color, emoji icon)
    +-- ConfigurationStep (Step 2: type, visibility, tech stack)
    +-- IntegrationsStep  (Step 3: GitHub repo, CI/CD config)
    +-- TimelineStep      (Step 4: start date, end date, milestones)
    +-- ReviewStep        (Step 5: summary preview + Create button)
```

### 9.3 Project Workspace — Full Detail

```
ProjectWorkspacePage
+-- WorkspaceHeader
|   +-- Back button -> /projects
|   +-- Project Title + Status Badge + Environment Badge
|   +-- Share / Settings actions
+-- WorkspaceTabs
|   +-- Tab[] (Overview | Tasks | Notes | APIs | Env Vars | Settings)
|
+-- [activeTab === 'overview'] Overview Content
|   +-- ProjectSummary (description, tags, dates)
|   +-- ProjectStats (tasks, notes, APIs, team size counts)
|   +-- HealthScoreCard (animated score ring)
|   +-- TaskSnapshotCard (mini kanban summary)
|   +-- TechnologyStackCard (tech stack chips)
|   +-- TeamMembersCard (avatar list)
|   +-- CompletionCard (module progress bars)
|   +-- UpcomingDeadlines (deadline list)
|   +-- RecentActivity (activity timeline)
|
+-- [activeTab === 'tasks'] TasksTab
|   +-- TaskHeader (title, description, share button)
|   +-- TaskStats (Total Tasks, Todo %, In Progress %, Done %)
|   +-- TaskFilters
|   |   +-- SearchBar (search by title)
|   |   +-- View Toggle (Board / List)
|   +-- KanbanBoard (3-column layout)
|       +-- KanbanColumn[] (Todo | In Progress | Review | Done)
|       |   +-- Column Header (title + task count)
|       |   +-- TaskCard[]
|       |       +-- Priority Badge (Low / Medium / High / Critical)
|       |       +-- Title + Description snippet
|       |       +-- Label Tags (array of color pills)
|       |       +-- Assignee Avatars
|       |       +-- Due Date
|       |       +-- Comment / Attachment counts
|       +-- Sidebar (right panel)
|           +-- ProductivityCard (weekly task completion chart)
|           +-- UpcomingDeadlinesCard (next 3 deadlines)
|           +-- LiveActivityCard (last 3 actions feed)
|
+-- [activeTab === 'notes'] NotesTab
|   +-- NotesSidebar (left panel)
|   |   +-- SearchBar (search notes by title/content)
|   |   +-- Folder List (group notes by folder)
|   |   +-- Pinned Notes -> NoteCard[]
|   |   +-- Recent Notes -> NoteCard[]
|   |       +-- NoteCard (title, last edited, pin icon)
|   +-- NoteEditor (main content area)
|       +-- Toolbar
|       |   +-- Format buttons (Bold, Italic, H1, H2, Code Block, List)
|       |   +-- Preview Toggle (Editor / Preview)
|       |   +-- Delete / Duplicate actions
|       +-- <textarea> (raw Markdown input)
|       +-- MarkdownPreview (rendered HTML from markdown string)
|       +-- Footer bar (Word Count, AutoSave indicator, Last Edited)
|
+-- [activeTab === 'apis'] ApisTab
|   +-- ApiHeader
|   |   +-- Import Collection button
|   |   +-- Add API button
|   +-- ApiStats (Total APIs, REST count, GraphQL count, Active, Deprecated)
|   +-- 3-Column Layout
|       +-- CollectionSidebar (left)
|       |   +-- Collection[] (folder-style, click to select)
|       |   +-- Recently Viewed list (last 3-5 visited endpoints)
|       +-- ApiViewer (center — main content)
|       |   +-- EndpointCard
|       |       +-- Method Badge (GET/POST/PUT/DELETE — color coded)
|       |       +-- Path (e.g. /api/auth/login)
|       |       +-- Name + Description
|       |       +-- RequestViewer (dark code block — JSON payload)
|       |       +-- ResponseViewer (dark code block — JSON response + status badge)
|       +-- Context Sidebar (right)
|           +-- EnvironmentSelector (dropdown: Dev / Staging / Production)
|           +-- AuthenticationCard (Bearer token config)
|
+-- [activeTab === 'environment'] EnvironmentTab
    +-- EnvHeader
    |   +-- AlertBanner (WARNING: Never expose secrets in client-side code)
    |   +-- Import .env File button
    |   +-- Add Variable button
    +-- StatsCards (Total | Development | Staging | Production | Hidden 🔒)
    +-- Toolbar
    |   +-- EnvironmentTabs (All / Development / Staging / Production)
    |   +-- SearchBar (filter by variable key name)
    |   +-- Filter icon button
    +-- VariableTable (semantic HTML table)
        +-- TableHeader (Variable Name | Value | Environment | Category | Last Updated | Actions)
        +-- VariableRow[] (one per variable)
            +-- Key Name (monospace font) + Description
            +-- HiddenValue
            |   +-- Masked display (dots by default)
            |   +-- Eye toggle (reveal/hide on demand)
            |   +-- Copy button (clipboard — no visual reveal needed)
            +-- EnvironmentBadge[] (DEV green / STG amber / PRD blue)
            +-- CategoryBadge (Auth / Database / Infrastructure / Billing)
            +-- Last Updated (relative time)
            +-- Actions (Edit pencil + Delete trash — visible on row hover only)
```


---

## 10. Backend Responsibilities

### 10.1 Authentication & Authorization
- POST /api/auth/register — Create new user account
- POST /api/auth/login — Authenticate, return JWT
- POST /api/auth/logout — Invalidate session
- GET  /api/auth/me — Return authenticated user from token
- JWT middleware protecting all private routes
- Token refresh mechanism
- Password hashing with bcrypt

### 10.2 Users
- GET    /api/users/:id — Get user profile
- PUT    /api/users/:id — Update user profile (name, avatar, preferences)
- DELETE /api/users/:id — Delete account

### 10.3 Projects
- Full CRUD for projects
- Associate projects to authenticated user
- Project status tracking (active, completed, archived)
- Project metadata (tech stack, start/end dates, team members)
- Pinning projects

### 10.4 Tasks
- Full CRUD for tasks within a project
- Status transitions (todo -> in-progress -> review -> done)
- Priority levels (low, medium, high, critical)
- Assignee relationships (many-to-many: tasks <-> users)
- Label/tag system (array of strings)
- Due date tracking
- Filtering by status, priority, assignee
- Position ordering for kanban column persistence

### 10.5 Notes
- Full CRUD for notes within a project
- Folder/category organization
- Pin/unpin support
- Full-text search
- Autosave support (debounced PUT every 500ms from frontend)

### 10.6 API Collections & Endpoints
- Full CRUD for collections
- Full CRUD for endpoints (method, path, description, request/response bodies)
- Future: OpenAPI JSON import

### 10.7 Environment Variables — SECURITY CRITICAL
- Full CRUD for environment variables per project
- ENCRYPTION AT REST: AES-256-GCM with KMS-managed key
- NEVER return plaintext in list responses — always return masked value
- Separate /reveal/:varId endpoint (requires re-authentication)
- Environment scoping: DEV, STG, PRD per variable
- Category tagging: Auth, Database, Infrastructure, Billing
- Bulk import from .env file text content

---

## 11. Expected API Structure

### Base URL
```
Development: http://localhost:5000/api
Production:  https://api.devnote.app/api
```

### Authentication

```
POST /api/auth/register
Body: { "name": "Alice Johnson", "email": "alice@example.com", "password": "SecurePass123!" }
Response 201: { "success": true, "user": {...}, "token": "eyJ..." }

POST /api/auth/login
Body: { "email": "alice@example.com", "password": "SecurePass123!" }
Response 200: { "success": true, "token": "eyJ...", "user": {...} }
```

### Projects

```
GET    /api/projects
POST   /api/projects
GET    /api/projects/:projectId
PATCH  /api/projects/:projectId
DELETE /api/projects/:projectId
```

**Project Object:**
```json
{
  "_id": "proj-64abc",
  "name": "Neural API Gateway",
  "description": "Intelligent API routing platform",
  "status": "active",
  "color": "#6366f1",
  "icon": "lightning",
  "techStack": ["Node.js", "React", "MongoDB"],
  "startDate": "2024-01-01",
  "endDate": "2024-06-30",
  "owner": "64abc123",
  "members": ["64abc123"],
  "isPinned": false,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Tasks

```
GET    /api/projects/:projectId/tasks
POST   /api/projects/:projectId/tasks
PATCH  /api/projects/:projectId/tasks/:taskId
DELETE /api/projects/:projectId/tasks/:taskId
```

**Task Object:**
```json
{
  "_id": "task-64abc",
  "projectId": "proj-64abc",
  "title": "Implement JWT Auth middleware",
  "description": "Set up token validation and refresh...",
  "status": "in-progress",
  "priority": "high",
  "labels": ["Backend", "Auth"],
  "assignees": [{ "_id": "64abc", "name": "Alice", "avatar": "..." }],
  "dueDate": "2024-01-15",
  "position": 0,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Notes

```
GET    /api/projects/:projectId/notes
POST   /api/projects/:projectId/notes
PUT    /api/projects/:projectId/notes/:noteId
DELETE /api/projects/:projectId/notes/:noteId
PATCH  /api/projects/:projectId/notes/:noteId/pin
```

**Note Object:**
```json
{
  "_id": "note-64abc",
  "projectId": "proj-64abc",
  "title": "Architecture Decisions",
  "content": "## System Design\n\n...",
  "folder": "Technical Docs",
  "isPinned": false,
  "wordCount": 342,
  "updatedAt": "2024-01-10T14:30:00Z"
}
```

### API Collections

```
GET    /api/projects/:projectId/collections
POST   /api/projects/:projectId/collections
GET    /api/projects/:projectId/collections/:collectionId/endpoints
POST   /api/projects/:projectId/collections/:collectionId/endpoints
PATCH  /api/projects/:projectId/collections/:collectionId/endpoints/:id
DELETE /api/projects/:projectId/collections/:collectionId/endpoints/:id
```

**Endpoint Object:**
```json
{
  "_id": "ep-64abc",
  "collectionId": "col-64abc",
  "name": "User Login",
  "method": "POST",
  "path": "/api/auth/login",
  "description": "Authenticates a user and returns a JWT.",
  "requestBody": "{\n  \"email\": \"...\"\n}",
  "responseStatus": "200 OK",
  "responseBody": "{\n  \"token\": \"eyJ...\"\n}",
  "status": "active"
}
```

### Environment Variables

```
GET    /api/projects/:projectId/env-vars          <- Returns MASKED values
POST   /api/projects/:projectId/env-vars
PATCH  /api/projects/:projectId/env-vars/:varId
DELETE /api/projects/:projectId/env-vars/:varId
POST   /api/projects/:projectId/env-vars/reveal/:varId   <- Returns plaintext (extra auth)
POST   /api/projects/:projectId/env-vars/import          <- Bulk import .env content
```

**Variable Object (list — value is ALWAYS masked):**
```json
{
  "_id": "var-64abc",
  "projectId": "proj-64abc",
  "key": "JWT_SECRET",
  "description": "System Token",
  "value": "******************",
  "environments": ["DEV", "STG", "PRD"],
  "category": "Auth",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

!!! SECURITY RULE: The value field in ALL list/get responses MUST always be a masked string.
Only the /reveal/:varId endpoint returns plaintext, and only to authenticated admins.

### Standard Response Shapes

```json
// Success
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully."
}

// Error
{
  "success": false,
  "message": "Human-readable error message.",
  "errors": [
    { "field": "email", "message": "Email is already in use." }
  ]
}
```


---

## 12. Frontend Integration Guide

### Step 1: Configure Axios Instance

The instance is already scaffolded at `src/services/api/axios.js`. Confirm the base URL and update VITE_API_URL in `.env.local`.

```js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('devnote_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('devnote_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Step 2: Create Service Functions Per Module

```js
// src/services/api/projects.js
import api from './axios';

export const getAllProjects = () => api.get('/projects').then(r => r.data.data);
export const getProject = (id) => api.get(`/projects/${id}`).then(r => r.data.data);
export const createProject = (payload) => api.post('/projects', payload).then(r => r.data.data);
export const updateProject = (id, payload) => api.patch(`/projects/${id}`, payload).then(r => r.data.data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
```

### Step 3: Migrate Components from Mock to Live

```jsx
// BEFORE (mock data)
import { MOCK_VARIABLES } from '../../../mock/environment';
const [variables, setVariables] = useState(MOCK_VARIABLES);

// AFTER (live backend data)
import { getEnvVariables } from '../../../services/api/envVars';
const [variables, setVariables] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const { projectId } = useParams();

useEffect(() => {
  getEnvVariables(projectId)
    .then(setVariables)
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, [projectId]);

if (loading) return <Loader />;
if (error) return <ErrorState message={error} />;
```

### Step 4: Mock Files to Delete After Integration

| Backend Module Ready | Delete This File |
|---|---|
| Tasks API live | src/mock/tasks.js |
| Notes API live | src/mock/notes.js |
| API Collections live | src/mock/apis.js |
| Env Vars API live | src/mock/environment.js |

### Step 5: AuthContext Setup

Create `src/context/AuthContext.jsx`:

```jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser } from '../services/api/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('devnote_token');
    if (token) {
      getCurrentUser()
        .then(setUser)
        .catch(() => localStorage.removeItem('devnote_token'))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('devnote_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('devnote_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

Then wrap `<App />` with `<AuthProvider>` in `main.jsx`:

```jsx
// main.jsx
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
```

### Loading and Error State Components

These already exist in `src/components/common/`:

```jsx
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
```

Use them in every data-fetching component for consistent UX.

---

## 13. Coding Standards

### Naming Conventions

| Context | Convention | Example |
|---|---|---|
| React Components | PascalCase | `ProjectCard.jsx`, `VariableRow.jsx` |
| Utility functions | camelCase | `formatDate.js`, `truncateText.js` |
| Constants (exported arrays/objects) | SCREAMING_SNAKE_CASE | `WORKSPACE_TABS`, `MOCK_VARIABLES` |
| Directories | kebab-case | `not-found/`, `create-project/` |
| Route paths | kebab-case | `/project/:id`, `/env-vars` |
| Custom hook files | camelCase prefixed with `use` | `useAuth.js`, `useDebounce.js` |
| Service files | camelCase | `projects.js`, `envVars.js` |

### Component Architecture Rules

1. Pages are thin — they import and compose components. No raw HTML for individual UI elements.
2. State stays in the orchestrator — child components are stateless where possible.
3. One responsibility per component — HiddenValue only manages masking; VariableRow only manages layout.
4. No prop drilling beyond 2 levels — introduce Context or lift state if needed.
5. Prefer useMemo for derived/filtered data — never compute filtered lists inline in JSX.

### Import Order Convention

```jsx
// 1. React / React ecosystem
import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 2. Third-party libraries
import { Search, Plus } from 'lucide-react';

// 3. Internal components (closest first)
import VariableTable from './VariableTable';
import StatsCards from './StatsCards';

// 4. Constants, services, utils, mock
import { ENV_STATS } from '../../../mock/environment';
import { getEnvVariables } from '../../../services/api/envVars';
```

### Tailwind CSS Conventions

- Never use @apply in component files — use class strings directly.
- Conditional classes use template literals.
- Color palette: Use slate, indigo, emerald, amber, red consistently.
- Spacing: Use multiples of 4 for visual rhythm (p-4, p-8, gap-4).

### Feature Folder Structure Pattern

Every workspace module follows this pattern:

```
workspace/environment/
+-- EnvironmentTab.jsx       <- Root orchestrator (holds all state)
+-- EnvHeader.jsx            <- Header and action bar
+-- StatsCards.jsx           <- Metric display
+-- EnvironmentTabs.jsx      <- Sub-navigation tabs
+-- HiddenValue.jsx          <- Isolated masking behavior
+-- Badges.jsx               <- Small, atomic display components
+-- VariableRow.jsx          <- Table row (leaf node)
+-- VariableTable.jsx        <- Table container
```

---

## 14. Future Scope

| Feature | Priority | Description |
|---|---|---|
| Real-time Collaboration | High | WebSocket multi-user editing (Socket.io) |
| Dark Mode | High | System-level theme toggle with CSS custom properties |
| GitHub Integration | High | Link repos, display commit activity on workspace |
| Notification System | Medium | In-app and email notifications for deadlines and assignments |
| AI Documentation | Medium | LLM-powered auto-generate README from project data |
| Favorites | Low | Star projects, tasks, notes for sidebar quick-access |
| Calendar View | Low | Timeline view for tasks and deadlines |
| Team Permissions | High | Role-based access control (Admin, Member, Viewer) |
| Drag-and-Drop Tasks | Medium | Kanban drag-and-drop with backend position persistence |
| API Import | Medium | Import OpenAPI (Swagger) JSON spec into API Collections |
| Bulk .env Import | Medium | Parse and import key=value pairs from file upload |
| 2FA Authentication | High | TOTP-based two-factor authentication |

---

## 15. Development Workflow

### Branch Strategy

```
main                    <- Production-ready code only. Protected. No direct pushes.
+-- develop             <- Integration branch. All features merge here first.
|   +-- feature/frontend/project-workspace
|   +-- feature/backend/auth-api
|   +-- feature/backend/env-vars-encryption
|   +-- fix/kanban-column-scroll
+-- hotfix/critical-bug <- Emergency patches to main only
```

### Branch Naming Convention

```
feature/<team>/<short-description>
fix/<short-description>
hotfix/<short-description>
chore/<short-description>

Examples:
feature/frontend/notes-autosave
feature/backend/env-vars-encryption
fix/kanban-card-overflow
chore/update-axios-version
```

### Commit Message Format (Conventional Commits)

```
<type>(scope): <description>

Types:
  feat      <- New feature added
  fix       <- Bug fix
  docs      <- Documentation only change
  style     <- CSS or formatting, no logic change
  refactor  <- Code restructure, no behavior change
  test      <- Adding or updating tests
  chore     <- Tooling, config, dependency updates

Examples:
  feat(workspace): add environment variables tab
  fix(kanban): prevent empty column crash on filter
  docs(handoff): add API contract for notes module
  chore(deps): upgrade lucide-react to 0.350.0
```

### Pull Request Checklist

Before opening any PR, confirm:

- [ ] Code runs locally without errors
- [ ] npm run build passes without errors
- [ ] No console.log statements left in production code
- [ ] Tested on mobile viewport (375px width)
- [ ] No hardcoded strings that should be in constants
- [ ] Props are documented for complex components
- [ ] PR description explains what changed and why
- [ ] Related issue number referenced (Closes #42)

### Pull Request Review Rules

- Minimum 1 reviewer approval required before merge to develop.
- Minimum 2 reviewer approvals required for merge to main.
- PRs touching AppRoutes.jsx or DashboardLayout.jsx require 2 reviewers (high-impact files).
- Backend PRs must not merge until frontend integration is confirmed compatible.

### Environment Variables for Frontend

```bash
# client/.env.local  (NOT committed to git — add to .gitignore)
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=DevNote
```

!!! IMPORTANT: All Vite environment variables must be prefixed with VITE_ to be accessible in the browser bundle.
Never put secrets or private API keys here — they will be visible in the client JS bundle.

### Running the Application

```bash
# Frontend only (mock data mode)
cd client
npm install
cp .env.example .env.local
npm run dev
# App opens at http://localhost:5173

# With backend (full stack)
# Terminal 1 — Backend
cd server && npm install && npm run dev
# API runs at http://localhost:5000

# Terminal 2 — Frontend
cd client && npm run dev
# App runs at http://localhost:5173
```

---

This document is maintained by the frontend team.
Please notify the frontend lead if any API contract deviates from the specifications above.

DevNote v1.0 | Frontend Handoff Document | Last updated: July 2026
