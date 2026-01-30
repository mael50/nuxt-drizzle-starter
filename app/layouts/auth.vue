<template>
    <div class="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4">
        <div class="absolute top-8 left-8">
            <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl uppercase tracking-wider italic">
                <span class="text-primary-500">Nuxt</span> Drizzle
            </NuxtLink>
        </div>

        <div class="absolute top-8 right-8">
            <UColorModeButton />
        </div>

        <div class="w-full max-w-sm">
            <slot />
        </div>
    </div>
</template>
