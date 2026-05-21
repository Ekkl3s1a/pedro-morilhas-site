<script setup lang="ts">
import { useUIStore }  from '@/stores/ui.store'
import { useWhatsApp } from '@/composables/useWhatsApp'

const ui           = useUIStore()
const { buildUrl } = useWhatsApp()

const MSG = 'Olá Pedro! Gostava de saber mais sobre o teu trabalho.'

interface NavItem {
  id:    string
  label: string
  icon:  string
  href?: string
  wa?:   boolean
}

const items: NavItem[] = [
  { id: 'hero',         label: 'Início',   icon: '🏠', href: '#hero'         },
  { id: 'about',        label: 'Sobre',    icon: '👤', href: '#about'        },
  { id: 'services',     label: 'Serviços', icon: '💪', href: '#services'     },
  { id: 'testimonials', label: 'Reviews',  icon: '⭐', href: '#testimonials' },
  { id: 'whatsapp',     label: 'Contacto', icon: '💬', wa: true              },
]

const isActive = (id: string) => ui.activeSection === id

function navigate(item: NavItem) {
  if (item.wa) {
    window.open(buildUrl(MSG), '_blank', 'noopener,noreferrer')
    return
  }

  if (!item.href) return

  const target = document.querySelector(item.href)
  if (!target)  return

  const top = target.getBoundingClientRect().top
    + window.scrollY
    - 60 // header mobile height

  window.scrollTo({ top, behavior: 'smooth' })
}
</script>

<template>
  <nav
    class="bottom-nav"
    aria-label="Navegação principal mobile"
    role="navigation"
  >
    <ul class="bottom-nav__list" role="list">
      <li
        v-for="item in items"
        :key="item.id"
        class="bottom-nav__item"
      >
        <button
          class="bottom-nav__btn"
          :class="{
            'bottom-nav__btn--active': isActive(item.id),
            'bottom-nav__btn--wa':     item.wa,
          }"
          :aria-label="item.label"
          :aria-current="isActive(item.id) ? 'page' : undefined"
          @click="navigate(item)"
        >
          <!-- Ícone WhatsApp SVG para o botão de contacto -->
          <template v-if="item.wa">
            <span class="bottom-nav__wa-wrap">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                class="bottom-nav__wa-icon"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </span>
          </template>

          <template v-else>
            <span class="bottom-nav__icon" aria-hidden="true">
              {{ item.icon }}
            </span>
          </template>

          <span class="bottom-nav__label">{{ item.label }}</span>

          <!-- Indicador activo -->
          <span
            v-if="isActive(item.id)"
            class="bottom-nav__dot"
            aria-hidden="true"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.bottom-nav {
  display:  none;
  position: fixed;
  bottom:   0;
  left:     0;
  right:    0;
  z-index:  $z-sticky;

  // Safe area para iPhone com home indicator
  padding-bottom: env(safe-area-inset-bottom);

  background:      rgba($color-primary, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top:      1px solid rgba($color-white, 0.07);
  box-shadow:      0 -2px 16px rgba(15, 23, 36, 0.25);

  @include mobile-only {
    display: block;
  }

  // ─── List ─────────────────────────────────────────────
  &__list {
    display:         flex;
    align-items:     stretch;
    justify-content: space-around;
    height:          60px;
  }

  // ─── Item ─────────────────────────────────────────────
  &__item {
    flex: 1;
  }

  // ─── Button ───────────────────────────────────────────
  &__btn {
    width:           100%;
    height:          100%;
    @include flex-col;
    align-items:     center;
    justify-content: center;
    gap:             3px;
    background:      none;
    border:          none;
    cursor:          pointer;
    position:        relative;
    padding:         $spacing-2 0;
    transition:      $transition-base;
    -webkit-tap-highlight-color: transparent;

    &:active {
      transform: scale(0.92);
    }

    &--active {
      .bottom-nav__icon {
        transform: translateY(-2px) scale(1.15);
      }
      .bottom-nav__label {
        color: $color-accent;
      }
    }

    // WhatsApp button — destaque especial
    &--wa {
      .bottom-nav__wa-wrap {
        background:    #25D366;
        border-radius: $radius-full;
        width:         30px;
        height:        30px;
        @include flex-center;
        box-shadow:    0 2px 10px rgba(37, 211, 102, 0.4);
        transition:    $transition-spring;
        margin-top:    -4px;
      }

      &:active .bottom-nav__wa-wrap {
        transform: scale(0.9);
      }
    }
  }

  // ─── Icon ─────────────────────────────────────────────
  &__icon {
    font-size:   1.3rem;
    line-height: 1;
    transition:  transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &__wa-icon {
    width:  18px;
    height: 18px;
    color:  $color-white;
  }

  // ─── Label ────────────────────────────────────────────
  &__label {
    font-family:    $font-heading;
    font-size:      9px;
    font-weight:    $font-weight-semibold;
    color:          rgba($color-white, 0.45);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition:     color 0.2s ease;
    line-height:    1;
  }

  // ─── Active dot ───────────────────────────────────────
  &__dot {
    position:      absolute;
    bottom:        4px;
    left:          50%;
    transform:     translateX(-50%);
    width:         4px;
    height:        4px;
    border-radius: $radius-full;
    background:    $color-accent;
    animation:     scaleIn 0.2s ease both;
  }
}
</style>