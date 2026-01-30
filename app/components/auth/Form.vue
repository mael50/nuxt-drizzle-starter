<script setup lang="ts">
    const { isRegister, loading, toggleMode, onSubmit } = useAuth()
</script>

<template>
    <div class="space-y-4">
        <UAuthForm :title="isRegister ? 'Créer un compte' : 'Connexion'"
            :description="isRegister ? 'Inscrivez-vous pour continuer' : 'Connectez-vous à votre compte'"
            :fields="authFields" :schema="authSchema" :providers="authProviders"
            :submit="{ label: isRegister ? 'S\'inscrire' : 'Se connecter', loading: loading, block: true }"
            @submit="onSubmit" />
        <UButton color="neutral" variant="ghost" block :disabled="loading" @click="toggleMode">
            {{ isRegister ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire' }}
        </UButton>
    </div>
</template>
