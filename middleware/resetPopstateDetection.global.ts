export default defineNuxtRouteMiddleware((to, from) => {
  // skip middleware on server
  if (import.meta.server) return

  // Get state
  const isPopstateRecently = useState('popState', () => false);
  // Reset
  isPopstateRecently.value = false
})
