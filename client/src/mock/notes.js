/**
 * 🎓 TEACHING MOMENT: mock/notes.js
 * 
 * WHY THIS EXISTS:
 * This file stubs out the backend responses for our Notes system. It separates
 * data logic from UI logic, making our components completely stateless when it comes
 * to fetching.
 */

export const MOCK_NOTES = [
  {
    id: 'note-1',
    title: 'Architecture Overview',
    content: `# Architecture Overview

This document outlines the core system design for the DevNote backend.

## Core Stack
- Node.js & Express
- PostgreSQL
- Redis for caching

## Authentication
We are using JWT tokens with short-lived access tokens and httpOnly refresh tokens to ensure maximum security.
`,
    folder: 'Engineering',
    isPinned: true,
    lastEdited: '10 mins ago',
    wordCount: 42
  },
  {
    id: 'note-2',
    title: 'Q3 Product Roadmap',
    content: `# Q3 Product Roadmap

## Goals
1. Launch Dark Mode
2. Integrate GitHub Repositories
3. Complete the Tasks Kanban Board

## Stretch Goals
- Socket.io integration for real-time multiplayer cursors.
`,
    folder: 'Product',
    isPinned: true,
    lastEdited: '2 days ago',
    wordCount: 31
  },
  {
    id: 'note-3',
    title: 'API Authentication Flow',
    content: `# API Authentication Flow

When a user logs in:
1. Client sends email/password.
2. Server validates.
3. Server returns Access Token (15m) and sets Refresh Token cookie (7d).
`,
    folder: 'Engineering',
    isPinned: false,
    lastEdited: '3 hours ago',
    wordCount: 29
  },
  {
    id: 'note-4',
    title: 'Marketing Copy Drafts',
    content: `# DevNote Landing Page

**Hero Section**
"The Developer Workspace."
"Organize your projects, tasks, and API keys all in one place."

**Features**
- Tasks & Kanban
- Environment Vaults
- Markdown Notes
`,
    folder: 'Marketing',
    isPinned: false,
    lastEdited: '1 week ago',
    wordCount: 30
  }
];
