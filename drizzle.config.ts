import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dbCredentials: {
        url: process.env.NUXT_PRIVATE_DATABASE_URL!,
    },
    dialect: 'mysql',
    out: './db/migrations',
    schema: './db/schema.ts',
})
