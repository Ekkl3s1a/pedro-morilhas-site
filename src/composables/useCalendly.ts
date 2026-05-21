// src/composables/useCalendly.ts
import { onMounted, onUnmounted, ref } from 'vue'

interface CalendlyEvent {
  event:    string
  payload?: {
    event?:   { uri: string }
    invitee?: { uri: string; name: string; email: string }
  }
}

export function useCalendly(calendlyUrl: string) {
  const isScriptLoaded = ref(false)
  const isOpen         = ref(false)
  let   mutationObs:   MutationObserver | null = null

  // ── Carrega o script lazy ────────────────────────────
  function loadScript(): Promise<void> {
    return new Promise((resolve) => {
      if (document.getElementById('calendly-script')) {
        isScriptLoaded.value = true
        resolve()
        return
      }

      const link  = document.createElement('link')
      link.rel    = 'stylesheet'
      link.href   = 'https://assets.calendly.com/assets/external/widget.css'
      document.head.appendChild(link)

      const script   = document.createElement('script')
      script.id      = 'calendly-script'
      script.src     = 'https://assets.calendly.com/assets/external/widget.js'
      script.async   = true
      script.onload  = () => {
        isScriptLoaded.value = true
        resolve()
      }
      document.head.appendChild(script)
    })
  }

  // ── Observa o DOM para detetar quando o overlay fecha ─
  // O Calendly não emite evento ao fechar — usamos MutationObserver
  function watchForClose() {
    mutationObs?.disconnect()

    mutationObs = new MutationObserver(() => {
      const overlay = document.querySelector('.calendly-overlay')
      if (!overlay && isOpen.value) {
        // Overlay foi removido → modal fechado
        isOpen.value = false
        mutationObs?.disconnect()
        mutationObs = null
      }
    })

    mutationObs.observe(document.body, {
      childList: true,
      subtree:   false, // só filhos diretos do body
    })
  }

  // ── Abre o modal ─────────────────────────────────────
  async function openModal(prefill?: {
    name?:  string
    email?: string
  }) {
    await loadScript()
    if (!window.Calendly) return

    isOpen.value = true

    window.Calendly.initPopupWidget({
      url:     calendlyUrl,
      prefill: prefill ?? {},
      utm: {
        utmSource:   'website',
        utmMedium:   'cta_button',
        utmCampaign: 'pedro_morilhas_site',
      },
    })

    // Pequeno delay para o overlay ser injetado no DOM
    setTimeout(watchForClose, 300)
  }

  // ── Fecha programaticamente ──────────────────────────
  function closeModal() {
    isOpen.value = false
    mutationObs?.disconnect()
    mutationObs = null
    const overlay = document.querySelector('.calendly-overlay')
    if (overlay) overlay.remove()
  }

  // ── Eventos do Calendly (via postMessage) ────────────
  function handleCalendlyEvent(e: MessageEvent<CalendlyEvent>) {
    if (!e.data?.event?.startsWith('calendly')) return

    if (e.data.event === 'calendly.event_scheduled') {
      isOpen.value = false
      mutationObs?.disconnect()
      console.info('✅ Consulta marcada:', e.data.payload?.invitee?.name)
    }
  }

  onMounted(() => {
    window.addEventListener('message', handleCalendlyEvent)
  })

  onUnmounted(() => {
    window.removeEventListener('message', handleCalendlyEvent)
    mutationObs?.disconnect()
    closeModal()
  })

  return { openModal, closeModal, isOpen, isScriptLoaded }
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url:      string
        prefill?: Record<string, unknown>
        utm?:     Record<string, string>
      }) => void
      closePopupWidget: () => void
      initInlineWidget: (options: {
        url:           string
        parentElement: HTMLElement
        prefill?:      Record<string, unknown>
      }) => void
    }
  }
}