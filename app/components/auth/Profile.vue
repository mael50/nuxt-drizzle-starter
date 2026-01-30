<script setup lang="ts">
    const { user, logout } = useAuth()
</script>

<template>
    <div class="space-y-4">
        <h1 class="text-xl font-bold">Infos utilisateur</h1>
        <pre class="bg-gray-100 dark:bg-gray-900 p-4 rounded text-xs select-all">{{ user }}</pre>
        <UButton color="neutral" variant="outline" block @click="logout">
            Se déconnecter
        </UButton>
    </div>
</template>
