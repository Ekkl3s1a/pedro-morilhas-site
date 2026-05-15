<script setup lang="ts">

import type { Stat } from '@/types'
import { useCounterAnimation } from '@/composables/useCounterAnimation'
import { useScrollReveal }     from '@/composables/useScrollReveal'

interface Props {
  stat: Stat
}

const props = defineProps<Props>()

const { isVisible } = useScrollReveal({ threshold: 0.3 })
const { current }   = useCounterAnimation(props.stat.value, isVisible)
</script>

<template>
  <div ref="el" class="stat-item" :class="{ 'is-visible': isVisible }">
    <div v-if="stat.icon" class="stat-item__icon" aria-hidden="true">
      {{ stat.icon }}
    </div>

    <div class="stat-item__number" aria-live="polite">
      <span class="stat-item__value">{{ current }}</span>
      <span class="stat-item__suffix">{{ stat.suffix }}</span>
    </div>

    <p class="stat-item__label">{{ stat.label }}</p>
  </div>
</template>

<style scoped lang="scss">

.stat-item {
  @include flex-col;
  align-items: center;
  text-align:  center;
  gap:         $spacing-1;

  opacity:   0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.is-visible {
    opacity:   1;
    transform: translateY(0);
  }

  &__icon {
    font-size:     1.8rem;
    line-height:   1;
    margin-bottom: 2px;

    @include respond-to(md) {
      font-size: 2.5rem;
    }
  }

  &__number {
    display:     flex;
    align-items: baseline;
    gap:         2px;
    font-family: $font-heading;
    color:       $color-white;
    line-height: 1;
  }

  &__value {
    font-size:      clamp(2rem, 8vw, 3rem);
    font-weight:    $font-weight-black;
    letter-spacing: -0.02em;

    @include respond-to(md) {
      font-size: $font-size-5xl;
    }

    @include respond-to(lg) {
      font-size: $font-size-6xl;
    }
  }

  &__suffix {
    font-size:   clamp(1.2rem, 4vw, 1.875rem);
    font-weight: $font-weight-bold;
    color:       $color-accent;
  }

  &__label {
    font-family:    $font-body;
    font-size:      9px;
    font-weight:    $font-weight-medium;
    color:          rgba($color-white, 0.7);
    letter-spacing: 0.05em;
    text-transform: uppercase;

    @include respond-to(md) {
      font-size: $font-size-xs;
    }
  }
}
</style>