<script setup lang="ts">
import { useCalendly } from '@/composables/useCalendly'

interface Props {
  calendlyUrl: string
  label?:      string
  variant?:    'primary' | 'secondary' | 'outline' | 'white' | 'ghost'
  size?:       'sm' | 'md' | 'lg'
  fullWidth?:  boolean
  icon?:       boolean
}

const props = withDefaults(defineProps<Props>(), {
  label:     'Marcar Consulta Gratuita',
  variant:   'primary',
  size:      'lg',
  fullWidth: false,
  icon:      true,
})

const { openModal, isOpen } = useCalendly(props.calendlyUrl)
</script>

<template>
  <button
    :class="[
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--full':    fullWidth },
      { 'btn--loading': isOpen    },
    ]"
    :aria-busy="isOpen"
    :aria-label="label"
    @click="openModal()"
  >
    <span v-if="isOpen" class="btn__spinner" aria-hidden="true" />

    <template v-else>
      <span v-if="icon" class="btn__icon" aria-hidden="true">📅</span>
      <span class="btn__label">{{ label }}</span>
    </template>
  </button>
</template>

<!-- Reutiliza os estilos globais do BaseButton via classes -->
<style scoped lang="scss">
// Importa os mesmos estilos do BaseButton
.btn {
  @include btn-base;
  position: relative;
  overflow: hidden;

  &::after {
    content:      '';
    position:     absolute;
    inset:        0;
    background:   rgba(255, 255, 255, 0.12);
    opacity:      0;
    transition:   opacity 0.2s ease;
    border-radius: inherit;
  }

  &:active::after { opacity: 1; }

  &--primary {
    background:  $gradient-cta;
    color:       $color-white;
    box-shadow:  $shadow-accent;

    &:hover:not(:disabled) {
      transform:  translateY(-2px) scale(1.03);
      box-shadow: 0 12px 40px rgba(255, 90, 60, 0.40);
    }
  }

  &--secondary {
    background: $color-primary;
    color:      $color-white;
    box-shadow: $shadow-md;

    &:hover:not(:disabled) {
      transform:  translateY(-2px) scale(1.03);
      box-shadow: $shadow-lg;
    }
  }

  &--outline {
    background:    transparent;
    color:         $color-accent;
    border:        2px solid $color-accent;

    &:hover:not(:disabled) {
      background: $color-accent;
      color:      $color-white;
      transform:  translateY(-2px) scale(1.03);
    }
  }

  &--white {
    background:      rgba($color-white, 0.10);
    color:           $color-white;
    border:          1.5px solid rgba($color-white, 0.25);
    backdrop-filter: blur(8px);

    &:hover:not(:disabled) {
      background:   rgba($color-white, 0.18);
      border-color: rgba($color-white, 0.50);
      transform:    translateY(-2px) scale(1.03);
    }
  }

  &--ghost {
    background: transparent;
    color:      $color-accent;

    &:hover:not(:disabled) {
      background: rgba($color-accent, 0.08);
    }
  }

  &--sm { padding: $spacing-2 $spacing-4; font-size: $font-size-sm; }
  &--md { padding: $spacing-3 $spacing-6; font-size: $font-size-base; }
  &--lg { padding: $spacing-4 $spacing-8; font-size: $font-size-lg;  }

  &--full { width: 100%; justify-content: center; }

  &--loading {
    cursor:         wait;
    pointer-events: none;
  }

  &__spinner {
    position:      absolute;
    inset:         0;
    margin:        auto;
    width:         18px;
    height:        18px;
    border:        2.5px solid rgba(255,255,255,0.3);
    border-top-color: $color-white;
    border-radius: $radius-full;
    animation:     spin 0.7s linear infinite;
  }

  &__icon {
    font-size:  1em;
    line-height: 1;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>