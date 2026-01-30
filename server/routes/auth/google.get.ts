import { useDrizzle, tables, eq } from '~~/db'

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    const drizzle = useDrizzle()

    let dbUser = await drizzle.query.users.findFirst({
      where: eq(tables.users.email, user.email)
    })

    if (!dbUser) {
      await drizzle.insert(tables.users).values({
        name: user.name || 'Anonymous',
        email: user.email,
        password: '',
        avatar: user.picture,
      })

      dbUser = await drizzle.query.users.findFirst({
        where: eq(tables.users.email, user.email)
      })
    } else {
      await drizzle.update(tables.users)
        .set({
          name: user.name || dbUser.name,
          avatar: user.picture || dbUser.avatar
        })
        .where(eq(tables.users.id, dbUser.id))
      
      dbUser.name = user.name || dbUser.name
      dbUser.avatar = user.picture || dbUser.avatar
    }

    if (!dbUser) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to sync user with database'
      })
    }

    await setUserSession(event, {
      user: {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        avatar: dbUser.avatar,
        createdAt: dbUser.createdAt
      },
      loggedInAt: Date.now()
    })

    return sendRedirect(event, '/')
  },

  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/')
  },
})

