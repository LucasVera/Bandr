/**
 * JSON schema used to validate types at runtime
 */
export default {
  type: "object",
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
  },
  required: ['email', 'password']
} as const;

/**
 * Data model to use in the application
 */
export interface InputSignInData {
  email: string,
  password: string,
}
