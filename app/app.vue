<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  title: appConfig.site?.name || 'Nuxt Drizzle Starter',
  description: appConfig.site?.description,
  ogTitle: appConfig.site?.name,
  ogDescription: appConfig.site?.description,
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>