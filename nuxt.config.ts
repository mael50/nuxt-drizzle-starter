// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-auth-utils', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    oauth: {
      google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID!,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET!,
      },
    },
    private: {
      databaseUrl: process.env.NUXT_PRIVATE_DATABASE_URL!,
    },
  },
})
