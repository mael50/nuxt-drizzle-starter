<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center p-4">
    <h1 class="text-6xl font-bold text-primary mb-4">
      {{ error?.statusCode }}
    </h1>
    <p class="text-xl text-gray-400 mb-8">
      {{ error?.message || "Une erreur s'est produite." }}
    </p>
    <UButton
      size="lg"
      color="primary"
      variant="solid"
      label="Retourner à l'accueil"
      @click="handleError"
    />
  </div>
</template>
