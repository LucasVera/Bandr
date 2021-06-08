/**
 * JSON schema used to validate types at runtime
 */
 export default {
  type: "object",
  properties: {
    // string because they are path parameters
    page: { type: 'string' },
    limit: { type: 'string' },
  }
} as const;
