/**
 * JSON schema used to validate types at runtime
 */
 export default {
  type: "object",
  properties: {
    token: { type: 'string' },
    userId: { type: 'string' },
  },
  required: ['token', 'userId']
} as const;

/**
 * Data model to use in the application
 */
export interface InputVerifyTokenData {
  token: string,
  userId: string
}
