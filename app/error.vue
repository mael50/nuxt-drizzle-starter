<script setup lang="ts">
  import type { NuxtError } from '#app'

  defineProps({
    error: {
      type: Object as PropType<NuxtError>,
      required: true
    }
  })

  const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <UError :error="error">
    <template #links>
      <UButton size="lg" color="primary" variant="solid" label="Retourner à l'accueil" @click="handleError" />
    </template>
  </UError>
</template>
