<script setup lang="ts">
import { computed } from 'vue'
import type { NavLink } from '@/types'
import { useUIStore } from '@/stores/ui.store'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  formUrl: string
}

defineProps<Props>()

const ui = useUIStore()

const navLinks: NavLink[] = [
  { label: 'Início',        href: '#hero'          },
  { label: 'Sobre',         href: '#about'         },
  { label: 'Serviços',      href: '#services'      },
  { label: 'Resultados',    href: '#stats'         },
  { label: 'Testemunhos',   href: '#testimonials'  },
  { label: 'FAQ',           href: '#faq'           },
]

function handleNavClick(href: string) {
  ui.closeMobileMenu()

  // Smooth scroll manual (mais controlo que CSS scroll-behavior)
  const target = document.querySelector(href)
  if (!target) return

  const offset = 80 // altura do header
  const top    = target.getBoundingClientRect().top + window.scrollY - offset

  window.scrollTo({ top, behavior: 'smooth' })
}

const isActive = (href: string) =>
  ui.activeSection === href.replace('#', '')
</script>

<template>
  <header
    :class="[
      'header',
      { 'header--scrolled': ui.isHeaderScrolled },
      { 'header--menu-open': ui.isMobileMenuOpen },
    ]"
    role="banner"
  >
    <div class="header__inner container">

      <!-- Logo ─────────────────────────────────────────── -->
      <a
        href="#hero"
        class="header__logo"
        aria-label="Pedro Morilhas — Personal Trainer, ir para o início"
        @click.prevent="handleNavClick('#hero')"
      >
        <span class="header__logo-icon" aria-hidden="true">⚡</span>
        <div class="header__logo-text">
          <span class="header__logo-name">Pedro Morilhas</span>
          <span class="header__logo-role">Personal Trainer</span>
        </div>
      </a>

      <!-- Nav desktop ──────────────────────────────────── -->
      <nav class="header__nav" aria-label="Navegação principal">
        <ul class="header__nav-list" role="list">
          <li
            v-for="link in navLinks"
            :key="link.href"
            class="header__nav-item"
          >
            <a
              :href="link.href"
              :class="[
                'header__nav-link',
                { 'header__nav-link--active': isActive(link.href) }
              ]"
              @click.prevent="handleNavClick(link.href)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- CTA desktop ──────────────────────────────────── -->
      <div class="header__cta">
        <BaseButton
          label="Quero Começar"
          variant="primary"
          size="sm"
          :href="formUrl"
          :external="true"
        />
      </div>

      <!-- Hamburger mobile ─────────────────────────────── -->
      <button
        class="header__hamburger"
        :class="{ 'header__hamburger--open': ui.isMobileMenuOpen }"
        :aria-expanded="ui.isMobileMenuOpen"
        aria-controls="mobile-menu"
        :aria-label="ui.isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="ui.toggleMobileMenu"
      >
        <span class="header__hamburger-bar" />
        <span class="header__hamburger-bar" />
        <span class="header__hamburger-bar" />
      </button>
    </div>

    <!-- Menu mobile ──────────────────────────────────────── -->
    <Transition name="menu">
      <div
        v-if="ui.isMobileMenuOpen"
        id="mobile-menu"
        class="header__mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <nav aria-label="Navegação mobile">
          <ul class="header__mobile-list" role="list">
            <li
              v-for="(link, index) in navLinks"
              :key="link.href"
              class="header__mobile-item"
              :style="{ '--i': index }"
            >
              <a
                :href="link.href"
                :class="[
                  'header__mobile-link',
                  { 'header__mobile-link--active': isActive(link.href) }
                ]"
                @click.prevent="handleNavClick(link.href)"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div class="header__mobile-cta">
          <BaseButton
            label="Quero Começar"
            variant="primary"
            size="lg"
            :href="formUrl"
            :external="true"
            :full-width="true"
            @click="ui.closeMobileMenu"
          />
        </div>
      </div>
    </Transition>
  </header>

  <!-- Overlay backdrop ──────────────────────────────────── -->
  <Transition name="fade">
    <div
      v-if="ui.isMobileMenuOpen"
      class="header__backdrop"
      aria-hidden="true"
      @click="ui.closeMobileMenu"
    />
  </Transition>
</template>

<style scoped lang="scss">
// ─── Header base ────────────────────────────────────────────
.header {
  position:   fixed;
  top:        0;
  left:       0;
  right:      0;
  height:     $header-height;
  z-index:    $z-header;
  transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;

  // Estado inicial — transparente sobre o Hero
  background:      transparent;

  // Após scroll — fundo escuro com blur
  &--scrolled {
    background:     rgba($color-primary, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow:     0 1px 0 rgba(255, 255, 255, 0.06);
  }

  // ─── Inner ──────────────────────────────────────────────
  &__inner {
    height:  100%;
    @include flex-between;
    gap:     $spacing-4;
  }

  // ─── Logo ───────────────────────────────────────────────
  &__logo {
    display:         flex;
    align-items:     center;
    gap:             $spacing-3;
    text-decoration: none;
    flex-shrink:     0;
    transition:      $transition-base;

    &:hover {
      opacity: 0.85;
      transform: translateX(2px);
    }
  }

  &__logo-icon {
    font-size: 1.6rem;
    line-height: 1;
    filter: drop-shadow(0 0 8px rgba($color-accent, 0.6));
  }

  &__logo-text {
    @include flex-col;
    gap: 1px;
  }

  &__logo-name {
    font-family:    $font-heading;
    font-size:      $font-size-base;
    font-weight:    $font-weight-extrabold;
    color:          $color-white;
    line-height:    1.1;
    letter-spacing: -0.01em;
  }

  &__logo-role {
    font-family:    $font-body;
    font-size:      $font-size-xs;
    font-weight:    $font-weight-medium;
    color:          $color-accent;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  // ─── Nav desktop ────────────────────────────────────────
  &__nav {
    display: none;

    @include respond-to(lg) {
      display: flex;
      flex: 1;
      justify-content: center;
    }
  }

  &__nav-list {
    display:     flex;
    align-items: center;
    gap:         $spacing-1;
  }

  &__nav-link {
    position:       relative;
    display:        block;
    padding:        $spacing-2 $spacing-3;
    font-family:    $font-heading;
    font-size:      $font-size-sm;
    font-weight:    $font-weight-semibold;
    color:          rgba($color-white, 0.75);
    text-decoration: none;
    border-radius:  $radius-md;
    transition:     $transition-base;
    letter-spacing: 0.01em;

    // Underline animado
    &::after {
      content:          '';
      position:         absolute;
      bottom:           4px;
      left:             $spacing-3;
      right:            $spacing-3;
      height:           2px;
      background:       $gradient-cta;
      border-radius:    $radius-full;
      transform:        scaleX(0);
      transform-origin: left;
      transition:       transform 0.25s ease;
    }

    &:hover {
      color:      $color-white;
      background: rgba($color-white, 0.06);

      &::after {
        transform: scaleX(1);
      }
    }

    &--active {
      color: $color-white;

      &::after {
        transform: scaleX(1);
      }
    }
  }

  // ─── CTA desktop ────────────────────────────────────────
  &__cta {
    display:     none;
    flex-shrink: 0;

    @include respond-to(lg) {
      display: block;
    }
  }

  // ─── Hamburger ──────────────────────────────────────────
  &__hamburger {
    display:        flex;
    flex-direction: column;
    justify-content: center;
    gap:            5px;
    width:          40px;
    height:         40px;
    padding:        $spacing-2;
    border-radius:  $radius-md;
    cursor:         pointer;
    transition:     $transition-base;
    flex-shrink:    0;

    &:hover {
      background: rgba($color-white, 0.08);
    }

    @include respond-to(lg) {
      display: none;
    }
  }

  &__hamburger-bar {
    display:       block;
    width:         100%;
    height:        2px;
    background:    $color-white;
    border-radius: $radius-full;
    transition:    transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
    transform-origin: center;
  }

  // Animação X quando aberto
  &__hamburger--open {
    .header__hamburger-bar {
      &:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
      }
      &:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }

  // ─── Menu mobile ────────────────────────────────────────
  &__mobile {
    position:   absolute;
    top:        $header-height;
    left:       0;
    right:      0;
    background: rgba($color-primary, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba($color-white, 0.06);
    padding:    $spacing-6;
    @include flex-col;
    gap:        $spacing-6;

    @include respond-to(lg) {
      display: none;
    }
  }

  &__mobile-list {
    @include flex-col;
    gap: $spacing-1;
  }

  &__mobile-item {
    animation: slideInLeft 0.35s ease both;
    animation-delay: calc(var(--i) * 0.06s);
  }

  &__mobile-link {
    display:        block;
    padding:        $spacing-3 $spacing-4;
    font-family:    $font-heading;
    font-size:      $font-size-lg;
    font-weight:    $font-weight-semibold;
    color:          rgba($color-white, 0.8);
    text-decoration: none;
    border-radius:  $radius-md;
    border-left:    3px solid transparent;
    transition:     $transition-base;

    &:hover,
    &--active {
      color:        $color-white;
      background:   rgba($color-white, 0.06);
      border-color: $color-accent;
      padding-left: $spacing-5;
    }
  }

  &__mobile-cta {
    padding-top: $spacing-4;
    border-top:  1px solid rgba($color-white, 0.08);
  }

  // ─── Backdrop ───────────────────────────────────────────
  &__backdrop {
    position:   fixed;
    inset:      0;
    background: rgba($color-primary, 0.5);
    z-index:    calc(#{$z-header} - 1);
    backdrop-filter: blur(2px);
  }
}

// ─── Transitions ──────────────────────────────────────────
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.25s ease, transform 0.3s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity:   0;
  transform: translateY(-12px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>