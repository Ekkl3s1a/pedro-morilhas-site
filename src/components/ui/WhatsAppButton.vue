<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useWhatsApp } from '@/composables/useWhatsApp'
import { useUIStore }  from '@/stores/ui.store'

const { buildUrl } = useWhatsApp()
const ui           = useUIStore()

const MSG = 'Olá Pedro! Gostava de saber mais sobre o teu trabalho.'

// Mostra o botão após 3 segundos
const isVisible  = ref(false)
// Tooltip "Fala comigo!" aparece na primeira visita
const showTooltip = ref(false)
let   tooltipTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  setTimeout(() => {
    isVisible.value   = true
    showTooltip.value = true

    // Esconde o tooltip após 4 segundos
    tooltipTimer = setTimeout(() => {
      showTooltip.value = false
    }, 4000)
  }, 3000)
})

onUnmounted(() => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
})

function dismissTooltip() {
  showTooltip.value = false
  if (tooltipTimer) clearTimeout(tooltipTimer)
}
</script>

<template>
  <Transition name="whatsapp-btn">
    <div
      v-if="isVisible"
      class="wa-fab"
      :class="{ 'wa-fab--menu-open': ui.isMobileMenuOpen }"
    >
      <!-- Tooltip ─────────────────────────────────────── -->
      <Transition name="tooltip">
        <div
          v-if="showTooltip"
          class="wa-fab__tooltip"
          role="tooltip"
        >
          <span>💬 Fala comigo!</span>
          <button
            class="wa-fab__tooltip-close"
            aria-label="Fechar"
            @click="dismissTooltip"
          >
            ✕
          </button>
        </div>
      </Transition>

      <!-- Botão principal ─────────────────────────────── -->
      <a
        :href="buildUrl(MSG)"
        target="_blank"
        rel="noopener noreferrer"
        class="wa-fab__btn"
        aria-label="Contactar via WhatsApp"
        @click="dismissTooltip"
      >
        <!-- Pulse ring -->
        <span class="wa-fab__ring" aria-hidden="true" />

        <!-- Ícone WhatsApp SVG -->
        <svg
          class="wa-fab__icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.wa-fab {
  position:  fixed;
  bottom:    $spacing-6;
  right:     $spacing-5;
  z-index:   $z-sticky;
  display:   flex;
  align-items: flex-end;
  flex-direction: column;
  gap:       $spacing-2;

  // Esconde quando o menu mobile está aberto
  &--menu-open {
    display: none;
  }

  // Esconde no mobile — o BottomNav já tem o botão WhatsApp
  @include mobile-only {
    display: none;
  }

  @include respond-to(md) {
    bottom: $spacing-8;
    right:  $spacing-8;
  }

  // ─── Tooltip ────────────────────────────────────────
  &__tooltip {
    display:       flex;
    align-items:   center;
    gap:           $spacing-2;
    background:    $color-white;
    border-radius: $radius-lg;
    padding:       $spacing-2 $spacing-3;
    box-shadow:    $shadow-lg;
    white-space:   nowrap;
    font-family:   $font-body;
    font-size:     $font-size-sm;
    font-weight:   $font-weight-medium;
    color:         $color-text-dark;
    border:        1px solid $color-neutral-200;
  }

  &__tooltip-close {
    width:         18px;
    height:        18px;
    border-radius: $radius-full;
    background:    $color-neutral-200;
    border:        none;
    @include flex-center;
    font-size:     9px;
    color:         $color-text-muted;
    cursor:        pointer;
    transition:    $transition-fast;
    flex-shrink:   0;
    padding:       0;

    &:hover {
      background: color.adjust($color-neutral-200, $lightness: -10%);
    }
  }

  // ─── Botão ──────────────────────────────────────────
  &__btn {
    position:      relative;
    width:         56px;
    height:        56px;
    border-radius: $radius-full;
    background:    #25D366; // WhatsApp green
    @include flex-center;
    text-decoration: none;
    box-shadow:    0 4px 24px rgba(37, 211, 102, 0.45);
    transition:    $transition-spring;

    &:hover {
      transform:  scale(1.08) translateY(-2px);
      box-shadow: 0 8px 32px rgba(37, 211, 102, 0.55);
    }

    &:active {
      transform: scale(0.96);
    }

    @include respond-to(md) {
      width:  60px;
      height: 60px;
    }
  }

  // ─── Pulse ring ─────────────────────────────────────
  &__ring {
    position:      absolute;
    inset:         -4px;
    border-radius: $radius-full;
    border:        2px solid rgba(37, 211, 102, 0.5);
    animation:     wa-pulse 2.5s ease-out infinite;
  }

  // ─── Ícone ──────────────────────────────────────────
  &__icon {
    width:  28px;
    height: 28px;
    color:  $color-white;
    position: relative;
    z-index: 1;

    @include respond-to(md) {
      width:  30px;
      height: 30px;
    }
  }
}

// ─── Animations ───────────────────────────────────────────
@keyframes wa-pulse {
  0%   { transform: scale(1);    opacity: 0.8; }
  70%  { transform: scale(1.35); opacity: 0;   }
  100% { transform: scale(1.35); opacity: 0;   }
}

// Entrada do botão
.whatsapp-btn-enter-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.whatsapp-btn-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.whatsapp-btn-enter-from,
.whatsapp-btn-leave-to {
  opacity:   0;
  transform: scale(0.5) translateY(20px);
}

// Tooltip
.tooltip-enter-active {
  transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.tooltip-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.tooltip-enter-from,
.tooltip-leave-to {
  opacity:   0;
  transform: translateX(8px) scale(0.95);
}
</style>