<script setup lang="ts">
import { useUIStore } from '@/stores/ui.store'
import BaseButton     from '@/components/ui/BaseButton.vue'

const ui = useUIStore()
</script>

<template>
  <Transition name="cookie">
    <div
      v-if="!ui.isCookieAccepted"
      class="cookie"
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de cookies"
      aria-live="polite"
    >
      <div class="cookie__inner">

        <!-- Ícone ──────────────────────────────────── -->
        <span class="cookie__icon" aria-hidden="true">🍪</span>

        <!-- Texto ──────────────────────────────────── -->
        <div class="cookie__body">
          <p class="cookie__text">
            Utilizamos cookies para melhorar a tua experiência.
            Ao continuar, aceitas a nossa
            <a
              href="#"
              class="cookie__link"
              @click.prevent
            >
              Política de Privacidade
            </a>
            em conformidade com o
            <abbr title="Regulamento Geral sobre a Proteção de Dados">RGPD</abbr>.
          </p>
        </div>

        <!-- Ações ──────────────────────────────────── -->
        <div class="cookie__actions">
          <BaseButton
            label="Aceitar"
            variant="primary"
            size="sm"
            @click="ui.acceptCookies"
          />
          <BaseButton
            label="Recusar"
            variant="ghost"
            size="sm"
            @click="ui.acceptCookies"
          />
        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">


.cookie {
  position:   fixed;
  bottom:     $spacing-5;
  left:       $spacing-4;
  right:      $spacing-4;
  z-index:    $z-toast;
  max-width:  640px;
  margin:     0 auto;

  @include respond-to(md) {
    left:    $spacing-6;
    right:   auto;
    bottom:  $spacing-6;
    margin:  0;
  }

  &__inner {
    display:          flex;
    align-items:      center;
    gap:              $spacing-4;
    flex-wrap:        wrap;
    padding:          $spacing-4 $spacing-5;
    background:       rgba($color-primary, 0.97);
    backdrop-filter:  blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius:    $radius-xl;
    border:           1px solid rgba($color-white, 0.08);
    box-shadow:       $shadow-lg,
                      0 0 0 1px rgba($color-white, 0.03);

    @include respond-to(md) {
      flex-wrap: nowrap;
    }
  }

  // ─── Ícone ────────────────────────────────────────────
  &__icon {
    font-size:   1.8rem;
    flex-shrink: 0;
    line-height: 1;
  }

  // ─── Body ─────────────────────────────────────────────
  &__body {
    flex: 1;
    min-width: 0;
  }

  &__text {
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       rgba($color-white, 0.65);
    line-height: $line-height-loose;

    @include respond-to(md) {
      font-size: $font-size-sm;
    }
  }

  &__link {
    color:           $color-teal;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition:      $transition-fast;

    &:hover {
      color: color.adjust($color-teal, $lightness: 10%);
    }
  }

  // ─── Actions ──────────────────────────────────────────
  &__actions {
    display:     flex;
    gap:         $spacing-2;
    flex-shrink: 0;
  }
}

// ─── Transition ───────────────────────────────────────────
.cookie-enter-active,
.cookie-leave-active {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity   0.3s ease;
}

.cookie-enter-from,
.cookie-leave-to {
  transform: translateY(120%);
  opacity:   0;
}
</style>