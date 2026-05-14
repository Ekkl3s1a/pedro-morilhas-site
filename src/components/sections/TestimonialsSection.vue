<script setup lang="ts">
import { ref, computed }       from 'vue'
import { useScrollReveal }     from '@/composables/useScrollReveal'
import { useScrollRevealList } from '@/composables/useScrollReveal'
import type { Testimonial }    from '@/types'
import BaseCard                from '@/components/ui/BaseCard.vue'

const { el: headerEl, isVisible: headerVisible } = useScrollReveal({ threshold: 0.1 })
const { observe, isItemVisible }                 = useScrollRevealList({ threshold: 0.1 })

const testimonials: Testimonial[] = [
  {
    id:       1,
    name:     'Ana Rodrigues',
    role:     'Perdeu 18kg em 5 meses',
    quote:    'O Pedro mudou completamente a minha relação com o exercício. Nunca pensei que ia conseguir resultados assim — e sem passar fome nem me sentir miserável!',
    rating:   5,
    initials: 'AR',
  },
  {
    id:       2,
    name:     'Miguel Santos',
    role:     'Ganhou 8kg de massa muscular',
    quote:    'Treino online, mas parece que o Pedro está mesmo ao meu lado. Os check-ins semanais fazem toda a diferença. Em 6 meses transformei completamente o meu corpo.',
    rating:   5,
    initials: 'MS',
  },
  {
    id:       3,
    name:     'Catarina Lopes',
    role:     'Correu a primeira meia maratona',
    quote:    'Comecei do zero — não corria nem 5 minutos seguidos. Com o plano do Pedro, 4 meses depois completei uma meia maratona. Ainda não acredito!',
    rating:   5,
    initials: 'CL',
  },
  {
    id:       4,
    name:     'Rui Fernandes',
    role:     'Reabilitação pós-lesão',
    quote:    'Após uma lesão no joelho os médicos disseram que nunca voltaria a treinar intensamente. O Pedro provou que estavam errados. Agora estou melhor do que antes.',
    rating:   5,
    initials: 'RF',
  },
  {
    id:       5,
    name:     'Sofia Martins',
    role:     'Mãe de 3 filhos, voltou à forma',
    quote:    'Com 3 filhos pequenos não tinha tempo para nada. O Pedro criou um programa de 45 min/dia que encaixou na minha vida. Em 4 meses estou irreconhecível.',
    rating:   5,
    initials: 'SM',
  },
  {
    id:       6,
    name:     'João Carvalho',
    role:     'Triatleta amador',
    quote:    'Precisava de alguém que entendesse de performance desportiva. O Pedro não só sabe de treino — sabe de competição. Os meus tempos melhoraram 20%.',
    rating:   5,
    initials: 'JC',
  },
]

// Carousel mobile
const activeIndex  = ref(0)
const totalSlides  = computed(() => testimonials.length)

function prev() {
  activeIndex.value = activeIndex.value === 0
    ? totalSlides.value - 1
    : activeIndex.value - 1
}

function next() {
  activeIndex.value = activeIndex.value === totalSlides.value - 1
    ? 0
    : activeIndex.value + 1
}

function goTo(index: number) {
  activeIndex.value = index
}

function setRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) observe(index, el)
}

// Cores dos avatares por index
const avatarColors = [
  '#FF5A3C', '#00BFA6', '#6366f1',
  '#f59e0b', '#ec4899', '#14b8a6',
]
</script>

<template>
  <section
    id="testimonials"
    class="testimonials section"
    aria-label="Testemunhos de clientes"
  >
    <div class="container">

      <!-- Header ─────────────────────────────────────── -->
      <div
        ref="headerEl"
        class="section__header reveal"
        :class="{ 'is-visible': headerVisible }"
      >
        <span class="section__badge">Testemunhos</span>
        <h2 class="section__title">
          O que dizem os meus <span>clientes</span>
        </h2>
        <p class="section__subtitle">
          Resultados reais de pessoas reais. Cada história é única —
          tal como cada plano de treino que crio.
        </p>
      </div>

      <!-- Grid desktop (hidden mobile) ───────────────── -->
      <ul
        class="testimonials__grid"
        role="list"
        aria-label="Lista de testemunhos"
      >
        <li
          v-for="(t, index) in testimonials"
          :key="t.id"
          :ref="(el) => setRef(el as Element | null, index)"
          class="testimonials__item reveal"
          :class="{ 'is-visible': isItemVisible(index) }"
          :style="{ transitionDelay: `${(index % 3) * 0.12}s` }"
        >
          <BaseCard
            padding="lg"
            class="testimonials__card"
          >
            <!-- Rating ─────────────────────────────── -->
            <div
              class="testimonials__stars"
              :aria-label="`${t.rating} de 5 estrelas`"
              role="img"
            >
              <span
                v-for="n in 5"
                :key="n"
                class="testimonials__star"
                :class="{ 'testimonials__star--filled': n <= t.rating }"
                aria-hidden="true"
              >
                ★
              </span>
            </div>

            <!-- Quote ──────────────────────────────── -->
            <blockquote class="testimonials__quote">
              <p class="testimonials__quote-text">"{{ t.quote }}"</p>
            </blockquote>

            <!-- Autor ──────────────────────────────── -->
            <div class="testimonials__author">
              <div
                class="testimonials__avatar"
                :style="{ background: avatarColors[index % avatarColors.length] }"
                :aria-label="`Avatar de ${t.name}`"
              >
                {{ t.initials }}
              </div>

              <div class="testimonials__author-info">
                <span class="testimonials__author-name">{{ t.name }}</span>
                <span class="testimonials__author-role">{{ t.role }}</span>
              </div>
            </div>

          </BaseCard>
        </li>
      </ul>

      <!-- Carousel mobile ─────────────────────────────── -->
      <div
        class="testimonials__carousel"
        role="region"
        aria-label="Carousel de testemunhos"
        aria-live="polite"
      >
        <Transition name="slide" mode="out-in">
          <BaseCard
            :key="activeIndex"
            padding="lg"
            class="testimonials__card"
          >
            <div
              class="testimonials__stars"
              :aria-label="`${testimonials[activeIndex].rating} de 5 estrelas`"
              role="img"
            >
              <span
                v-for="n in 5"
                :key="n"
                class="testimonials__star"
                :class="{ 'testimonials__star--filled': n <= testimonials[activeIndex].rating }"
                aria-hidden="true"
              >
                ★
              </span>
            </div>

            <blockquote class="testimonials__quote">
              <p class="testimonials__quote-text">
                "{{ testimonials[activeIndex].quote }}"
              </p>
            </blockquote>

            <div class="testimonials__author">
              <div
                class="testimonials__avatar"
                :style="{ background: avatarColors[activeIndex % avatarColors.length] }"
              >
                {{ testimonials[activeIndex].initials }}
              </div>
              <div class="testimonials__author-info">
                <span class="testimonials__author-name">
                  {{ testimonials[activeIndex].name }}
                </span>
                <span class="testimonials__author-role">
                  {{ testimonials[activeIndex].role }}
                </span>
              </div>
            </div>
          </BaseCard>
        </Transition>

        <!-- Controlos ───────────────────────────────── -->
        <div class="testimonials__controls">
          <button
            class="testimonials__ctrl"
            aria-label="Testemunho anterior"
            @click="prev"
          >
            ←
          </button>

          <!-- Dots ────────────────────────────────── -->
          <div class="testimonials__dots" role="tablist">
            <button
              v-for="(_, i) in testimonials"
              :key="i"
              class="testimonials__dot"
              :class="{ 'testimonials__dot--active': i === activeIndex }"
              :aria-selected="i === activeIndex"
              :aria-label="`Testemunho ${i + 1}`"
              role="tab"
              @click="goTo(i)"
            />
          </div>

          <button
            class="testimonials__ctrl"
            aria-label="Próximo testemunho"
            @click="next"
          >
            →
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">


.testimonials {
  background: $color-neutral-100;

  // ─── Grid desktop ─────────────────────────────────────
  &__grid {
    display: none;

    @include respond-to(md) {
      display:               grid;
      grid-template-columns: repeat(2, 1fr);
      gap:                   $spacing-5;
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  // ─── Card ─────────────────────────────────────────────
  &__card {
    height:         100%;
    @include flex-col;
    gap:            $spacing-5;
    transition:     $transition-base;

    &:hover {
      transform:  translateY(-4px);
      box-shadow: $shadow-lg;
    }
  }

  // ─── Stars ────────────────────────────────────────────
  &__stars {
    display: flex;
    gap:     2px;
  }

  &__star {
    font-size: $font-size-lg;
    color:     $color-neutral-200;
    transition: $transition-fast;

    &--filled {
      color: #F59E0B; // amber
    }
  }

  // ─── Quote ────────────────────────────────────────────
  &__quote {
    flex: 1;
  }

  &__quote-text {
    font-family:  $font-body;
    font-size:    $font-size-sm;
    color:        $color-text-muted;
    line-height:  $line-height-loose;
    font-style:   italic;

    @include respond-to(md) {
      font-size: $font-size-base;
    }
  }

  // ─── Author ───────────────────────────────────────────
  &__author {
    display:     flex;
    align-items: center;
    gap:         $spacing-3;
    padding-top: $spacing-4;
    border-top:  1px solid $color-neutral-200;
    margin-top:  auto;
  }

  &__avatar {
    width:         44px;
    height:        44px;
    border-radius: $radius-full;
    @include flex-center;
    font-family:   $font-heading;
    font-size:     $font-size-sm;
    font-weight:   $font-weight-bold;
    color:         $color-white;
    flex-shrink:   0;
    letter-spacing: 0.02em;
  }

  &__author-info {
    @include flex-col;
    gap: 2px;
  }

  &__author-name {
    font-family: $font-heading;
    font-size:   $font-size-sm;
    font-weight: $font-weight-bold;
    color:       $color-text-dark;
  }

  &__author-role {
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       $color-teal;
    font-weight: $font-weight-medium;
  }

  // ─── Carousel mobile ──────────────────────────────────
  &__carousel {
    display: block;

    @include respond-to(md) {
      display: none;
    }
  }

  // ─── Controlos ────────────────────────────────────────
  &__controls {
    display:         flex;
    align-items:     center;
    justify-content: center;
    gap:             $spacing-4;
    margin-top:      $spacing-6;
  }

  &__ctrl {
    width:         40px;
    height:        40px;
    border-radius: $radius-full;
    background:    $color-white;
    border:        1px solid $color-neutral-200;
    @include flex-center;
    font-size:     $font-size-lg;
    cursor:        pointer;
    transition:    $transition-base;
    color:         $color-text-dark;
    box-shadow:    $shadow-sm;

    &:hover {
      background:   $color-accent;
      border-color: $color-accent;
      color:        $color-white;
      transform:    scale(1.08);
      box-shadow:   $shadow-accent;
    }
  }

  // ─── Dots ─────────────────────────────────────────────
  &__dots {
    display: flex;
    gap:     $spacing-2;
  }

  &__dot {
    width:         8px;
    height:        8px;
    border-radius: $radius-full;
    background:    $color-neutral-200;
    border:        none;
    cursor:        pointer;
    transition:    $transition-base;
    padding:       0;

    &--active {
      background: $color-accent;
      width:      24px;
    }

    &:hover:not(&--active) {
      background: color.adjust($color-neutral-200, $lightness: -15%);
    }
  }
}

// ─── Slide transition (carousel) ────────────────────────
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-enter-from {
  opacity:   0;
  transform: translateX(24px);
}

.slide-leave-to {
  opacity:   0;
  transform: translateX(-24px);
}
</style>