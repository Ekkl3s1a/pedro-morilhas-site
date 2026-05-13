<script setup lang="ts">
interface Props {
  hover?:   boolean
  padding?: 'sm' | 'md' | 'lg'
  dark?:    boolean
  accent?:  boolean
}

withDefaults(defineProps<Props>(), {
  hover:   true,
  padding: 'md',
  dark:    false,
  accent:  false,
})
</script>

<template>
  <div
    :class="[
      'card',
      `card--${padding}`,
      { 'card--hover':  hover  },
      { 'card--dark':   dark   },
      { 'card--accent': accent },
    ]"
  >
    <!-- Linha de accent no topo (aparece em hover ou se accent=true) -->
    <div class="card__accent-line" aria-hidden="true" />

    <!-- Slot padrão -->
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  @include card-base;
  position: relative;
  overflow: hidden;

  // ─── Linha de accent ──────────────────────────────────
  &__accent-line {
    position:   absolute;
    top:        0;
    left:       0;
    right:      0;
    height:     3px;
    background: $gradient-cta;
    transform:  scaleX(0);
    transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  // ─── Padding ──────────────────────────────────────────
  &--sm { padding: $spacing-4; }
  &--md { padding: $spacing-6; }
  &--lg { padding: $spacing-8; }

  // ─── Hover ────────────────────────────────────────────
  &--hover {
    cursor: default;

    &:hover {
      transform:  translateY(-6px);
      box-shadow: $shadow-lg;

      .card__accent-line {
        transform: scaleX(1);
      }
    }
  }

  // ─── Dark variant ─────────────────────────────────────
  &--dark {
    background: $color-primary;
    color:      $color-white;
    box-shadow: $shadow-lg;

    &:hover {
      box-shadow: 0 12px 48px rgba(15, 23, 36, 0.35);
    }
  }

  // ─── Accent (sempre com a linha visível) ──────────────
  &--accent {
    .card__accent-line {
      transform: scaleX(1);
    }

    border-top: none;
  }
}
</style>