/**
 * JSON schema used to validate types at runtime
 */
 export default {
  type: "object",
  properties: {
    public: { type: 'string' }, // string because they are path parameters
    page: { type: 'string' },
    limit: { type: 'string' },
  },
  required: ['public']
} as const;
