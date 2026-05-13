import { ref, onMounted, type Ref } from 'vue'

interface CounterOptions {
  duration?: number   // ms
  easing?:   'linear' | 'easeOut' | 'easeInOut'
}

export function useCounterAnimation(
  target:  number,
  trigger: Ref<boolean>,
  options: CounterOptions = {}
) {
  const { duration = 2000, easing = 'easeOut' } = options

  const current  = ref(0)
  let   started  = false

  // Funções de easing
  const easings = {
    linear:    (t: number) => t,
    easeOut:   (t: number) => 1 - Math.pow(1 - t, 3),
    easeInOut: (t: number) => t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2,
  }

  function start() {
    if (started) return
    started = true

    const startTime = performance.now()
    const easeFn    = easings[easing]

    function tick(now: number) {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = easeFn(progress)

      current.value = Math.round(eased * target)

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        current.value = target
      }
    }

    requestAnimationFrame(tick)
  }

  // Arranca quando o elemento fica visível
  onMounted(() => {
    const stop = setInterval(() => {
      if (trigger.value) {
        clearInterval(stop)
        start()
      }
    }, 50)
  })

  return { current }
}