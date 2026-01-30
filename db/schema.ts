import { mysqlTable, text, serial, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }),
  avatar: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
})