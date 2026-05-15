<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  formUrl: string
}

defineProps<Props>()

const { isVisible } = useScrollReveal({ threshold: 0.1 })
const { isVisible: imageVisible } = useScrollReveal({ threshold: 0.2 })

const values = [
  {
    icon:  '🎯',
    title: 'Personalização Total',
    text:  'Cada plano é criado de raiz para o teu corpo, objetivo e estilo de vida.',
  },
  {
    icon:  '📈',
    title: 'Progressão Contínua',
    text:  'Monitorização semanal e ajustes constantes para nunca estagnares.',
  },
  {
    icon:  '🧠',
    title: 'Mentalidade Vencedora',
    text:  'O treino físico começa na cabeça. Trabalho contigo dentro e fora do ginásio.',
  },
  {
    icon:  '🤝',
    title: 'Compromisso Real',
    text:  'Estou contigo em cada passo — sem desculpas, com resultados.',
  },
]

const certifications = [
  'Licenciatura em Ciências do Desporto — FMH Lisboa',
  'Certificação NSCA — Certified Personal Trainer',
  'Especialização em Nutrição Desportiva',
  'Curso Avançado de Treino Funcional',
  'Certificação em Psicologia do Desporto',
]
</script>

<template>
  <section id="about" class="about section" aria-label="Sobre mim">
    <div class="container">

      <!-- Layout duas colunas ──────────────────────────── -->
      <div class="about__grid">

        <!-- Coluna imagem ────────────────────────────────── -->
        <div
          ref="imageEl"
          class="about__image-col reveal-left"
          :class="{ 'is-visible': imageVisible }"
        >
          <!-- Frame da foto -->
          <div class="about__image-frame">

            <!-- Placeholder com iniciais (substituir por <img>) -->
            <div class="about__image-placeholder" aria-hidden="true">
              <img
                src="@/assets/images/pedro.jpg"
                alt="Pedro Morilhas — Personal Trainer"
                class="about__photo"
                loading="lazy"
              />
            </div>

            <!-- Decoração geométrica -->
            <div class="about__image-deco about__image-deco--tl" aria-hidden="true" />
            <div class="about__image-deco about__image-deco--br" aria-hidden="true" />

            <!-- Badge flutuante — experiência -->
            <div class="about__float-badge about__float-badge--years" aria-label="8 anos de experiência">
              <span class="about__float-badge-value">8+</span>
              <span class="about__float-badge-label">Anos de<br>Experiência</span>
            </div>

            <!-- Badge flutuante — clientes -->
            <div class="about__float-badge about__float-badge--clients" aria-label="Mais de 150 clientes">
              <span class="about__float-badge-icon" aria-hidden="true">🏆</span>
              <span class="about__float-badge-label">150+ Clientes<br>Transformados</span>
            </div>
          </div>
        </div>

        <!-- Coluna texto ─────────────────────────────────── -->
        <div
          ref="sectionEl"
          class="about__content reveal-right"
          :class="{ 'is-visible': isVisible }"
        >
          <span class="section__badge">Sobre Mim</span>

          <h2 class="section__title">
            Não sou apenas um <span>personal trainer</span>
          </h2>

          <p class="about__lead">
            Sou o teu parceiro de transformação. Com mais de 8 anos
            de experiência, já ajudei mais de 150 pessoas a alcançarem
            o corpo e a saúde que sempre quiseram.
          </p>

          <p class="about__text">
            A minha abordagem vai além do treino físico — combino
            ciência do exercício, nutrição e psicologia desportiva
            para criar um programa verdadeiramente completo, adaptado
            a quem tu és e ao que queres alcançar.
          </p>

          <!-- Valores ──────────────────────────────────── -->
          <ul class="about__values" role="list" aria-label="Os meus valores">
            <li
              v-for="(value, i) in values"
              :key="value.title"
              class="about__value"
              :class="{ 'is-visible': isVisible }"
              :style="{ transitionDelay: `${i * 0.1 + 0.3}s` }"
            >
              <span class="about__value-icon" aria-hidden="true">
                {{ value.icon }}
              </span>
              <div>
                <h3 class="about__value-title">{{ value.title }}</h3>
                <p  class="about__value-text">{{ value.text }}</p>
              </div>
            </li>
          </ul>

          <!-- Certificações ────────────────────────────── -->
          <details class="about__certs">
            <summary class="about__certs-summary">
              <span>Ver Certificações</span>
              <span class="about__certs-arrow" aria-hidden="true">↓</span>
            </summary>
            <ul class="about__certs-list" role="list">
              <li
                v-for="cert in certifications"
                :key="cert"
                class="about__cert"
              >
                <span aria-hidden="true" class="about__cert-icon">✓</span>
                {{ cert }}
              </li>
            </ul>
          </details>

          <!-- CTA ──────────────────────────────────────── -->
          <div class="about__actions">
            <BaseButton
              label="Quero Começar"
              variant="primary"
              size="lg"
              :href="formUrl"
              :external="true"
            />
            <BaseButton
              label="Ver Serviços"
              variant="outline"
              size="lg"
              href="#services"
            />
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about {
  background: $color-neutral-100;
  overflow:   hidden;

  // ─── Grid ───────────────────────────────────────────────
  &__grid {
    display:     grid;
    gap:         $spacing-8;
    align-items: center;

    @include respond-to(lg) {
      grid-template-columns: 1fr 1fr;
      gap: $spacing-16;
    }
  }

  // ─── Image column ───────────────────────────────────────
  &__image-col {
    order: 2;

    @include respond-to(lg) {
      order: 1;
    }
  }

  &__image-frame {
    position:      relative;
    border-radius: $radius-xl;
    max-width:     280px;      // compacto no mobile
    margin-inline: auto;

    @include respond-to(sm) {
      max-width: 320px;
    }

    @include respond-to(md) {
      max-width: 380px;
    }

    @include respond-to(lg) {
      max-width: 440px;
      margin-inline: 0;
    }
  }

  &__image-placeholder {
    width:         100%;
    aspect-ratio:  3 / 4;
    border-radius: $radius-xl;
    background:    $gradient-hero;
    @include flex-center;
    overflow:      hidden;
    box-shadow:    $shadow-lg;
  }

  &__photo {
    width:      100%;
    height:     100%;
    object-fit: cover;
    object-position: center;
    opacity:   0;
    animation: fadeInScale 0.8s ease 0.4s both;
  }

  &__image-initials {
    font-family:  $font-heading;
    font-size:    clamp(3rem, 12vw, 6rem); // fluido
    font-weight:  $font-weight-black;
    color:        rgba($color-white, 0.12);
    user-select:  none;
  }

  // Decoração geométrica
  &__image-deco {
    display: none;

    @include respond-to(md) {
      display:       block;
      position:      absolute;
      width:         60px;
      height:        60px;
      border-radius: $radius-lg;
      z-index:       -1;

      &--tl {
        top:        -12px;
        left:       -12px;
        background: $color-accent;
        opacity:    0.6;
      }

      &--br {
        bottom:     -12px;
        right:      -12px;
        background: $color-teal;
        opacity:    0.4;
      }
    }
  }

  // Badges flutuantes
  &__float-badge {
    display: none;

    @include respond-to(md) {
      display:       flex;
      position:      absolute;
      background:    $color-white;
      border-radius: $radius-lg;
      box-shadow:    $shadow-lg;
      padding:       $spacing-3 $spacing-4;
      align-items:   center;
      gap:           $spacing-3;
      z-index:       $z-card;

      &--years {
        bottom: $spacing-8;
        left:   -$spacing-8;
      }

      &--clients {
        top:   $spacing-8;
        right: -$spacing-8;
      }
    }
  }

  &__float-badge-value {
    font-family:  $font-heading;
    font-size:    $font-size-2xl;
    font-weight:  $font-weight-black;
    color:        $color-accent;
    line-height:  1;
  }

  &__float-badge-label {
    font-family: $font-body;
    font-size:   $font-size-xs;
    font-weight: $font-weight-semibold;
    color:       $color-text-muted;
    line-height: $line-height-tight;
  }

  &__float-badge-icon {
    font-size: 1.5rem;
  }

  // ─── Content column ─────────────────────────────────────
  &__content {
    order: 1;
    @include flex-col;
    gap: $spacing-4;

    @include respond-to(lg) {
      order: 2;
      gap:   $spacing-5;
    }
  }

  &__lead {
    font-family: $font-body;
    font-size:   $font-size-sm;
    font-weight: $font-weight-medium;
    color:       $color-text-dark;
    line-height: $line-height-loose;

    @include respond-to(md) {
      font-size: $font-size-lg;
    }

    @include respond-to(lg) {
      font-size: $font-size-xl;
    }
  }

  &__text {
    @include body-text;
    color: $color-text-muted;
  }

  // ─── Values ─────────────────────────────────────────────
  &__values {
    display:               grid;
    grid-template-columns: 1fr 1fr;
    gap:                   $spacing-3;

    @include respond-to(md) {
      grid-template-columns: 1fr;
      gap:                   $spacing-4;
    }
  }

  &__value {
    display:       flex;
    align-items:   flex-start;
    gap:           $spacing-2;
    padding:       $spacing-3;
    border-radius: $radius-md;
    border:        1px solid $color-neutral-200;
    background:    $color-white;
    transition:    $transition-base;

    opacity:   0;
    transform: translateX(20px);

    &.is-visible {
      opacity:   1;
      transform: translateX(0);
    }

    &:hover {
      border-color: $color-accent;
      box-shadow:   $shadow-sm;
    }

    @include respond-to(md) {
      gap:     $spacing-4;
      padding: $spacing-4;
    }
  }

  &__value-icon {
    font-size:   1.2rem;
    line-height: 1;
    flex-shrink: 0;

    @include respond-to(md) {
      font-size: 1.6rem;
    }
  }

  &__value-title {
    font-family:   $font-heading;
    font-size:     $font-size-xs;
    font-weight:   $font-weight-bold;
    color:         $color-text-dark;
    margin-bottom: 2px;

    @include respond-to(md) {
      font-size:     $font-size-base;
      margin-bottom: $spacing-1;
    }
  }

  &__value-text {
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       $color-text-muted;
    line-height: $line-height-normal;

    @include respond-to(md) {
      font-size:   $font-size-sm;
      line-height: $line-height-loose;
    }
  }

  // ─── Certifications ─────────────────────────────────────
  &__certs {
    border:        1px solid $color-neutral-200;
    border-radius: $radius-lg;
    background:    $color-white;
  }

  &__certs-summary {
    @include flex-between;
    padding:     $spacing-3 $spacing-4;
    cursor:      pointer;
    font-family: $font-heading;
    font-size:   $font-size-sm;
    font-weight: $font-weight-semibold;
    color:       $color-text-dark;
    transition:  $transition-base;
    user-select: none;
    list-style:  none;

    &::-webkit-details-marker { display: none; }

    &:hover {
      background: $color-neutral-100;
      color:      $color-accent;
    }
  }

  &__certs-arrow {
    transition: transform 0.3s ease;
    color:      $color-accent;
  }

  details[open] &__certs-arrow {
    transform: rotate(180deg);
  }

  &__certs-list {
    @include flex-col;
    gap:        $spacing-2;
    padding:    $spacing-3 $spacing-4;
    border-top: 1px solid $color-neutral-200;
  }

  &__cert {
    display:     flex;
    align-items: center;
    gap:         $spacing-2;
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       $color-text-muted;

    @include respond-to(md) {
      font-size: $font-size-sm;
    }
  }

  &__cert-icon {
    color:       $color-teal;
    font-weight: $font-weight-bold;
    flex-shrink: 0;
  }

  // ─── Actions ────────────────────────────────────────────
  &__actions {
    display:   flex;
    flex-wrap: wrap;
    gap:       $spacing-2;

    @include mobile-only {
      gap: $spacing-2;

      // Botões side-by-side, dividem o espaço igualmente
      :deep(.btn) {
        flex:            1;
        min-width:       0;
        justify-content: center;
        padding-inline:  $spacing-3;
        font-size:       $font-size-xs;
      }
    }

    @include respond-to(md) {
      gap: $spacing-3;

      :deep(.btn) {
        flex:  none;
        width: auto;
      }
    }
  }
}
</style>