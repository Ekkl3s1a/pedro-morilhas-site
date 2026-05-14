/*import { describe, it, expect } from 'vitest'
import { mount }                from '@vue/test-utils'
import BaseButton               from '@/components/ui/BaseButton.vue'

describe('BaseButton', () => {

  // ─── Renderização ───────────────────────────────────────
  describe('renderização', () => {
    it('renderiza o label corretamente', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Quero Começar' },
      })
      expect(wrapper.text()).toContain('Quero Começar')
    })

    it('renderiza como <button> por defeito', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Clica aqui' },
      })
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('renderiza como <a> quando tem href', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Link', href: 'https://example.com' },
      })
      expect(wrapper.element.tagName).toBe('A')
      expect(wrapper.attributes('href')).toBe('https://example.com')
    })

    it('aplica target="_blank" e rel="noopener noreferrer" em links externos', () => {
      const wrapper = mount(BaseButton, {
        props: {
          label:    'Form',
          href:     'https://forms.gle/EXEMPLO',
          external: true,
        },
      })
      expect(wrapper.attributes('target')).toBe('_blank')
      expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
    })
  })

  // ─── Variantes ──────────────────────────────────────────
  describe('variantes', () => {
    it('aplica classe btn--primary por defeito', () => {
      const wrapper = mount(BaseButton, { props: { label: 'Btn' } })
      expect(wrapper.classes()).toContain('btn--primary')
    })

    it('aplica classe btn--secondary corretamente', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Btn', variant: 'secondary' },
      })
      expect(wrapper.classes()).toContain('btn--secondary')
    })

    it('aplica classe btn--outline corretamente', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Btn', variant: 'outline' },
      })
      expect(wrapper.classes()).toContain('btn--outline')
    })

    it('aplica classe btn--ghost corretamente', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Btn', variant: 'ghost' },
      })
      expect(wrapper.classes()).toContain('btn--ghost')
    })
  })

  // ─── Tamanhos ───────────────────────────────────────────
  describe('tamanhos', () => {
    it('aplica classe btn--md por defeito', () => {
      const wrapper = mount(BaseButton, { props: { label: 'Btn' } })
      expect(wrapper.classes()).toContain('btn--md')
    })

    it('aplica classe btn--sm corretamente', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Btn', size: 'sm' },
      })
      expect(wrapper.classes()).toContain('btn--sm')
    })

    it('aplica classe btn--lg corretamente', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Btn', size: 'lg' },
      })
      expect(wrapper.classes()).toContain('btn--lg')
    })
  })

  // ─── Estados ────────────────────────────────────────────
  describe('estados', () => {
    it('aplica classe btn--disabled quando disabled=true', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Btn', disabled: true },
      })
      expect(wrapper.classes()).toContain('btn--disabled')
      expect(wrapper.attributes('aria-disabled')).toBe('true')
    })

    it('aplica classe btn--loading quando loading=true', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Btn', loading: true },
      })
      expect(wrapper.classes()).toContain('btn--loading')
      expect(wrapper.attributes('aria-busy')).toBe('true')
    })

    it('aplica classe btn--full quando fullWidth=true', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Btn', fullWidth: true },
      })
      expect(wrapper.classes()).toContain('btn--full')
    })

    it('mostra spinner quando loading=true', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Btn', loading: true },
      })
      expect(wrapper.find('.btn__spinner').exists()).toBe(true)
    })
  })

  // ─── Eventos ────────────────────────────────────────────
  describe('eventos', () => {
    it('emite evento click ao ser clicado', async () => {
      const wrapper = mount(BaseButton, { props: { label: 'Btn' } })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('não emite click quando disabled=true', async () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Btn', disabled: true },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('não emite click quando loading=true', async () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Btn', loading: true },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  // ─── Ícone ──────────────────────────────────────────────
  describe('ícone', () => {
    it('mostra ícone quando prop icon está definida', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Btn', icon: '🚀' },
      })
      expect(wrapper.find('.btn__icon').exists()).toBe(true)
      expect(wrapper.find('.btn__icon').text()).toBe('🚀')
    })

    it('não mostra ícone quando loading=true', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Btn', icon: '🚀', loading: true },
      })
      expect(wrapper.find('.btn__icon').exists()).toBe(false)
    })

    it('mostra seta ↗ em links externos', () => {
      const wrapper = mount(BaseButton, {
        props: {
          label:    'Link',
          href:     'https://example.com',
          external: true,
        },
      })
      expect(wrapper.find('.btn__arrow').exists()).toBe(true)
    })
  })
})*/