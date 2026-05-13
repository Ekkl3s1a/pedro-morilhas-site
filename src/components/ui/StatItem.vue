<script setup lang="ts">
import type { Stat } from '@/types'
import { useCounterAnimation } from '@/composables/useCounterAnimation'
import { useScrollReveal }     from '@/composables/useScrollReveal'

interface Props {
  stat: Stat
}

const props = defineProps<Props>()

const { el, isVisible } = useScrollReveal({ threshold: 0.3 })
const { current }       = useCounterAnimation(props.stat.value, isVisible)
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
  gap:         $spacing-2;

  opacity:   0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &.is-visible {
    opacity:   1;
    transform: translateY(0);
  }

  &__icon {
    font-size:     2.5rem;
    line-height:   1;
    margin-bottom: $spacing-1;
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
    font-size:   $font-size-5xl;
    font-weight: $font-weight-black;
    letter-spacing: -0.02em;

    @include respond-to(md) {
      font-size: $font-size-6xl;
    }
  }

  &__suffix {
    font-size:   $font-size-3xl;
    font-weight: $font-weight-bold;
    color:       $color-accent;
  }

  &__label {
    font-family: $font-body;
    font-size:   $font-size-sm;
    font-weight: $font-weight-medium;
    color:       rgba($color-white, 0.7);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
}
</style>