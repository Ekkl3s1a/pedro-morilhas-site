/*import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper }                     from '@vue/test-utils'
import { createPinia, setActivePinia }           from 'pinia'
import AppHeader                                 from '@/components/layout/AppHeader.vue'

const FORM_URL = 'https://forms.gle/EXEMPLO'

// Mock do window.scrollTo para evitar erros no jsdom
vi.stubGlobal('scrollTo', vi.fn())

describe('AppHeader', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(AppHeader, {
      props: { formUrl: FORM_URL },
      global: {
        stubs: {
          // Stub do BaseButton para simplificar os testes
          BaseButton: {
            template: '<button v-bind="$attrs" @click="$emit(\'click\')">{{ label }}</button>',
            props:    ['label', 'href', 'external'],
            emits:    ['click'],
          },
        },
      },
    })
  })

  // ─── Renderização ─────────────────────────────────────
  describe('renderização', () => {
    it('renderiza o header com role="banner"', () => {
      expect(wrapper.find('[role="banner"]').exists()).toBe(true)
    })

    it('renderiza o logo com o nome correto', () => {
      expect(wrapper.find('.header__logo-name').text()).toBe('Pedro Morilhas')
    })

    it('renderiza o subtítulo do logo', () => {
      expect(wrapper.find('.header__logo-role').text()).toBe('Personal Trainer')
    })

    it('renderiza todos os links de navegação', () => {
      const links = wrapper.findAll('.header__nav-link')
      expect(links.length).toBe(6)
    })

    it('renderiza os labels de navegação corretos', () => {
      const links  = wrapper.findAll('.header__nav-link')
      const labels = links.map(l => l.text())
      expect(labels).toContain('Início')
      expect(labels).toContain('Sobre')
      expect(labels).toContain('Serviços')
      expect(labels).toContain('Resultados')
      expect(labels).toContain('Testemunhos')
      expect(labels).toContain('FAQ')
    })

    it('renderiza o botão "Quero Começar" no desktop', () => {
      const cta = wrapper.find('.header__cta button')
      expect(cta.exists()).toBe(true)
      expect(cta.text()).toContain('Quero Começar')
    })
  })

  // ─── Hamburger ────────────────────────────────────────
  describe('hamburger menu', () => {
    it('renderiza o botão hamburger', () => {
      const btn = wrapper.find('.header__hamburger')
      expect(btn.exists()).toBe(true)
    })

    it('tem aria-expanded="false" por defeito', () => {
      const btn = wrapper.find('.header__hamburger')
      expect(btn.attributes('aria-expanded')).toBe('false')
    })

    it('abre o menu mobile ao clicar', async () => {
      const btn = wrapper.find('.header__hamburger')
      await btn.trigger('click')
      expect(wrapper.find('#mobile-menu').exists()).toBe(true)
    })

    it('muda aria-expanded para "true" após abrir', async () => {
      const btn = wrapper.find('.header__hamburger')
      await btn.trigger('click')
      expect(btn.attributes('aria-expanded')).toBe('true')
    })

    it('adiciona classe --open ao hamburger quando aberto', async () => {
      const btn = wrapper.find('.header__hamburger')
      await btn.trigger('click')
      expect(btn.classes()).toContain('header__hamburger--open')
    })

    it('fecha o menu ao clicar novamente', async () => {
      const btn = wrapper.find('.header__hamburger')
      await btn.trigger('click') // abre
      await btn.trigger('click') // fecha
      expect(wrapper.find('#mobile-menu').exists()).toBe(false)
    })
  })

  // ─── Menu mobile ──────────────────────────────────────
  describe('menu mobile', () => {
    beforeEach(async () => {
      await wrapper.find('.header__hamburger').trigger('click')
    })

    it('renderiza os links no menu mobile', () => {
      const links = wrapper.findAll('.header__mobile-link')
      expect(links.length).toBe(6)
    })

    it('fecha o menu ao clicar num link', async () => {
      const link = wrapper.find('.header__mobile-link')
      await link.trigger('click')
      expect(wrapper.find('#mobile-menu').exists()).toBe(false)
    })

    it('renderiza o CTA no menu mobile', () => {
      const cta = wrapper.find('.header__mobile-cta button')
      expect(cta.exists()).toBe(true)
      expect(cta.text()).toContain('Quero Começar')
    })

    it('renderiza o backdrop quando o menu está aberto', () => {
      expect(wrapper.find('.header__backdrop').exists()).toBe(true)
    })

    it('fecha o menu ao clicar no backdrop', async () => {
      await wrapper.find('.header__backdrop').trigger('click')
      expect(wrapper.find('#mobile-menu').exists()).toBe(false)
    })
  })

  // ─── Scroll ───────────────────────────────────────────
  describe('scroll behavior', () => {
    it('não tem classe --scrolled por defeito (scrollY = 0)', () => {
      expect(wrapper.find('.header').classes()).not.toContain('header--scrolled')
    })
  })

  // ─── Acessibilidade ───────────────────────────────────
  describe('acessibilidade', () => {
    it('nav tem aria-label', () => {
      const nav = wrapper.find('nav[aria-label]')
      expect(nav.exists()).toBe(true)
    })

    it('hamburger tem aria-label', () => {
      const btn = wrapper.find('.header__hamburger')
      expect(btn.attributes('aria-label')).toBeTruthy()
    })

    it('hamburger tem aria-controls a apontar para mobile-menu', () => {
      const btn = wrapper.find('.header__hamburger')
      expect(btn.attributes('aria-controls')).toBe('mobile-menu')
    })

    it('logo tem aria-label', () => {
      const logo = wrapper.find('.header__logo')
      expect(logo.attributes('aria-label')).toBeTruthy()
    })
  })
})*/