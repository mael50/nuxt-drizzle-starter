<script setup lang="ts">
    const appConfig = useAppConfig()
    const { loggedIn, user, logout } = useAuth()

    const items = computed(() => [
        [{
            label: user.value?.email || '',
            slot: 'account',
            disabled: true
        }],
        [{
            label: 'Déconnexion',
            icon: 'i-lucide-log-out',
            onSelect() {
                logout()
            }
        }]
    ])
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <UHeader :title="appConfig.site?.name" to="/">
            <template #right>
                <UColorModeButton />

                <UDropdownMenu v-if="loggedIn" :items="items" :content="{ align: 'end' }">
                    <UButton color="neutral" variant="ghost">
                        <UAvatar :src="user?.avatar" :alt="user?.name" size="md" />
                    </UButton>

                    <template #account="{ item }">
                        <div class="text-left">
                            <p>Connecté en tant que</p>
                            <p class="truncate font-medium text-neutral-900 dark:text-white">
                                {{ item.label }}
                            </p>
                        </div>
                    </template>
                </UDropdownMenu>

                <UButton v-else to="/login" variant="ghost" color="neutral">
                    Connexion
                </UButton>
            </template>
        </UHeader>

        <UMain>
            <UContainer class="py-12">
                <slot />
            </UContainer>
        </UMain>

        <UFooter>
            <template #left>
                <p class="text-xs text-neutral-500">
                    © {{ new Date().getFullYear() }} {{ appConfig.site?.name }}. Tous droits réservés.
                </p>
            </template>

            <template #right>
                <UButton icon="i-simple-icons-github" color="neutral" variant="ghost"
                    to="https://github.com/mael50/nuxt-drizzle-starter" target="_blank" />
            </template>
        </UFooter>
    </div>
</template>
