<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import CalendlyButton from '@/components/ui/CalendlyButton.vue'
import { useWhatsApp } from '@/composables/useWhatsApp'

interface Props {
  formUrl: string,
  calendlyUrl: string
}

defineProps<Props>()

// Controla quando os elementos fazem fade-in
const isLoaded  = ref(false)

// Parallax subtil no scroll
const parallaxY = ref(0)

const {} = useWhatsApp()

function handleScroll() {
  parallaxY.value = window.scrollY * 0.35
}

onMounted(() => {
  // Pequeno delay para a animação de entrada ser percetível
  setTimeout(() => { isLoaded.value = true }, 100)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

// Scroll reveal para os badges / stats inline

const stats = [
  { value: '150+', label: 'Clientes'     },
  { value: '5★',   label: 'Avaliação'    },
  { value: '10+',   label: 'Anos de exp.' },
]
</script>

<template>
  <section
    id="hero"
    class="hero"
    aria-label="Apresentação"
  >
    <!-- Background -------------------------------------------------------- -->
    <div
      class="hero__bg"
      :style="{ transform: `translateY(${parallaxY}px)` }"
      aria-hidden="true"
    >
      <!-- Gradient overlay -->
      <div class="hero__overlay" />

      <!-- Orbs decorativos -->
      <div class="hero__orb hero__orb--1" />
      <div class="hero__orb hero__orb--2" />
      <div class="hero__orb hero__orb--3" />

      <!-- Grid pattern -->
      <div class="hero__grid-pattern" />
    </div>

    <!-- Conteúdo principal ─────────────────────────────── -->
    <div class="hero__inner container">
      <div class="hero__content" :class="{ 'hero__content--loaded': isLoaded }">

        <!-- Badge de abertura ──────────────────────────── -->
        <div class="hero__badge" ref="badgeEl">
          <span class="hero__badge-dot" aria-hidden="true" />
          Personal Trainer Certificado · Barreiro
        </div>

        <!-- Heading principal ──────────────────────────── -->
        <h1 class="hero__title">
          <span class="hero__title-line">Transforma</span>
          <span class="hero__title-line hero__title-line--accent">
            o teu corpo.
          </span>
          <span class="hero__title-line">Muda a tua vida.</span>
        </h1>

        <!-- Subtítulo ──────────────────────────────────── -->
        <p class="hero__subtitle">
          Treino 100% personalizado, acompanhamento contínuo
          e resultados reais — ao teu ritmo, com o teu objetivo.
        </p>

        <!-- CTAs ───────────────────────────────────────── -->
        <div class="hero__actions">
          <CalendlyButton
            :calendly-url="calendlyUrl"
            label="Marcar Consulta Grátis"
            variant="primary"
            size="lg"
          />
          <BaseButton
            label="Avaliação Física Inicial"
            variant="white"
            size="lg"
            :href="formUrl"
            :external="true"
          />
        </div>

        <!-- Social proof inline ────────────────────────── -->
        <div class="hero__proof">
          <!-- Avatares -->
          <div class="hero__avatars" aria-hidden="true">
            <span
              v-for="n in 4"
              :key="n"
              class="hero__avatar"
              :style="{ '--n': n }"
            />
          </div>
          <p class="hero__proof-text">
            <strong>+150 clientes</strong> já transformaram os seus corpos
          </p>
        </div>

      </div>

      <!-- Stats inline ───────────────────────────────────── -->
      <div class="hero__stats" :class="{ 'hero__stats--loaded': isLoaded }">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="hero__stat"
          :style="{ '--i': i }"
        >
          <span class="hero__stat-value">{{ stat.value }}</span>
          <span class="hero__stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">


.hero {
  position: relative;
  min-height:  100svh;  // svh = safe viewport height (mobile)
  overflow:    hidden;
  @include flex-col;
  justify-content: center;
  padding-top: $header-height-mobile; // compensa o header fixo em mobile

  @include respond-to(md) {
    padding-top: $header-height;
  }

  // --- Background -------------------------------------------
  &__bg {
    position:         absolute;
    inset:            -20%;  // extra espaço para o parallax
    will-change:      transform;
    background-color: $color-primary;
  }

  &__overlay {
    position:   absolute;
    inset:      0;
    background: $gradient-hero;
    z-index:    1;
  }

  &__orb {
    position:      absolute;
    border-radius: $radius-full;
    filter:        blur(80px);
    opacity:       0.15;
    z-index:       2;

    &--1 {
      width:      400px;
      height:     400px;
      background: $color-accent;
      top:        -80px;
      right:      -80px;
      animation:  pulse 8s ease-in-out infinite;

      @include respond-to(md) {
        width: 500px;
        height: 500px;
      }
    }

    &--2 {
      width:      300px;
      height:     300px;
      background: $color-teal;
      bottom:     -60px;
      left:       -60px;
      animation:  pulse 10s ease-in-out infinite 2s;
    }

    &--3 {
      display: none;

      @include respond-to(md) {
        display:    block;
        width:      300px;
        height:     300px;
        background: $color-accent;
        top:        50%;
        left:       40%;
        transform:  translate(-50%, -50%);
        opacity:    0.08;
        animation:  pulse 12s ease-in-out infinite 4s;
      }
    }
  }

  &__grid-pattern {
    position:            absolute;
    inset:               0;
    background-image:    linear-gradient(
                           rgba($color-white, 0.025) 1px,
                           transparent 1px
                         ),
                         linear-gradient(
                           90deg,
                           rgba($color-white, 0.025) 1px,
                           transparent 1px
                         );
    background-size:     60px 60px;
    z-index:             3;
  }

  // --- Inner -----------------------------------------------
  &__inner {
    position:      relative;
    z-index:       4;
    padding-block: $spacing-8;
    @include flex-col;
    gap:           $spacing-6;

    @include respond-to(md) {
      padding-block: $spacing-16;
      gap:           $spacing-10;
    }

    @include respond-to(lg) {
      padding-block: $spacing-24;
    }
  }

  // --- Content ---------------------------------------------
  &__content {
    @include flex-col;
    gap:       $spacing-4;
    max-width: 680px;

    opacity:   0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;

    @include respond-to(md) {
      gap: $spacing-6;
    }

    &--loaded {
      opacity:   1;
      transform: translateY(0);
    }
  }

  // --- Badge -----------------------------------------------
  &__badge {
    display:        inline-flex;
    align-items:    center;
    gap:            $spacing-2;
    width:          fit-content;
    font-family:    $font-heading;
    font-size:      10px;
    font-weight:    $font-weight-bold;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color:          rgba($color-white, 0.85);
    background:     rgba($color-white, 0.08);
    border:         1px solid rgba($color-white, 0.12);
    padding:        $spacing-1 $spacing-3;
    border-radius:  $radius-full;
    backdrop-filter: blur(8px);
    animation:      fadeIn 0.6s ease 0.2s both;

    @include respond-to(md) {
      font-size: $font-size-xs;
      padding:   $spacing-2 $spacing-4;
    }
  }

  &__badge-dot {
    width:         6px;
    height:        6px;
    border-radius: $radius-full;
    background:    $color-teal;
    box-shadow:    0 0 0 3px rgba($color-teal, 0.3);
    animation:     pulse 2s ease infinite;
    flex-shrink:   0;
  }

  // --- Title -----------------------------------------------
  &__title {
    @include heading-1;
    color:  $color-white;
    @include flex-col;
    gap:    2px;

    @include respond-to(md) {
      gap: $spacing-1;
    }
  }

  &__title-line {
    display: block;

    // Cada linha aparece com delay
    &:nth-child(1) { animation: fadeInUp 0.7s ease 0.3s both; }
    &:nth-child(2) { animation: fadeInUp 0.7s ease 0.5s both; }
    &:nth-child(3) { animation: fadeInUp 0.7s ease 0.7s both; }

    &--accent {
      // Gradiente no texto
      background:              $gradient-cta;
      -webkit-background-clip: text;
      background-clip:         text;
      -webkit-text-fill-color: transparent;
      display:                 inline-block;
    }
  }

  // --- Subtitle --------------------------------------------
  &__subtitle {
    @include body-text;
    color:     rgba($color-white, 0.7);
    max-width: 520px;
    animation: fadeInUp 0.7s ease 0.9s both;
  }

  // --- Actions ---------------------------------------------
  &__actions {
    display:     flex;
    flex-wrap:   wrap;
    gap:         $spacing-2;
    align-items: center;
    animation:   fadeInUp 0.7s ease 1.1s both;

    @include mobile-only {
      flex-direction: column;
      align-items:    stretch;

      // Botões a full width no mobile
      :deep(.btn) {
        width:          100%;
        justify-content: center;
      }
    }

    @include respond-to(sm) {
      flex-direction: row;
      gap:            $spacing-3;
    }
  }

  // --- Social proof -----------------------------------------
  &__proof {
    display:     flex;
    align-items: center;
    gap:         $spacing-2;
    animation:   fadeInUp 0.7s ease 1.3s both;

    @include respond-to(md) {
      gap: $spacing-3;
    }
  }

  &__avatars {
    display:  flex;
    position: relative;
  }

  &__avatar {
    width:         28px;
    height:        28px;
    border-radius: $radius-full;
    border:        2px solid $color-primary;
    background:    linear-gradient(135deg, $color-accent 0%, $color-teal 100%);
    margin-left:   -8px;
    flex-shrink:   0;

    &:first-child { margin-left: 0; }

    @include respond-to(md) {
      width:      36px;
      height:     36px;
      margin-left: -10px;
    }
  }

  &__proof-text {
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       rgba($color-white, 0.65);
    line-height: $line-height-tight;

    @include respond-to(md) {
      font-size: $font-size-sm;
    }

    strong {
      color:       $color-white;
      font-weight: $font-weight-semibold;
    }
  }

  // --- Stats -----------------------------------------------
  &__stats {
    display:               grid;
    grid-template-columns: repeat(3, 1fr);
    gap:                   $spacing-2;
    padding-top:           $spacing-4;
    border-top:            1px solid rgba($color-white, 0.08);

    opacity:   0;
    transform: translateY(24px);
    transition: opacity 0.7s ease 1.5s, transform 0.7s ease 1.5s;

    &--loaded {
      opacity:   1;
      transform: translateY(0);
    }

    @include respond-to(md) {
      gap:         $spacing-4;
      padding-top: $spacing-8;
      max-width:   400px;
    }
  }

  &__stat {
    @include flex-col;
    gap:     2px;

    animation-delay: calc(1.5s + var(--i) * 0.1s);
  }

  &__stat-value {
    font-family:    $font-heading;
    font-size:      $font-size-xl;
    font-weight:    $font-weight-black;
    color:          $color-white;
    letter-spacing: -0.02em;
    line-height:    1;

    @include respond-to(md) {
      font-size: $font-size-2xl;
    }

    @include respond-to(lg) {
      font-size: $font-size-3xl;
    }
  }

   &__stat-label {
    font-family:    $font-body;
    font-size:      9px;
    font-weight:    $font-weight-medium;
    color:          rgba($color-white, 0.5);
    letter-spacing: 0.05em;
    text-transform: uppercase;

    @include respond-to(md) {
      font-size: $font-size-xs;
    }
  }

  // --- Scroll indicator ------------------------------------
  &__scroll {
    position:    absolute;
    bottom:      $spacing-6;
    left:        50%;
    transform:   translateX(-50%);
    z-index:     4;
    @include flex-col;
    align-items: center;
    gap:         $spacing-2;
    animation:   fadeIn 1s ease 2s both;

    @include mobile-only {
      display: none;
    }
  }

  &__scroll-label {
    font-family:    $font-heading;
    font-size:      $font-size-xs;
    font-weight:    $font-weight-bold;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color:          rgba($color-white, 0.3);
  }

  &__scroll-line {
    width:         1px;
    height:        40px;
    background:    rgba($color-white, 0.12);
    border-radius: $radius-full;
    position:      relative;
    overflow:      hidden;
  }

  &__scroll-dot {
    position:      absolute;
    top:           0;
    left:          50%;
    transform:     translateX(-50%);
    width:         3px;
    height:        10px;
    border-radius: $radius-full;
    background:    $color-accent;
    animation:     scrollDot 1.8s ease infinite;
  }
}

@keyframes scrollDot {
  0%   { top: 0;    opacity: 1; }
  80%  { top: 100%; opacity: 0; }
  100% { top: 0;    opacity: 0; }
}
</style>