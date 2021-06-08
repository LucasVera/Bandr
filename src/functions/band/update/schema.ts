/**
 * JSON schema used to validate types at runtime
 */
 export default {
  type: "object",
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    genres: { type: 'array', items: { type: 'string' } },
    memberNames: { type: 'array', items: { type: 'string' } },
    foundedDate: { type: 'string' },
    website: { type: 'string' },
    active: { type: 'boolean' },
  },
  required: ['id'],
  anyOf: [
    { required: ['name'] },
    { required: ['genres'] },
    { required: ['memberNames'] },
    { required: ['foundedDate'] },
    { required: ['website'] },
    { required: ['active'] },
  ],
} as const;
