// src/composables/useSnapScroll.ts
import { onMounted, onUnmounted, ref } from 'vue'

interface SnapScrollOptions {
  sectionIds:        string[]
  threshold?:        number  // % visível para disparar (default: 0.65)
  debounce?:         number  // ms após parar de scrollar (default: 320)
  mobileBreakpoint?: number  // só ativa abaixo deste width (default: 768)
  headerHeight?:     number  // offset do header fixo (default: 60)
  velocityThreshold?: number // ignora snap se utilizador scrollou rápido
  snapCooldown?:     number  // ms entre snaps consecutivos (default: 900)
}

export function useSnapScroll(options: SnapScrollOptions) {
  const {
    sectionIds,
    threshold         = 0.65,  // 65% — mais conservador
    debounce          = 320,    // mais tempo para parar
    mobileBreakpoint  = 768,
    headerHeight      = 60,
    velocityThreshold = 8,      // px/ms — ignora se scrollou rápido
    snapCooldown      = 900,    // evita snaps consecutivos
  } = options

  const isSnapping  = ref(false)
  const activeSnap  = ref<string | null>(null)

  let scrollTimer:   ReturnType<typeof setTimeout> | null = null
  let lastScrollY    = 0
  let lastScrollTime = Date.now()
  let lastSnapTime   = 0
  let scrollVelocity = 0

  // ── Calcula visibilidade da section no viewport ──────────
  function getVisibleRatio(el: HTMLElement): number {
    const rect    = el.getBoundingClientRect()
    const viewTop = headerHeight
    const viewBot = window.innerHeight

    // Pixels visíveis dentro da área útil
    const visTop = Math.max(viewTop, rect.top)
    const visBot = Math.min(viewBot, rect.bottom)
    const visPx  = Math.max(0, visBot - visTop)

    // Relativo à height da section (máx = altura do viewport útil)
    const refH = Math.min(rect.height, viewBot - viewTop)
    return refH > 0 ? visPx / refH : 0
  }

  // ── Section já está corretamente posicionada? ────────────
  function isAlreadyAligned(el: HTMLElement): boolean {
    const rect   = el.getBoundingClientRect()
    const target = headerHeight
    return Math.abs(rect.top - target) < 32 // tolerância de 32px
  }

  // ── Scroll suave para a section ──────────────────────────
  function snapTo(id: string) {
    const el  = document.getElementById(id)
    if (!el)  return

    if (isAlreadyAligned(el)) return
    if (isSnapping.value)     return

    // Respeita cooldown entre snaps
    const now = Date.now()
    if (now - lastSnapTime < snapCooldown) return

    isSnapping.value = true
    activeSnap.value = id
    lastSnapTime     = now

    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight
    window.scrollTo({ top, behavior: 'smooth' })

    setTimeout(() => {
      isSnapping.value = false
    }, 750)
  }

  // ── Avalia se deve fazer snap ─────────────────────────────
  function evaluate() {
    // Só em mobile
    if (window.innerWidth >= mobileBreakpoint) return
    if (isSnapping.value) return

    // Ignora se o utilizador scrollou com muita velocidade
    // (deixa o scroll natural acontecer)
    if (Math.abs(scrollVelocity) > velocityThreshold) return

    let bestId    = ''
    let bestRatio = threshold // mínimo para snap

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return

      const ratio = getVisibleRatio(el)

      // Só considera sections que estão "quase no topo"
      const rect      = el.getBoundingClientRect()
      const nearTop   = rect.top > headerHeight - 80 &&
                        rect.top < window.innerHeight * 0.55

      if (ratio > bestRatio && nearTop) {
        bestRatio = ratio
        bestId    = id
      }
    })

    if (bestId) snapTo(bestId)
  }

  // ── Scroll handler ────────────────────────────────────────
  function handleScroll() {
    if (isSnapping.value) return

    // Calcula velocidade do scroll
    const now     = Date.now()
    const elapsed = now - lastScrollTime
    if (elapsed > 0) {
      scrollVelocity = Math.abs(window.scrollY - lastScrollY) / elapsed
    }

    lastScrollY    = window.scrollY
    lastScrollTime = now

    // Reset do debounce a cada evento de scroll
    if (scrollTimer) clearTimeout(scrollTimer)
    scrollTimer = setTimeout(evaluate, debounce)
  }

  onMounted(() => {
    lastScrollY = window.scrollY
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (scrollTimer) clearTimeout(scrollTimer)
  })

  return { isSnapping, activeSnap }
}