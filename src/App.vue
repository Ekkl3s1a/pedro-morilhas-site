<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useUIStore } from '@/stores/ui.store'
import { useActiveSection } from '@/composables/useActiveSection'
import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'

const ui = useUIStore()

// Secções que o menu vai acompanhar
useActiveSection(['hero', 'about', 'services', 'stats', 'testimonials', 'faq'])

// Scroll listener global
function handleScroll() {
  ui.updateScroll(window.scrollY)
}

onMounted(() => {
  ui.checkCookies()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div id="app">
    <AppHeader formUrl="https://forms.gle/..." />
    <!-- Componentes serão adicionados nos próximos steps -->
    
    <AppFooter formUrl="https://forms.gle/..." />
  </div>
</template>