const WHATSAPP_NUMBER = '351966810082'

export function useWhatsApp() {
  function buildUrl(message: string): string {
    const encoded = encodeURIComponent(message.trim())
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
  }

  function openWhatsApp(message: string): void {
    window.open(buildUrl(message), '_blank', 'noopener,noreferrer')
  }

  return { buildUrl, openWhatsApp }
}