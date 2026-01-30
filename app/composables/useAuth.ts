import type { FormSubmitEvent } from '@nuxt/ui'
import type { AuthSchema } from '~/utils/auth'

export const useAuth = () => {
  const { loggedIn, user, clear, fetch: fetchSession } = useUserSession()
  const isRegister = ref(false)
  const loading = ref(false)
  const toast = useToast()

  const toggleMode = () => {
    isRegister.value = !isRegister.value
  }

  async function onSubmit(event: FormSubmitEvent<AuthSchema>) {
    if (loading.value) return
    loading.value = true
    try {
      const endpoint = isRegister.value ? '/api/auth/register' : '/api/auth/login'
      await $fetch(endpoint, {
        method: 'POST',
        body: event.data
      })
      await fetchSession()
      toast.add({ title: 'Succès', color: 'success' })
      return navigateTo('/')
    } catch (err: any) {
      toast.add({
        title: 'Erreur',
        description: err.data?.message || err.message,
        color: 'error'
      })
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    await clear()
    return navigateTo('/login')
  }

  return {
    loggedIn,
    user,
    isRegister,
    loading,
    toggleMode,
    onSubmit,
    logout
  }
}
