import { describe, it, expect } from 'vitest'
import { authSchema } from './auth'

describe('authSchema', () => {
  it('should validate a correct email and password', () => {
    const data = {
      email: 'test@example.com',
      password: 'password123',
    }
    const result = authSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('should fail on invalid email', () => {
    const data = {
      email: 'invalid-email',
      password: 'password123',
    }
    const result = authSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('should fail on too short password', () => {
    const data = {
      email: 'test@example.com',
      password: '123',
    }
    const result = authSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})
