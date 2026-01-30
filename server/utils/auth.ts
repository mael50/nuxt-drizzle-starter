import type { H3Event } from 'h3'

export const setUserAuthSession = async (event: H3Event, user: any) => {
  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt
    },
    loggedInAt: Date.now()
  })
}
