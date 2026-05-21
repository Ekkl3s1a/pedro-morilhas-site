<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
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
import CalculatorSection        from '@/components/sections/CalculatorSection.vue'
import BeforeAfterSection       from '@/components/sections/BeforeAfterSection.vue'
import BookingSection from '@/components/sections/BookingSection.vue'
import StickyBanner             from '@/components/ui/StickyBanner.vue'
import CookieBanner             from '@/components/ui/CookieBanner.vue'
import WhatsAppButton           from '@/components/ui/WhatsAppButton.vue'
import ScrollProgressBar        from '@/components/ui/ScrollProgressBar.vue'
import BottomNav                from '@/components/layout/BottomNav.vue'
import SchemaOrg                from '@/components/SchemaOrg.vue'

const CALENDLY_URL = 'https://calendly.com/pedro-morilhas/consulta-gratuita'
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdglTv_PWKJq7j1Y-aRTQ6IaoHbKX1t70DggsIgQAfuxCuRNA/viewform?usp=header'

const SECTION_IDS = [
  'hero',
  'about',
  'services',
  'calculator',
  'results',
  'stats',
  'testimonials',
  'faq',
  'booking',
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

const showSnapHint = computed(() => isSnapping.value)

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
    <SchemaOrg />
    <ScrollProgressBar />
    <AppHeader :form-url="FORM_URL" />

    <main id="main-content" role="main">
      <HeroSection
        :form-url="FORM_URL"
        :calendly-url="CALENDLY_URL"
      />
      <AboutSection         :form-url="FORM_URL" />
      <ServicesSection      :form-url="FORM_URL" />
      <CalculatorSection    :form-url="FORM_URL" />
      <BeforeAfterSection   :form-url="FORM_URL" />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection           :form-url="FORM_URL" />
      <BookingSection
        :calendly-url="CALENDLY_URL"
        :form-url="FORM_URL"
      />
    </main>

    <AppFooter   :form-url="FORM_URL" />

    <!-- Banners globais ──────────────────────────── -->
    <StickyBanner :form-url="FORM_URL" />
    <CookieBanner />
    <WhatsAppButton />
    <BottomNav />

    <!-- Snap indicator ───────────────────────────── -->
    <div
      class="snap-hint"
      :class="{ 'snap-hint--active': showSnapHint }"
      aria-hidden="true"
    ></div>
  </div>
</template>

<style lang="scss">
#app {
  @include flex-col;
  min-height: 100vh;
}

main {
  flex: 1;
}

// ── Previne scroll horizontal em mobile ─────────
body {
  overflow-x: hidden;
}

</style>