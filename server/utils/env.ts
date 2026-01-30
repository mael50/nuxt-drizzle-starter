import { z } from 'zod'

const envSchema = z.object({
  NUXT_PRIVATE_DATABASE_URL: z.string().url(),
  NUXT_OAUTH_GOOGLE_CLIENT_ID: z.string().min(1),
  NUXT_OAUTH_GOOGLE_CLIENT_SECRET: z.string().min(1),
  NUXT_SESSION_PASSWORD: z.string().min(32),
})

export const validateEnv = () => {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.flatten().fieldErrors)
    throw new Error('Invalid environment variables')
  }

  return result.data
}
