/**
 * 🎓 TEACHING MOMENT: mock/apis.js
 * 
 * WHY THIS EXISTS:
 * This acts as the structural prototype for backend payloads representing the APIs module.
 * Separating data into Collections, Endpoints, and Global settings mimics how Postman
 * normalizes data in its underlying database architecture.
 */

export const MOCK_COLLECTIONS = [
  { id: 'auth', name: 'Authentication', count: 4 },
  { id: 'users', name: 'Users', count: 8 },
  { id: 'products', name: 'Products', count: 6 },
  { id: 'payments', name: 'Payments', count: 6 }
];

export const MOCK_ENDPOINTS = [
  {
    id: 'login',
    collectionId: 'auth',
    method: 'POST',
    path: '/api/v1/auth/login',
    name: 'Authenticate User',
    description: 'Exchange user credentials (email/password) for a JWT bearer token. This endpoint should be called for initial app entry.',
    requestContentType: 'application/json',
    requestBody: '{\n  "email": "admin@devlaunch.com",\n  "password": "**************",\n  "mfa_token": "123456"\n}',
    responseStatus: '200 OK',
    responseTime: '124ms',
    responseBody: '{\n  "status": "success",\n  "data": {\n    "access_token": "eyJhbGciOiJIUzI1NiIsInR5...",\n    "expires_in": 3600,\n    "user": {\n      "id": 1029,\n      "role": "admin"\n    }\n  }\n}'
  }
];

export const RECENTLY_VIEWED = [
  { id: 'get-users-me', method: 'GET', path: '/users/me' },
  { id: 'post-token-refresh', method: 'POST', path: '/token/refresh' }
];

export const API_STATS = [
  { id: 'total', label: 'TOTAL APIS', value: '24', icon: 'Box', color: 'text-primary-600' },
  { id: 'rest', label: 'REST APIS', value: '18', icon: 'Server', color: 'text-slate-500' },
  { id: 'graphql', label: 'GRAPHQL', value: '6', icon: 'Share2', color: 'text-slate-500' },
  { id: 'auth', label: 'AUTHENTICATED', value: '12', icon: 'Lock', color: 'text-slate-500' }
];

export const ACTIVE_ENVIRONMENTS = [
  { id: 'staging', name: 'Staging (stage-v2)' },
  { id: 'production', name: 'Production' },
  { id: 'development', name: 'Local Development' }
];
