// src/composables/useScrollReveal.ts
import { onMounted, onUnmounted, ref } from 'vue'

interface Options {
  threshold?:  number
  rootMargin?: string
  once?:       boolean
}

// ── Observer partilhado (1 observer para todos os elementos) ──
// Muito mais eficiente do que 1 por elemento
let   sharedObserver: IntersectionObserver | null = null
const callbackMap = new WeakMap<Element, (visible: boolean) => void>()

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const cb = callbackMap.get(entry.target)
          if (cb) cb(entry.isIntersecting)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
  }
  return sharedObserver
}

// ── Verifica se elemento já está no viewport ──────────────────
function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()
  return (
    rect.top    < window.innerHeight * 1.1 &&
    rect.bottom > -50
  )
}

export function useScrollReveal(options: Options = {}) {
  const { once = true } = options

  const el        = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let   fallback:  ReturnType<typeof setTimeout> | null = null

  onMounted(() => {
    // Pequeno tick para garantir que o DOM está pronto
    requestAnimationFrame(() => {
      if (!el.value) {
        isVisible.value = true
        return
      }

      // Já está visível? Mostra imediatamente
      if (isInViewport(el.value)) {
        isVisible.value = true
        return
      }

      // Regista no observer partilhado
      const obs = getSharedObserver()

      callbackMap.set(el.value, (visible: boolean) => {
        if (visible) {
          isVisible.value = true
          if (once && el.value) {
            obs.unobserve(el.value)
            callbackMap.delete(el.value)
          }
        }
      })

      obs.observe(el.value)

      // Fallback: garante que aparece após 1.2s no máximo
      fallback = setTimeout(() => {
        if (!isVisible.value) isVisible.value = true
      }, 1200)
    })
  })

  onUnmounted(() => {
    if (fallback)  clearTimeout(fallback)
    if (el.value) {
      getSharedObserver().unobserve(el.value)
      callbackMap.delete(el.value)
    }
  })

  return { el, isVisible }
}

// ── Versão para listas de elementos ───────────────────────────
export function useScrollRevealList(options: Options = {}) {
  const { once = true } = options

  const visibleItems = ref<Set<number>>(new Set())
  const elementMap   = new Map<number, HTMLElement>()
  const fallbacks    = new Map<number, ReturnType<typeof setTimeout>>()

  function observe(index: number, element: HTMLElement) {
    // Evita registos duplicados
    if (elementMap.has(index)) return
    elementMap.set(index, element)

    requestAnimationFrame(() => {
      // Já visível? Mostra com stagger mínimo
      if (isInViewport(element)) {
        const t = setTimeout(() => {
          visibleItems.value = new Set([...visibleItems.value, index])
        }, index * 60)
        fallbacks.set(index, t)
        return
      }

      const obs = getSharedObserver()

      callbackMap.set(element, (visible: boolean) => {
        if (visible) {
          visibleItems.value = new Set([...visibleItems.value, index])
          clearTimeout(fallbacks.get(index))
          if (once) {
            obs.unobserve(element)
            callbackMap.delete(element)
          }
        }
      })

      obs.observe(element)

      // Fallback por item com stagger
      const t = setTimeout(() => {
        if (!visibleItems.value.has(index)) {
          visibleItems.value = new Set([...visibleItems.value, index])
        }
      }, 1200 + index * 80)

      fallbacks.set(index, t)
    })
  }

  function isItemVisible(index: number): boolean {
    return visibleItems.value.has(index)
  }

  onUnmounted(() => {
    fallbacks.forEach(t => clearTimeout(t))
    elementMap.forEach(el => {
      getSharedObserver().unobserve(el)
      callbackMap.delete(el)
    })
    elementMap.clear()
  })

  return { observe, isItemVisible }
}