import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

import * as schema from './schema'

export { and, asc, desc, eq, or, sql } from 'drizzle-orm'

export const tables = schema

let _drizzle: MySql2Database<typeof schema>

export function useDrizzle() {
  const {
    private: { databaseUrl },
  } = useRuntimeConfig()

  if (!_drizzle) {
    let url = databaseUrl
    if (!url.includes('charset=')) {
      url += (url.includes('?') ? '&' : '?') + 'charset=utf8mb4'
    }
    const connection = mysql.createPool(url)
    _drizzle = drizzle({ client: connection, mode: 'default', schema })
  }

  return _drizzle
}

export type Users = typeof schema.users.$inferSelect
