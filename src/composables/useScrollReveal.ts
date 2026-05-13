import { onMounted, onUnmounted, ref, type Ref } from 'vue'

interface ScrollRevealOptions {
  threshold?: number   // 0–1, quanto do elemento tem de estar visível
  rootMargin?: string  // margem extra (ex: '0px 0px -80px 0px')
  once?: boolean       // só anima uma vez?
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold  = 0.15,
    rootMargin = '0px 0px -60px 0px',
    once       = true,
  } = options

  const el         = ref<HTMLElement | null>(null)
  const isVisible  = ref(false)
  let   observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!el.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (once && observer && el.value) {
            observer.unobserve(el.value)
          }
        } else if (!once) {
          isVisible.value = false
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { el, isVisible }
}

// ─── Versão para múltiplos elementos (listas / cards) ─────
export function useScrollRevealList(options: ScrollRevealOptions = {}) {
  const {
    threshold  = 0.1,
    rootMargin = '0px 0px -40px 0px',
    once       = true,
  } = options

  const visibleItems  = ref<Set<number>>(new Set())
  const observers     = new Map<number, IntersectionObserver>()

  function observe(index: number, element: HTMLElement) {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visibleItems.value = new Set([...visibleItems.value, index])
          if (once) obs.unobserve(element)
        } else if (!once) {
          const next = new Set(visibleItems.value)
          next.delete(index)
          visibleItems.value = next
        }
      },
      { threshold, rootMargin }
    )

    obs.observe(element)
    observers.set(index, obs)
  }

  function isItemVisible(index: number): boolean {
    return visibleItems.value.has(index)
  }

  onUnmounted(() => {
    observers.forEach(obs => obs.disconnect())
  })

  return { observe, isItemVisible }
}