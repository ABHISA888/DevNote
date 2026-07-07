/**
 * 🎓 TEACHING MOMENT: mock/environment.js
 * 
 * WHY THIS EXISTS:
 * This stubs out the payload we expect from the Secrets Management backend.
 * Notice that 'value' exists here in plaintext for mock purposes, but in a real app,
 * the backend should only send these plaintext values over HTTPS to an authenticated
 * admin. Otherwise, the values should be sent already masked or encrypted depending on permissions.
 */

export const MOCK_VARIABLES = [
  {
    id: 'var-1',
    key: 'JWT_SECRET',
    description: 'System Token',
    value: 'sk_live_1234567890abcdef',
    environments: ['DEV', 'STG', 'PRD'],
    category: 'Auth',
    lastUpdated: '2 hrs ago'
  },
  {
    id: 'var-2',
    key: 'MONGO_URI',
    description: '',
    value: 'mongodb+srv://admin:secret@cluster.mongodb.net/prod',
    environments: ['PRD'],
    category: 'Database',
    lastUpdated: '1 day ago'
  },
  {
    id: 'var-3',
    key: 'AWS_SECRET_KEY',
    description: '',
    value: 'AKIAIOSFODNN7EXAMPLE',
    environments: ['STG', 'PRD'],
    category: 'Infrastructure',
    lastUpdated: '3 days ago'
  },
  {
    id: 'var-4',
    key: 'STRIPE_WEBHOOK_URL',
    description: '',
    value: 'https://api.gateway.neural/stripe',
    environments: ['DEV', 'STG', 'PRD'],
    category: 'Billing',
    lastUpdated: 'May 12, 2024'
  }
];

export const ENV_STATS = [
  { id: 'total', label: 'Total Variables', value: '24', subtext: '+2 this week' },
  { id: 'dev', label: 'Development', value: '8' },
  { id: 'stg', label: 'Staging', value: '6' },
  { id: 'prd', label: 'Production', value: '10' },
  { id: 'hidden', label: 'Hidden Values', value: '18/24', isSecure: true }
];
