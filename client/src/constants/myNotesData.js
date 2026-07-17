export const MY_NOTES_DATA = [
  {
    id: 'note-1',
    title: 'React Interview Questions',
    content: `# React Interview Questions

## Core Concepts
- What is the Virtual DOM and how does it work?
- Explain the differences between Class Components and Functional Components.
- What are React Hooks? Explain \`useState\` and \`useEffect\`.
- How does React handle state management?

## Advanced Topics
- Explain the Context API.
- What are Higher-Order Components (HOC)?
- How do you optimize React performance? (useMemo, useCallback, React.memo)
- Describe the lifecycle methods in Class Components.
`,
    lastEdited: 'Today at 10:30 AM',
    isPinned: true,
    isFavorite: false,
    tags: ['React', 'Interview', 'Frontend']
  },
  {
    id: 'note-2',
    title: 'MongoDB Commands',
    content: `# MongoDB Useful Commands

- Connect to shell: \`mongosh\`
- Show databases: \`show dbs\`
- Use database: \`use mydb\`
- Show collections: \`show collections\`
- Find all documents: \`db.users.find({})\`
- Find one document: \`db.users.findOne({ name: 'Alice' })\`
- Insert document: \`db.users.insertOne({ name: 'Bob', age: 30 })\`
- Update document: \`db.users.updateOne({ name: 'Alice' }, { $set: { age: 26 } })\`
- Delete document: \`db.users.deleteOne({ name: 'Bob' })\`
`,
    lastEdited: 'Yesterday at 4:15 PM',
    isPinned: true,
    isFavorite: true,
    tags: ['MongoDB', 'Database', 'Cheatsheet']
  },
  {
    id: 'note-3',
    title: 'JavaScript Tips',
    content: `# JavaScript Tips and Tricks

## Destructuring
\`\`\`javascript
const user = { name: 'Alice', age: 25 };
const { name, age } = user;
\`\`\`

## Spread Operator
\`\`\`javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
\`\`\`

## Optional Chaining
\`\`\`javascript
const address = user?.profile?.address;
\`\`\`
`,
    lastEdited: '2 days ago',
    isPinned: false,
    isFavorite: true,
    tags: ['JavaScript', 'Tips', 'Syntax']
  },
  {
    id: 'note-4',
    title: 'Project Ideas',
    content: `# Personal Project Ideas

1. **AI Content Generator**: A web app that uses OpenAI API to generate blog posts.
2. **Task Management Tool**: A Kanban board with real-time collaboration.
3. **Expense Tracker**: A mobile-first app to track daily expenses and visualize data.
4. **Portfolio Website**: A clean, minimalistic portfolio built with Next.js.
`,
    lastEdited: '3 days ago',
    isPinned: false,
    isFavorite: false,
    tags: ['Ideas', 'Projects']
  },
  {
    id: 'note-5',
    title: 'Meeting Notes - Design Sync',
    content: `# Design Sync Meeting

**Date**: Oct 20th
**Attendees**: John, Sarah, Mike

## Agenda
- Review the new dashboard layout.
- Discuss color palette changes.
- Finalize the typography scale.

## Action Items
- [x] John: Update Figma prototypes.
- [ ] Sarah: Implement the new sidebar navigation.
- [ ] Mike: Audit existing components for accessibility.
`,
    lastEdited: '4 days ago',
    isPinned: false,
    isFavorite: false,
    tags: ['Meeting', 'Design']
  },
  {
    id: 'note-6',
    title: 'Deployment Checklist',
    content: `# Pre-Deployment Checklist

- [ ] Run all unit tests (\`npm run test\`).
- [ ] Check for linting errors (\`npm run lint\`).
- [ ] Build the production bundle (\`npm run build\`).
- [ ] Verify environment variables.
- [ ] Check database migrations.
- [ ] Monitor logs after deployment.
`,
    lastEdited: 'Last week',
    isPinned: true,
    isFavorite: true,
    tags: ['DevOps', 'Checklist']
  },
  {
    id: 'note-7',
    title: 'Resume Improvements',
    content: `# Resume Update Notes

- Highlight the DevNote project.
- Emphasize React and Node.js skills.
- Add metrics to previous roles (e.g., "Improved performance by 20%").
- Update the layout for better readability.
`,
    lastEdited: 'Last week',
    isPinned: false,
    isFavorite: false,
    tags: ['Career', 'Resume']
  },
  {
    id: 'note-8',
    title: 'DSA Revision',
    content: `# Data Structures and Algorithms

## Arrays
- Two Pointers technique
- Sliding Window technique

## Trees
- Inorder, Preorder, Postorder traversal
- Binary Search Tree properties

## Dynamic Programming
- Memoization vs Tabulation
- Knapsack problem
`,
    lastEdited: '2 weeks ago',
    isPinned: false,
    isFavorite: false,
    tags: ['DSA', 'Algorithms', 'Study']
  }
];
