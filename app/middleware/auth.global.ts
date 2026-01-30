export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  // Si l'utilisateur n'est pas connecté et n'est pas sur la page de login, redirection vers /login
  if (!loggedIn.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  // Si l'utilisateur est connecté et essaie d'aller sur /login, redirection vers l'accueil
  if (loggedIn.value && to.path === '/login') {
    return navigateTo('/')
  }
})
