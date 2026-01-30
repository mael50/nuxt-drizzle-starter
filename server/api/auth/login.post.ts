import { userRepository } from '~~/server/repositories/user.repository'
import { authSchema } from '~~/app/utils/auth'

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, authSchema.parse)

  const user = await userRepository.findByEmail(email)

  if (!user || !user.password) {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials',
    })
  }

  const isValid = await verifyPassword(user.password, password)

  if (!isValid) {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials',
    })
  }

  await setUserAuthSession(event, user)

  return { message: 'Logged in successfully' }
})
