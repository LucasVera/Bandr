/**
 * JSON schema used to validate types at runtime
 */
 export default {
  type: "object",
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
} as const;

