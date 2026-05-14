<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useUIStore }           from '@/stores/ui.store'
import { useActiveSection }     from '@/composables/useActiveSection'
import AppHeader                from '@/components/layout/AppHeader.vue'
import AppFooter                from '@/components/layout/AppFooter.vue'
import HeroSection              from '@/components/sections/HeroSection.vue'
import AboutSection             from '@/components/sections/AboutSection.vue'
import ServicesSection          from '@/components/sections/ServicesSection.vue'
import StatsSection             from '@/components/sections/StatsSection.vue'
import TestimonialsSection      from '@/components/sections/TestimonialsSection.vue'
import FAQSection               from '@/components/sections/FAQSection.vue'
import StickyBanner             from '@/components/ui/StickyBanner.vue'
import CookieBanner             from '@/components/ui/CookieBanner.vue'

const FORM_URL = 'https://forms.gle/EXEMPLO'

const ui = useUIStore()
useActiveSection(['hero', 'about', 'services', 'stats', 'testimonials', 'faq'])

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
    <AppHeader :form-url="FORM_URL" />

    <main id="main-content" role="main">
      <HeroSection          :form-url="FORM_URL" />
      <AboutSection         :form-url="FORM_URL" />
      <ServicesSection      :form-url="FORM_URL" />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection           :form-url="FORM_URL" />
    </main>

    <AppFooter   :form-url="FORM_URL" />

    <!-- Banners globais ──────────────────────────── -->
    <StickyBanner :form-url="FORM_URL" />
    <CookieBanner />
  </div>
</template>

<style lang="scss">
#app {
  @include flex-col;
  min-height: 100vh;
}

main {
  flex: 1;
  // Espaço para o StickyBanner não cobrir o footer
  padding-bottom: 0;
}
</style>