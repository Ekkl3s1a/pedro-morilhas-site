<script setup lang="ts">
import { ref }   from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import CalendlyButton      from '@/components/ui/CalendlyButton.vue'

interface Props {
  calendlyUrl: string
  formUrl:     string
}

const props = defineProps<Props>()

const { el, isVisible } = useScrollReveal({ threshold: 0.1 })

// Acordeão mobile — qual step está expandido
const openStep = ref<number | null>(null)

function toggleStep(i: number) {
  openStep.value = openStep.value === i ? null : i
}

const steps = [
  {
    number: '01',
    icon:   '📅',
    title:  'Marca a tua consulta',
    desc:   'Escolhe o dia e hora que te dá mais jeito. A consulta inicial é 100% gratuita.',
  },
  {
    number: '02',
    icon:   '💬',
    title:  'Falamos sobre ti',
    desc:   'Em 30 minutos percebo os teus objetivos, historial e disponibilidade.',
  },
  {
    number: '03',
    icon:   '🎯',
    title:  'Recebes o teu plano',
    desc:   'Em 48h tens o teu plano personalizado pronto a começar.',
  },
]
</script>

<template>
  <section
    id="booking"
    class="booking section"
    aria-label="Marcar consulta"
  >
    <!-- Background -->
    <div class="booking__bg" aria-hidden="true">
      <div class="booking__bg-orb booking__bg-orb--1" />
      <div class="booking__bg-orb booking__bg-orb--2" />
      <div class="booking__bg-grid" />
    </div>

    <div class="container">
      <div
        ref="el"
        class="booking__inner reveal"
        :class="{ 'is-visible': isVisible }"
      >

        <!-- Header ──────────────────────────────────── -->
        <div class="booking__header">
          <span class="section__badge booking__badge">
            Consulta Gratuita
          </span>
          <h2 class="booking__title">
            Dá o primeiro passo.<br>
            <span>Sem compromisso.</span>
          </h2>
          <p class="booking__subtitle">
            Uma conversa de 30 minutos pode mudar a tua vida.
          </p>
        </div>

        <!-- CTA — sempre visível, antes dos steps -->
        <div class="booking__cta">
          <CalendlyButton
            :calendly-url="calendlyUrl"
            label="Marcar Consulta Gratuita"
            variant="primary"
            size="lg"
          />
          <p class="booking__note">
            <span aria-hidden="true">🔒</span>
            Sem spam. Cancelas quando quiseres. Gratuito.
          </p>
        </div>

        <!-- ── DESKTOP: steps em grid ─────────────── -->
        <ol class="booking__steps booking__steps--desktop">
          <li
            v-for="(step, i) in steps"
            :key="step.number"
            class="booking__step"
            :class="{ 'is-visible': isVisible }"
            :style="{ transitionDelay: `${i * 0.12 + 0.2}s` }"
          >
            <div
              v-if="i < steps.length - 1"
              class="booking__connector"
              aria-hidden="true"
            />

            <div class="booking__step-icon" aria-hidden="true">
              {{ step.icon }}
            </div>
            <div class="booking__step-body">
              <span class="booking__step-number">{{ step.number }}</span>
              <h3 class="booking__step-title">{{ step.title }}</h3>
              <p  class="booking__step-desc">{{ step.desc }}</p>
            </div>
          </li>
        </ol>

        <!-- ── MOBILE: steps em acordeão ─────────── -->
        <ol
          class="booking__accordion"
          aria-label="Como funciona"
        >
          <li
            v-for="(step, i) in steps"
            :key="step.number"
            class="booking__acc-item"
            :class="{ 'booking__acc-item--open': openStep === i }"
          >
            <button
              class="booking__acc-trigger"
              :aria-expanded="openStep === i"
              @click="toggleStep(i)"
            >
              <span class="booking__acc-left">
                <span class="booking__acc-icon" aria-hidden="true">
                  {{ step.icon }}
                </span>
                <span class="booking__acc-title">{{ step.title }}</span>
              </span>
              <span
                class="booking__acc-chevron"
                :class="{ 'booking__acc-chevron--open': openStep === i }"
                aria-hidden="true"
              >
                ↓
              </span>
            </button>

            <Transition name="accordion">
              <div
                v-if="openStep === i"
                class="booking__acc-body"
              >
                <p class="booking__step-desc">{{ step.desc }}</p>
              </div>
            </Transition>
          </li>
        </ol>

        <!-- Social proof ─────────────────────────── -->
        <div class="booking__proof">
          <div
            v-for="n in 5"
            :key="n"
            class="booking__star"
            aria-hidden="true"
          >★</div>
          <span class="booking__proof-text">
            <strong>4.9/5</strong> baseado em 150+ consultas
          </span>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.booking {
  position:   relative;
  background: $color-primary;
  overflow:   hidden;

  // ─── Background ───────────────────────────────────────
  &__bg {
    position:       absolute;
    inset:          0;
    z-index:        0;
    pointer-events: none;
  }

  &__bg-orb {
    position:      absolute;
    border-radius: $radius-full;
    filter:        blur(100px);

    &--1 {
      width:      500px;
      height:     500px;
      background: rgba($color-accent, 0.10);
      top:        -150px;
      right:      -150px;
    }
    &--2 {
      width:      400px;
      height:     400px;
      background: rgba($color-teal, 0.08);
      bottom:     -100px;
      left:       -100px;
    }
  }

  &__bg-grid {
    position:         absolute;
    inset:            0;
    background-image: linear-gradient(
                        rgba($color-white, 0.02) 1px,
                        transparent 1px
                      ),
                      linear-gradient(
                        90deg,
                        rgba($color-white, 0.02) 1px,
                        transparent 1px
                      );
    background-size: 60px 60px;
  }

  // ─── Inner ────────────────────────────────────────────
  &__inner {
    position:    relative;
    z-index:     1;
    @include flex-col;
    align-items: center;
    text-align:  center;
    gap:         $spacing-8;

    @include respond-to(md) {
      gap: $spacing-12;
    }
  }

  // ─── Header ───────────────────────────────────────────
  &__header {
    @include flex-col;
    align-items: center;
    gap:         $spacing-3;
    max-width:   560px;
  }

  &__badge {
    color:      $color-accent !important;
    background: rgba($color-accent, 0.12) !important;
  }

  &__title {
    @include heading-2;
    color: $color-white;

    span {
      background:              $gradient-cta;
      -webkit-background-clip: text;
      background-clip:         text;
      -webkit-text-fill-color: transparent;
    }
  }

  &__subtitle {
    @include body-text;
    color:     rgba($color-white, 0.65);
    max-width: 420px;
  }

  // ─── CTA ──────────────────────────────────────────────
  &__cta {
    @include flex-col;
    align-items: center;
    gap:         $spacing-3;
  }

  &__note {
    display:     flex;
    align-items: center;
    gap:         $spacing-2;
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       rgba($color-white, 0.35);
  }

  // ─── Steps desktop ────────────────────────────────────
  &__steps--desktop {
    display:    none;
    list-style: none;
    width:      100%;
    max-width:  760px;

    @include respond-to(md) {
      display:               grid;
      grid-template-columns: repeat(3, 1fr);
      gap:                   $spacing-4;
    }
  }

  &__step {
    position:      relative;
    @include flex-col;
    align-items:   center;
    gap:           $spacing-3;
    padding:       $spacing-5;
    background:    rgba($color-white, 0.04);
    border:        1px solid rgba($color-white, 0.08);
    border-radius: $radius-xl;
    text-align:    center;
    transition:    opacity 0.5s ease, transform 0.5s ease;

    opacity:   0;
    transform: translateY(20px);

    &.is-visible {
      opacity:   1;
      transform: translateY(0);
    }

    &:hover {
      background:   rgba($color-white, 0.07);
      border-color: rgba($color-accent, 0.3);
    }
  }

  &__connector {
    display: none;

    @include respond-to(md) {
      display:    block;
      position:   absolute;
      top:        $spacing-8;
      right:      calc(-50% + #{$spacing-4});
      width:      calc(100% - #{$spacing-8});
      height:     1px;
      background: rgba($color-white, 0.08);

      &::after {
        content:   '→';
        position:  absolute;
        right:     -6px;
        top:       -9px;
        color:     rgba($color-white, 0.2);
        font-size: $font-size-xs;
      }
    }
  }

  &__step-icon {
    width:         48px;
    height:        48px;
    border-radius: $radius-full;
    background:    rgba($color-accent, 0.12);
    border:        1px solid rgba($color-accent, 0.2);
    @include flex-center;
    font-size:     1.4rem;
    flex-shrink:   0;
    position:      relative;
    z-index:       1;
  }

  &__step-body {
    @include flex-col;
    gap: $spacing-2;
  }

  &__step-number {
    font-family:    $font-heading;
    font-size:      $font-size-xs;
    font-weight:    $font-weight-bold;
    letter-spacing: 0.15em;
    color:          $color-accent;
    text-transform: uppercase;
  }

  &__step-title {
    font-family: $font-heading;
    font-size:   $font-size-base;
    font-weight: $font-weight-bold;
    color:       $color-white;
  }

  &__step-desc {
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       rgba($color-white, 0.55);
    line-height: $line-height-loose;
  }

  // ─── Acordeão mobile ──────────────────────────────────
  &__accordion {
    display:    flex;
    flex-direction: column;
    gap:        $spacing-2;
    width:      100%;
    max-width:  480px;
    list-style: none;

    // Esconde no desktop
    @include respond-to(md) {
      display: none;
    }
  }

  &__acc-item {
    background:    rgba($color-white, 0.04);
    border:        1px solid rgba($color-white, 0.08);
    border-radius: $radius-lg;
    overflow:      hidden;
    transition:    border-color 0.25s ease;

    &--open {
      border-color: rgba($color-accent, 0.35);
      background:   rgba($color-white, 0.07);
    }
  }

  &__acc-trigger {
    width:       100%;
    @include flex-between;
    gap:         $spacing-3;
    padding:     $spacing-4;
    background:  none;
    border:      none;
    cursor:      pointer;
    text-align:  left;
    transition:  $transition-base;
    -webkit-tap-highlight-color: transparent;
  }

  &__acc-left {
    display:     flex;
    align-items: center;
    gap:         $spacing-3;
  }

  &__acc-icon {
    font-size:   1.3rem;
    line-height: 1;
    flex-shrink: 0;
  }

  &__acc-title {
    font-family: $font-heading;
    font-size:   $font-size-sm;
    font-weight: $font-weight-semibold;
    color:       $color-white;
  }

  &__acc-chevron {
    font-size:  $font-size-sm;
    color:      rgba($color-white, 0.4);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    flex-shrink: 0;

    &--open {
      transform: rotate(180deg);
      color:     $color-accent;
    }
  }

  &__acc-body {
    padding:    0 $spacing-4 $spacing-4;
    border-top: 1px solid rgba($color-white, 0.06);
  }

  // ─── Social proof ─────────────────────────────────────
  &__proof {
    display:     flex;
    align-items: center;
    gap:         $spacing-2;
    padding-top: $spacing-4;
    border-top:  1px solid rgba($color-white, 0.06);
  }

  &__star {
    color:     #F59E0B;
    font-size: $font-size-base;
  }

  &__proof-text {
    font-family: $font-body;
    font-size:   $font-size-sm;
    color:       rgba($color-white, 0.55);

    strong {
      color:       $color-white;
      font-weight: $font-weight-semibold;
    }
  }
}

// ─── Accordion transition ─────────────────────────────────
.accordion-enter-active,
.accordion-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
  overflow:   hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity:   0;
  transform: translateY(-6px);
}
</style>