<script setup lang="ts">
import { useScrollRevealList } from '@/composables/useScrollReveal'
import { useScrollReveal }     from '@/composables/useScrollReveal'
import type { Service }        from '@/types'
import BaseButton              from '@/components/ui/BaseButton.vue'
import BaseCard                from '@/components/ui/BaseCard.vue'

interface Props {
  formUrl: string
}

defineProps<Props>()

const { isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 })
const { observe, isItemVisible }   = useScrollRevealList({ threshold: 0.1 })

const services: Service[] = [
  {
    id:          1,
    icon:        '🏋️',
    title:       'Treino Presencial',
    description: 'Sessões 1:1 num ginásio de Lisboa ou ao domicílio. Plano de treino 100% personalizado, correcção postural e acompanhamento em tempo real.',
    highlight:   false,
  },
  {
    id:          2,
    icon:        '💻',
    title:       'Treino Online',
    description: 'Programa completo com vídeos, app de tracking e check-ins semanais por videochamada. Treina onde quiseres, com a orientação de um profissional.',
    highlight:   true, // card destaque
  },
  {
    id:          3,
    icon:        '🥗',
    title:       'Plano Nutricional',
    description: 'Estratégia alimentar personalizada, sem dietas restritivas. Aprende a comer bem para os teus objetivos sem abrir mão do que gostas.',
    highlight:   false,
  },
  {
    id:          4,
    icon:        '📊',
    title:       'Avaliação Física',
    description: 'Avaliação completa — composição corporal, mobilidade, força e resistência. O ponto de partida para um plano que realmente funciona.',
    highlight:   false,
  },
  {
    id:          5,
    icon:        '🧘',
    title:       'Treino Funcional',
    description: 'Exercícios que melhoram o teu dia-a-dia: mobilidade, equilíbrio e força funcional para te sentires melhor em tudo o que fazes.',
    highlight:   false,
  },
  {
    id:          6,
    icon:        '🔥',
    title:       'Programa de Grupo',
    description: 'Sessões em pequenos grupos (máx. 6 pessoas). A energia coletiva que te motiva, com a atenção personalizada que mereces.',
    highlight:   false,
  },
]

function setRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) observe(index, el)
}
</script>

<template>
  <section id="services" class="services section" aria-label="Serviços">
    <div class="container">

      <!-- Header ─────────────────────────────────────── -->
      <div
        ref="headerEl"
        class="section__header reveal"
        :class="{ 'is-visible': headerVisible }"
      >
        <span class="section__badge">O Que Ofereço</span>
        <h2 class="section__title">
          Serviços criados para os<br>
          <span>teus resultados</span>
        </h2>
        <p class="section__subtitle">
          Cada serviço é desenhado à medida — porque não existe
          uma solução única para todos os corpos e objetivos.
        </p>
      </div>

      <!-- Grid de serviços ────────────────────────────── -->
      <ul class="services__grid" role="list">
        <li
          v-for="(service, index) in services"
          :key="service.id"
          :ref="(el) => setRef(el as Element | null, index)"
          class="services__item reveal"
          :class="{
            'is-visible':          isItemVisible(index),
            'services__item--highlight': service.highlight,
          }"
          :style="{ transitionDelay: `${(index % 3) * 0.1}s` }"
        >
          <BaseCard
            :dark="service.highlight"
            :accent="service.highlight"
            padding="lg"
            class="services__card"
          >
            <!-- Ícone ──────────────────────────────── -->
            <div
              class="services__icon"
              :class="{ 'services__icon--highlight': service.highlight }"
              aria-hidden="true"
            >
              {{ service.icon }}
            </div>

            <!-- Badge popular ──────────────────────── -->
            <span
              v-if="service.highlight"
              class="services__popular"
              aria-label="Mais popular"
            >
              ⭐ Mais Popular
            </span>

            <!-- Título ─────────────────────────────── -->
            <h3
              class="services__title"
              :class="{ 'services__title--light': service.highlight }"
            >
              {{ service.title }}
            </h3>

            <!-- Descrição ──────────────────────────── -->
            <p
              class="services__desc"
              :class="{ 'services__desc--light': service.highlight }"
            >
              {{ service.description }}
            </p>

            <!-- CTA inline ─────────────────────────── -->
            <a
              :href="formUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="services__link"
              :class="{ 'services__link--light': service.highlight }"
              :aria-label="`Saber mais sobre ${service.title}`"
            >
              Saber mais
              <span aria-hidden="true" class="services__link-arrow">→</span>
            </a>
          </BaseCard>
        </li>
      </ul>

      <!-- CTA bottom ──────────────────────────────────── -->
      <div class="services__bottom reveal" :class="{ 'is-visible': headerVisible }">
        <p class="services__bottom-text">
          Não tens a certeza qual o serviço certo para ti?
        </p>
        <BaseButton
          label="Fala Comigo Gratuitamente"
          variant="primary"
          size="lg"
          :href="formUrl"
          :external="true"
        />
      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">


.services {
  background: $color-white;

  // ─── Grid ───────────────────────────────────────────────
  &__grid {
    display:               grid;
    grid-template-columns: 1fr;
    gap:                   $spacing-5;

    @include respond-to(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  // ─── Item ───────────────────────────────────────────────
  &__item {
    &--highlight {
      // Card destaque ocupa mais espaço no desktop
      @include respond-to(sm) {
        grid-column: span 2;
      }

      @include respond-to(lg) {
        grid-column: span 1;
      }
    }
  }

  // ─── Card ───────────────────────────────────────────────
  &__card {
    height:         100%;
    @include flex-col;
    gap:            $spacing-4;
  }

  // ─── Ícone ──────────────────────────────────────────────
  &__icon {
    width:         56px;
    height:        56px;
    border-radius: $radius-lg;
    background:    rgba($color-accent, 0.1);
    @include flex-center;
    font-size:     1.8rem;
    flex-shrink:   0;
    transition:    $transition-base;

    &--highlight {
      background: rgba($color-white, 0.12);
    }
  }

  :deep(.card):hover &__icon {
    background: rgba($color-accent, 0.18);
    transform:  scale(1.08) rotate(-3deg);
  }

  // ─── Popular badge ──────────────────────────────────────
  &__popular {
    display:        inline-flex;
    align-items:    center;
    gap:            $spacing-1;
    width:          fit-content;
    font-family:    $font-heading;
    font-size:      $font-size-xs;
    font-weight:    $font-weight-bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color:          $color-accent;
    background:     rgba($color-accent, 0.15);
    padding:        $spacing-1 $spacing-3;
    border-radius:  $radius-full;
  }

  // ─── Título ─────────────────────────────────────────────
  &__title {
    @include heading-3;
    color: $color-text-dark;

    &--light {
      color: $color-white;
    }
  }

  // ─── Descrição ──────────────────────────────────────────
  &__desc {
    font-family:  $font-body;
    font-size:    $font-size-sm;
    color:        $color-text-muted;
    line-height:  $line-height-loose;
    flex:         1; // empurra o link para o fundo do card

    &--light {
      color: rgba($color-white, 0.7);
    }
  }

  // ─── Link inline ────────────────────────────────────────
  &__link {
    display:         inline-flex;
    align-items:     center;
    gap:             $spacing-2;
    font-family:     $font-heading;
    font-size:       $font-size-sm;
    font-weight:     $font-weight-bold;
    color:           $color-accent;
    text-decoration: none;
    margin-top:      auto;
    padding-top:     $spacing-3;
    border-top:      1px solid $color-neutral-200;
    transition:      $transition-base;

    &--light {
      color:        rgba($color-white, 0.85);
      border-color: rgba($color-white, 0.12);
    }

    &:hover {
      color: color.adjust($color-accent, $lightness: -10%);

      .services__link-arrow {
        transform: translateX(4px);
      }
    }
  }

  &__link-arrow {
    transition: transform 0.2s ease;
  }

  // ─── Bottom CTA ─────────────────────────────────────────
  &__bottom {
    margin-top:  $spacing-16;
    @include flex-col;
    align-items: center;
    gap:         $spacing-5;
    text-align:  center;
  }

  &__bottom-text {
    font-family: $font-body;
    font-size:   $font-size-lg;
    color:       $color-text-muted;
  }
}
</style>