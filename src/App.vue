<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useUIStore }           from '@/stores/ui.store'
import { useActiveSection }     from '@/composables/useActiveSection'
import { useSnapScroll }        from '@/composables/useSnapScroll'
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

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdglTv_PWKJq7j1Y-aRTQ6IaoHbKX1t70DggsIgQAfuxCuRNA/viewform?usp=header'

const SECTION_IDS = [
  'hero',
  'about',
  'services',
  'stats',
  'testimonials',
  'faq',
]

const ui = useUIStore()
useActiveSection(SECTION_IDS)

// ── Snap scroll (só mobile) ──────────────────────────────
const { isSnapping } = useSnapScroll({
  sectionIds:         SECTION_IDS,
  threshold:          0.65,   // 65% visível → mais conservador
  debounce:           320,    // mais tempo para parar
  mobileBreakpoint:   768,
  headerHeight:       60,
  velocityThreshold:  8,      // ignora scrolls rápidos
  snapCooldown:       900,    // 0.9s entre snaps
})

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

// ── Previne scroll horizontal em mobile ─────────
body {
  overflow-x: hidden;
}

</style>