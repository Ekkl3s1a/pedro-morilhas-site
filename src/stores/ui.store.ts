import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUIStore = defineStore('ui', () => {

  // ─── Estado ─────────────────────────────────────────────
  const isMobileMenuOpen  = ref(false)
  const isCookieAccepted  = ref(false)
  const isStickyVisible   = ref(false)
  const scrollY           = ref(0)
  const activeSection     = ref('')

  // ─── Computed ───────────────────────────────────────────
  const isHeaderScrolled = computed(() => scrollY.value > 80)
  const showStickyBanner = computed(
    () => isStickyVisible.value && !isCookieAccepted.value
  )

  // ─── Actions ────────────────────────────────────────────
  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    // Bloqueia scroll do body quando menu aberto
    document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
    document.body.style.overflow = ''
  }

  function acceptCookies() {
    isCookieAccepted.value = true
    localStorage.setItem('cookies-accepted', 'true')
  }

  function checkCookies() {
    isCookieAccepted.value = !!localStorage.getItem('cookies-accepted')
  }

  function updateScroll(y: number) {
    scrollY.value = y
    // Mostra sticky banner depois de passar o Hero (~100vh)
    isStickyVisible.value = y > window.innerHeight * 0.8
  }

  function setActiveSection(id: string) {
    activeSection.value = id
  }

  return {
    // state
    isMobileMenuOpen,
    isCookieAccepted,
    isStickyVisible,
    scrollY,
    activeSection,
    // computed
    isHeaderScrolled,
    showStickyBanner,
    // actions
    toggleMobileMenu,
    closeMobileMenu,
    acceptCookies,
    checkCookies,
    updateScroll,
    setActiveSection,
  }
})