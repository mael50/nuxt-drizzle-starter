import { useDrizzle, tables, eq } from '~~/db'

export const userRepository = {
  async findByEmail(email: string) {
    const drizzle = useDrizzle()
    return await drizzle.query.users.findFirst({
      where: eq(tables.users.email, email),
    })
  },

  async create(data: typeof tables.users.$inferInsert) {
    const drizzle = useDrizzle()
    await drizzle.insert(tables.users).values(data)
    return await this.findByEmail(data.email)
  },

  async update(id: number, data: Partial<typeof tables.users.$inferInsert>) {
    const drizzle = useDrizzle()
    await drizzle.update(tables.users).set(data).where(eq(tables.users.id, id))
    return await drizzle.query.users.findFirst({
      where: eq(tables.users.id, id),
    })
  },
}
