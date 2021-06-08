/**
 * JSON schema used to validate types at runtime
 */
 export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    genres: { type: 'array', items: { type: 'string' } },
    memberNames: { type: 'array', items: { type: 'string' } },
    foundedDate: { type: 'string' },
    website: { type: 'string' },
    active: { type: 'boolean' },
    public: { type: 'boolean' },
  },
  required: ['name', 'genres']
} as const;
