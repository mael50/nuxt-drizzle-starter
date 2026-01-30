import { useDrizzle, tables, eq } from '~~/db'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email and password are required'
    })
  }

  const drizzle = useDrizzle()

  // Check if user exists
  const existingUser = await drizzle.query.users.findFirst({
    where: eq(tables.users.email, email)
  })

  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: 'User already exists'
    })
  }

  const hashedPassword = await hashPassword(password)

  await drizzle.insert(tables.users).values({
    email,
    password: hashedPassword,
    name: email.split('@')[0],
    avatar: `https://unavatar.io/${email}`
  })

  const newUser = await drizzle.query.users.findFirst({
    where: eq(tables.users.email, email)
  })

  if (!newUser) {
     throw createError({
      statusCode: 500,
      message: 'Error creating user'
    })
  }

  await setUserAuthSession(event, newUser)

  return { message: 'Registered successfully' }
})
