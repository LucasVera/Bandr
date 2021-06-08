/**
 * JSON schema used to validate types at runtime
 */
 export default {
  type: "object",
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
    name: { type: 'string' },
    phoneNumber: { type: 'string' },
    photoUrl: { type: 'string' },
  },
  required: ['email', 'password']
} as const;

/**
 * Data model to use in the application
 */
export interface InputRegisterData {
  email: string,
  password: string,
  name?: string,
  phoneNumber?: string,
  photoUrl?: string,
}
