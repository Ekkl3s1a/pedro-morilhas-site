// src/composables/useSwipe.ts
import { ref, onUnmounted } from 'vue'

interface SwipeOptions {
  threshold?: number    // px mínimos para considerar swipe (default: 50)
  onSwipeLeft?:  () => void
  onSwipeRight?: () => void
}

export function useSwipe(options: SwipeOptions = {}) {
  const {
    threshold    = 50,
    onSwipeLeft,
    onSwipeRight,
  } = options

  const isSwiping  = ref(false)
  const startX     = ref(0)
  const startY     = ref(0)
  const deltaX     = ref(0)

  // ref do elemento a observar
  const elRef = ref<HTMLElement | null>(null)

  function onTouchStart(e: TouchEvent) {
    startX.value  = e.touches[0].clientX
    startY.value  = e.touches[0].clientY
    deltaX.value  = 0
    isSwiping.value = true
  }

  function onTouchMove(e: TouchEvent) {
    if (!isSwiping.value) return

    const dx = e.touches[0].clientX - startX.value
    const dy = e.touches[0].clientY - startY.value

    // Se o movimento for mais vertical que horizontal, ignora
    if (Math.abs(dy) > Math.abs(dx) * 1.5) {
      isSwiping.value = false
      return
    }

    deltaX.value = dx

    // Previne scroll vertical acidental durante swipe horizontal
    if (Math.abs(dx) > 10) e.preventDefault()
  }

  function onTouchEnd() {
    if (!isSwiping.value) return

    const d = deltaX.value

    if (d < -threshold && onSwipeLeft)  onSwipeLeft()
    if (d >  threshold && onSwipeRight) onSwipeRight()

    isSwiping.value = false
    deltaX.value    = 0
  }

  // Adiciona listeners ao elemento
  function attach(el: HTMLElement) {
    elRef.value = el
    el.addEventListener('touchstart', onTouchStart, { passive: true  })
    el.addEventListener('touchmove',  onTouchMove,  { passive: false })
    el.addEventListener('touchend',   onTouchEnd,   { passive: true  })
  }

  function detach() {
    if (!elRef.value) return
    elRef.value.removeEventListener('touchstart', onTouchStart)
    elRef.value.removeEventListener('touchmove',  onTouchMove)
    elRef.value.removeEventListener('touchend',   onTouchEnd)
  }

  onUnmounted(detach)

  return { attach, detach, isSwiping, deltaX }
}