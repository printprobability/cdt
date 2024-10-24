<template>
  <div>
    <LoadingOverlay/>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// *************************
// Back button detection
// *************************

// Mark that a popstate is occurred recently
const isPopstateRecently = useState('popState', () => false);
// Detect a popState event
onMounted(() => window.addEventListener('popstate', () => isPopstateRecently.value = true));
</script>
