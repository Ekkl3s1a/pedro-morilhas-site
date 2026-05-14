<script setup lang="ts">

import type { ButtonVariant, ButtonSize } from '@/types'

interface Props {
  label:     string
  variant?:  ButtonVariant
  size?:     ButtonSize
  href?:     string
  external?: boolean
  disabled?: boolean
  loading?:  boolean
  icon?:     string
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant:   'primary',
  size:      'md',
  external:  false,
  disabled:  false,
  loading:   false,
  fullWidth: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(e: MouseEvent) {
  if (props.disabled || props.loading) return
  emit('click', e)
}

// Se tem href é um link, senão é um botão
const isLink = !!props.href
</script>

<template>
  <!-- Renderiza <a> ou <button> dependendo de ter href -->
  <component
    :is="isLink ? 'a' : 'button'"
    :href="isLink ? href : undefined"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :disabled="!isLink && (disabled || loading)"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    :class="[
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--full': fullWidth },
      { 'btn--loading': loading },
      { 'btn--disabled': disabled },
    ]"
    @click="handleClick"
  >
    <!-- Spinner de loading -->
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />

    <!-- Ícone esquerdo -->
    <span v-if="icon && !loading" class="btn__icon" aria-hidden="true">
      {{ icon }}
    </span>

    <!-- Label -->
    <span class="btn__label">{{ label }}</span>

    <!-- Seta para links externos -->
    <span v-if="external && !loading" class="btn__arrow" aria-hidden="true">
      ↗
    </span>
  </component>
</template>

<style scoped lang="scss">

.btn {
  @include btn-base;
  position: relative;
  overflow: hidden;

  // ─── Ripple effect no click ───────────────────────────
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.12);
    opacity: 0;
    transition: opacity 0.2s ease;
    border-radius: inherit;
  }

  &:active::after {
    opacity: 1;
  }

  // ─── Variantes ────────────────────────────────────────
  &--primary {
    background:  $gradient-cta;
    color:       $color-white;
    box-shadow:  $shadow-accent;

    &:hover:not(.btn--disabled):not(.btn--loading) {
      transform:  translateY(-2px) scale(1.03);
      box-shadow: 0 12px 40px rgba(255, 90, 60, 0.40);
    }
  }

  &--secondary {
    background: $color-primary;
    color:      $color-white;
    box-shadow: $shadow-md;

    &:hover:not(.btn--disabled):not(.btn--loading) {
      transform:   translateY(-2px) scale(1.03);
      box-shadow:  $shadow-lg;
      background:  color.adjust($color-primary, $lightness: 8%);
    }
  }

  &--outline {
    background:    transparent;
    color:         $color-accent;
    border:        2px solid $color-accent;
    box-shadow:    none;
    padding-block: calc(#{$spacing-3} - 2px);

    &:hover:not(.btn--disabled):not(.btn--loading) {
      background: $color-accent;
      color:      $color-white;
      transform:  translateY(-2px) scale(1.03);
      box-shadow: $shadow-accent;
    }
  }

  &--ghost {
    background: transparent;
    color:      $color-accent;
    box-shadow: none;

    &:hover:not(.btn--disabled):not(.btn--loading) {
      background: rgba($color-accent, 0.08);
      transform:  scale(1.03);
    }
  }

  // ─── Tamanhos ─────────────────────────────────────────
  &--sm {
    padding:   $spacing-2 $spacing-4;
    font-size: $font-size-sm;
    gap:       $spacing-1;
  }

  &--md {
    padding:   $spacing-3 $spacing-6;
    font-size: $font-size-base;
  }

  &--lg {
    padding:   $spacing-4 $spacing-8;
    font-size: $font-size-lg;
    gap:       $spacing-3;
  }

  // ─── Estados ──────────────────────────────────────────
  &--full {
    width: 100%;
  }

  &--disabled {
    opacity: 0.5;
    cursor:  not-allowed;
    pointer-events: none;
  }

  &--loading {
    cursor:         wait;
    pointer-events: none;
    color:          transparent;

    .btn__label,
    .btn__icon,
    .btn__arrow {
      opacity: 0;
    }
  }

  // ─── Spinner ──────────────────────────────────────────
  &__spinner {
    position:  absolute;
    inset:     0;
    margin:    auto;
    width:     18px;
    height:    18px;
    border:    2.5px solid rgba(255, 255, 255, 0.3);
    border-top-color: $color-white;
    border-radius:    $radius-full;
    animation: spin 0.7s linear infinite;
  }

  &__icon {
    font-size: 1.1em;
    line-height: 1;
  }

  &__arrow {
    font-size:   0.9em;
    margin-left: -$spacing-1;
    transition:  transform 0.2s ease;
  }

  &:hover .btn__arrow {
    transform: translate(2px, -2px);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>