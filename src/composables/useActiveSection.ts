import { onMounted, onUnmounted } from 'vue'
import { useUIStore } from '@/stores/ui.store'

// Deteta qual secção está no viewport e atualiza o store
// (útil para highlight do menu de navegação)
export function useActiveSection(sectionIds: string[]) {
  const ui = useUIStore()
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ui.setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer!.observe(el)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}