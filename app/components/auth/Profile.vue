<script setup lang="ts">
    const { user, logout } = useAuth()
</script>

<template>
    <div class="max-w-2xl mx-auto space-y-8">
        <div class="space-y-2">
            <h1 class="text-3xl font-bold tracking-tight">Tableau de bord</h1>
            <p class="text-neutral-500 dark:text-neutral-400">
                Bienvenue, {{ user?.name || 'utilisateur' }}. Retrouvez ici vos informations personnelles.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UCard class="md:col-span-1">
                <template #header>
                    <div class="flex flex-col items-center text-center gap-4 py-4">
                        <UAvatar :src="user?.avatar" :alt="user?.name" size="3xl" class="ring-4 ring-primary-500/20" />
                        <div>
                            <p class="font-bold text-lg">{{ user?.name }}</p>
                            <p class="text-sm text-neutral-500">{{ user?.email }}</p>
                        </div>
                    </div>
                </template>

                <UButton color="neutral" variant="outline" block @click="logout" icon="i-lucide-log-out">
                    Se déconnecter
                </UButton>
            </UCard>

            <UCard class="md:col-span-2">
                <template #header>
                    <div class="flex items-center gap-2 font-semibold">
                        <UIcon name="i-lucide-database" />
                        Données brutes (Session)
                    </div>
                </template>

                <div class="h-[200px] overflow-auto">
                    <pre
                        class="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded text-[10px] font-mono select-all">{{ user }}</pre>
                </div>
            </UCard>
        </div>
    </div>
</template>
