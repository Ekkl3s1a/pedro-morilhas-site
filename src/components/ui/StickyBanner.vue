<script setup lang="ts">
import { ref } from 'vue'
import { useUIStore } from '@/stores/ui.store'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  formUrl: string
}

defineProps<Props>()

const ui        = useUIStore()
const isDismissed = ref(false)

function dismiss() {
  isDismissed.value = true
}
</script>

<template>
  <Transition name="sticky">
    <div
      v-if="ui.showStickyBanner && !isDismissed"
      class="sticky-banner"
      role="complementary"
      aria-label="Chamada para ação"
    >
      <div class="sticky-banner__inner">

        <!-- Ícone + Texto ──────────────────────────── -->
        <div class="sticky-banner__content">
          <span class="sticky-banner__icon" aria-hidden="true">⚡</span>
          <div class="sticky-banner__text">
            <span class="sticky-banner__title">
              Pronto para começar?
            </span>
            <span class="sticky-banner__subtitle">
              Vagas limitadas este mês.
            </span>
          </div>
        </div>

        <!-- CTA ────────────────────────────────────── -->
        <div class="sticky-banner__actions">
          <BaseButton
            label="Quero Começar"
            variant="primary"
            size="sm"
            :href="formUrl"
            :external="true"
          />

          <!-- Fechar ─────────────────────────────── -->
          <button
            class="sticky-banner__close"
            aria-label="Fechar banner"
            @click="dismiss"
          >
            ✕
          </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">

.sticky-banner {
  position:   fixed;
  bottom:     0;
  left:       0;
  right:      0;
  z-index:    $z-sticky;
  background: $color-primary;
  border-top: 1px solid rgba($color-white, 0.08);
  box-shadow: 0 -4px 32px rgba(15, 23, 36, 0.35);

  // Barra de accent no topo
  &::before {
    content:    '';
    position:   absolute;
    top:        0;
    left:       0;
    right:      0;
    height:     2px;
    background: $gradient-cta;
  }

  &__inner {
    @include flex-between;
    gap:             $spacing-4;
    padding:         $spacing-3 $spacing-4;
    max-width:       $container-max;
    margin-inline:   auto;

    @include respond-to(md) {
      padding: $spacing-4 $spacing-8;
    }
  }

  // ─── Content ────────────────────────────────────────
  &__content {
    display:     flex;
    align-items: center;
    gap:         $spacing-3;
    min-width:   0; // para truncate funcionar
  }

  &__icon {
    font-size:   1.4rem;
    flex-shrink: 0;
    filter:      drop-shadow(0 0 6px rgba($color-accent, 0.7));
    animation:   pulse 2s ease infinite;
  }

  &__text {
    @include flex-col;
    gap: 1px;
    min-width: 0;
  }

  &__title {
    font-family:  $font-heading;
    font-size:    $font-size-sm;
    font-weight:  $font-weight-bold;
    color:        $color-white;
    white-space:  nowrap;

    @include respond-to(md) {
      font-size: $font-size-base;
    }
  }

  &__subtitle {
    font-family:  $font-body;
    font-size:    $font-size-xs;
    color:        rgba($color-white, 0.55);
    white-space:  nowrap;

    @include respond-to(md) {
      font-size: $font-size-sm;
    }
  }

  // ─── Actions ────────────────────────────────────────
  &__actions {
    display:     flex;
    align-items: center;
    gap:         $spacing-3;
    flex-shrink: 0;
  }

  // ─── Close ──────────────────────────────────────────
  &__close {
    width:         32px;
    height:        32px;
    border-radius: $radius-full;
    background:    rgba($color-white, 0.06);
    border:        1px solid rgba($color-white, 0.08);
    @include flex-center;
    font-size:     $font-size-xs;
    color:         rgba($color-white, 0.5);
    cursor:        pointer;
    transition:    $transition-base;
    flex-shrink:   0;

    &:hover {
      background: rgba($color-white, 0.12);
      color:      $color-white;
    }
  }
}

// ─── Transition ───────────────────────────────────────────
.sticky-enter-active,
.sticky-leave-active {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity   0.3s ease;
}

.sticky-enter-from,
.sticky-leave-to {
  transform: translateY(100%);
  opacity:   0;
}
</style>