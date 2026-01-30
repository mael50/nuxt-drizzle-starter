import { userRepository } from '~~/server/repositories/user.repository'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email and password are required',
    })
  }

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
