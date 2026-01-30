import { userRepository } from '~~/server/repositories/user.repository'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email and password are required',
    })
  }

  const existingUser = await userRepository.findByEmail(email)

  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: 'User already exists',
    })
  }

  const hashedPassword = await hashPassword(password)

  const newUser = await userRepository.create({
    email,
    password: hashedPassword,
    name: email.split('@')[0],
    avatar: `https://unavatar.io/${email}`,
  })

  if (!newUser) {
    throw createError({
      statusCode: 500,
      message: 'Error creating user',
    })
  }

  await setUserAuthSession(event, newUser)

  return { message: 'Registered successfully' }
})
