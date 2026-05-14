<script setup lang="ts">
import { useScrollReveal }    from '@/composables/useScrollReveal'
import type { Stat }          from '@/types'
import StatItem               from '@/components/ui/StatItem.vue'

const { el, isVisible } = useScrollReveal({ threshold: 0.2 })

const stats: Stat[] = [
  {
    id:     1,
    icon:   '👤',
    value:  150,
    suffix: '+',
    label:  'Clientes Ativos',
  },
  {
    id:     2,
    icon:   '📅',
    value:  8,
    suffix: '+',
    label:  'Anos de Experiência',
  },
  {
    id:     3,
    icon:   '⭐',
    value:  98,
    suffix: '%',
    label:  'Taxa de Satisfação',
  },
  {
    id:     4,
    icon:   '🏆',
    value:  12,
    suffix: '+',
    label:  'Prémios & Certificações',
  },
]
</script>

<template>
  <section
    id="stats"
    class="stats section"
    aria-label="Resultados em números"
  >
    <!-- Background decorativo ──────────────────────────── -->
    <div class="stats__bg" aria-hidden="true">
      <div class="stats__bg-orb stats__bg-orb--1" />
      <div class="stats__bg-orb stats__bg-orb--2" />
    </div>

    <div class="container">

      <!-- Header ─────────────────────────────────────── -->
      <div
        ref="el"
        class="stats__header section__header reveal"
        :class="{ 'is-visible': isVisible }"
      >
        <span class="section__badge stats__badge">Números Reais</span>
        <h2 class="section__title stats__title">
          Resultados que <span>falam por si</span>
        </h2>
        <p class="section__subtitle stats__subtitle">
          Mais de 8 anos a transformar vidas. Estes números
          representam pessoas reais com resultados reais.
        </p>
      </div>

      <!-- Grid de stats ───────────────────────────────── -->
      <ul
        class="stats__grid"
        role="list"
        aria-label="Estatísticas"
      >
        <li
          v-for="(stat, i) in stats"
          :key="stat.id"
          class="stats__cell"
          :style="{ transitionDelay: `${i * 0.15}s` }"
        >
          <StatItem :stat="stat" />

          <!-- Divisor vertical entre células ─────────── -->
          <div
            v-if="i < stats.length - 1"
            class="stats__divider"
            aria-hidden="true"
          />
        </li>
      </ul>

      <!-- Quote / Tagline ─────────────────────────────── -->
      <blockquote
        class="stats__quote reveal"
        :class="{ 'is-visible': isVisible }"
      >
        <p class="stats__quote-text">
          "O teu corpo consegue quase tudo.
          É a tua mente que precisas de convencer."
        </p>
        <footer class="stats__quote-author">
          — Pedro Morilhas
        </footer>
      </blockquote>

    </div>
  </section>
</template>

<style scoped lang="scss">

.stats {
  position:   relative;
  background: $color-primary;
  overflow:   hidden;

  // ─── Background ───────────────────────────────────────
  &__bg {
    position: absolute;
    inset:    0;
    z-index:  0;
  }

  &__bg-orb {
    position:      absolute;
    border-radius: $radius-full;
    filter:        blur(100px);

    &--1 {
      width:      600px;
      height:     600px;
      background: rgba($color-accent, 0.08);
      top:        -200px;
      right:      -200px;
    }

    &--2 {
      width:      400px;
      height:     400px;
      background: rgba($color-teal, 0.06);
      bottom:     -100px;
      left:       -100px;
    }
  }

  // ─── Container override (tudo sobre o bg) ─────────────
  .container {
    position: relative;
    z-index:  1;
  }

  // ─── Header ───────────────────────────────────────────
  &__badge {
    color:      $color-accent !important;
    background: rgba($color-accent, 0.12) !important;
  }

  &__title {
    color: $color-white !important;

    span { color: $color-accent !important; }
  }

  &__subtitle {
    color: rgba($color-white, 0.55) !important;
  }

  // ─── Grid ─────────────────────────────────────────────
  &__grid {
    display:               grid;
    grid-template-columns: repeat(2, 1fr);
    gap:                   $spacing-8;
    position:              relative;

    @include respond-to(md) {
      grid-template-columns: repeat(4, 1fr);
      gap: $spacing-4;
    }
  }

  &__cell {
    position: relative;
  }

  // Linha divisória vertical entre stats no desktop
  &__divider {
    display: none;

    @include respond-to(md) {
      display:   block;
      position:  absolute;
      right:     0;
      top:       10%;
      height:    80%;
      width:     1px;
      background: rgba($color-white, 0.08);
    }
  }

  // ─── Quote ────────────────────────────────────────────
  &__quote {
    margin-top:    $spacing-16;
    text-align:    center;
    padding-top:   $spacing-12;
    border-top:    1px solid rgba($color-white, 0.06);

    @include respond-to(md) {
      margin-top: $spacing-20;
    }
  }

  &__quote-text {
    font-family:  $font-heading;
    font-size:    $font-size-xl;
    font-weight:  $font-weight-semibold;
    color:        rgba($color-white, 0.85);
    line-height:  $line-height-loose;
    font-style:   italic;
    max-width:    600px;
    margin-inline: auto;

    @include respond-to(md) {
      font-size: $font-size-2xl;
    }
  }

  &__quote-author {
    margin-top:  $spacing-4;
    font-family: $font-body;
    font-size:   $font-size-sm;
    font-weight: $font-weight-medium;
    color:       $color-accent;
    letter-spacing: 0.05em;
  }
}
</style>