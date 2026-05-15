<script setup lang="ts">

import { ref }             from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import type { FAQItem }    from '@/types'
import BaseButton          from '@/components/ui/BaseButton.vue'

import { useWhatsApp } from '@/composables/useWhatsApp'

interface Props {
  formUrl: string
}

defineProps<Props>()

const { buildUrl } = useWhatsApp()

const MSG_FAQ = 'Gostava de fazer uma pergunta sobre'

const { isVisible: headerVisible } = useScrollReveal({ threshold: 0.1 })
const { isVisible: listVisible }   = useScrollReveal({ threshold: 0.05 })

const openIndex = ref<number | null>(null)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}

const faqs: FAQItem[] = [
  {
    id:       1,
    question: 'Como funciona o primeiro contacto?',
    answer:   'Após preencheres o formulário, entro em contacto em menos de 24h para marcarmos uma consulta inicial gratuita (presencial ou por videochamada). Nessa consulta avalio os teus objetivos, historial e disponibilidade para criar o teu plano personalizado.',
  },
  {
    id:       2,
    question: 'Preciso de ter experiência em ginásio?',
    answer:   'Não! Trabalho com pessoas de todos os níveis — desde iniciantes absolutos até atletas avançados. O plano é sempre adaptado ao teu ponto de partida. O mais importante é a tua vontade de mudar.',
  },
  {
    id:       3,
    question: 'Qual é a diferença entre treino presencial e online?',
    answer:   'No presencial estou contigo em cada sessão, a corrigir técnica e a motivar em tempo real. No online tens toda a flexibilidade — programa detalhado, vídeos de cada exercício, app de tracking e check-ins semanais por videochamada. Ambos têm os mesmos resultados comprovados.',
  },
  {
    id:       4,
    question: 'Quanto tempo até ver resultados?',
    answer:   'Os primeiros resultados (energia, disposição, força) aparecem nas primeiras 2-3 semanas. Resultados visuais significativos surgem tipicamente entre os 6 e 12 semanas, dependendo do objetivo. A consistência é a chave — e eu estou cá para te ajudar a mantê-la.',
  },
  {
    id:       5,
    question: 'O plano inclui nutrição?',
    answer:   'Todos os planos incluem orientação nutricional base. Para um plano alimentar completo e personalizado (com cálculo de macros, receitas e suplementação), existe o serviço de Plano Nutricional como add-on ou pacote combinado.',
  },
  {
    id:       6,
    question: 'E se eu tiver uma lesão ou condição médica?',
    answer:   'A minha formação inclui treino adaptado e reabilitação funcional. Trabalho em coordenação com fisioterapeutas e médicos quando necessário. Muitos dos meus clientes chegaram precisamente por essa razão e hoje treinam sem limitações.',
  },
  {
    id:       7,
    question: 'Posso cancelar ou pausar o meu plano?',
    answer:   'Sim. Não há contratos longos nem letras miúdas. Podes pausar ou cancelar com 15 dias de antecedência. A flexibilidade é importante — a vida acontece, e eu adapto-me contigo.',
  },
  {
    id:       8,
    question: 'Tens disponibilidade para novos clientes?',
    answer:   'Trabalho com um número limitado de clientes para garantir atenção total a cada pessoa. Atualmente tenho vagas limitadas — preenche o formulário para garantires o teu lugar e saber mais sobre a lista de espera.',
  },
]
</script>

<template>
  <section
    id="faq"
    class="faq section"
    aria-label="Perguntas frequentes"
  >
    <div class="container">

      <!-- Layout duas colunas no desktop ──────────────── -->
      <div class="faq__layout">

        <!-- Coluna esquerda — header fixo ───────────── -->
        <div
          ref="headerEl"
          class="faq__sidebar reveal-left"
          :class="{ 'is-visible': headerVisible }"
        >
          <span class="section__badge">FAQ</span>

          <h2 class="section__title faq__title">
            Perguntas<br>
            <span>Frequentes</span>
          </h2>

          <p class="faq__subtitle">
            Não encontras a resposta que procuras?
            Fala diretamente comigo.
          </p>

          <BaseButton
            label="Faz a tua pergunta"
            variant="primary"
            size="md"
            :href="buildUrl(MSG_FAQ)"
            :external="true"
          />

          <!-- Decoração ──────────────────────────────── -->
          <div class="faq__deco" aria-hidden="true">
            <span class="faq__deco-text">?</span>
          </div>
        </div>

        <!-- Coluna direita — accordion ──────────────── -->
        <div
          ref="listEl"
          class="faq__list reveal-right"
          :class="{ 'is-visible': listVisible }"
          role="list"
        >
          <div
            v-for="(faq, index) in faqs"
            :key="faq.id"
            class="faq__item"
            :class="{
              'faq__item--open': openIndex === index,
            }"
            :style="{ transitionDelay: `${index * 0.05}s` }"
            role="listitem"
          >
            <!-- Pergunta ─────────────────────────────── -->
            <button
              class="faq__question"
              :aria-expanded="openIndex === index"
              :aria-controls="`faq-answer-${faq.id}`"
              :id="`faq-question-${faq.id}`"
              @click="toggle(index)"
            >
              <span class="faq__question-text">
                {{ faq.question }}
              </span>
              <span
                class="faq__icon"
                :class="{ 'faq__icon--open': openIndex === index }"
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <!-- Resposta ─────────────────────────────── -->
            <Transition name="accordion">
              <div
                v-if="openIndex === index"
                :id="`faq-answer-${faq.id}`"
                class="faq__answer"
                role="region"
                :aria-labelledby="`faq-question-${faq.id}`"
              >
                <p class="faq__answer-text">
                  {{ faq.answer }}
                </p>
              </div>
            </Transition>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  background: $color-neutral-100;

  // ─── Layout ───────────────────────────────────────────
  &__layout {
    display: grid;
    gap:     $spacing-8;

    @include respond-to(lg) {
      grid-template-columns: 320px 1fr;
      gap:         $spacing-16;
      align-items: start;
    }
  }

  // ─── Sidebar ──────────────────────────────────────────
  &__sidebar {
    @include flex-col;
    gap: $spacing-4;

    @include respond-to(lg) {
      position: sticky;
      top:      calc(#{$header-height} + #{$spacing-6});
    }
  }

  &__title {
    text-align: left !important;
    margin-bottom: 0 !important;
  }

  &__subtitle {
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       $color-text-muted;
    line-height: $line-height-loose;
    max-width:   280px;

    @include respond-to(md) {
      font-size: $font-size-base;
    }
  }

  // Decoração "?" gigante
  &__deco {
    display: none;

    @include respond-to(lg) {
      display:   block;
      position:  absolute;
      bottom:    -$spacing-16;
      right:     -$spacing-8;
      z-index:   0;
      pointer-events: none;
    }
  }

  &__deco-text {
    font-family:  $font-heading;
    font-size:    10rem;
    font-weight:  $font-weight-black;
    color:        rgba($color-accent, 0.04);
    line-height:  1;
    user-select:  none;
  }

  // ─── List ─────────────────────────────────────────────
  &__list {
    @include flex-col;
    gap: $spacing-2;
  }

  // ─── Item ─────────────────────────────────────────────
  &__item {
    background:    $color-white;
    border-radius: $radius-lg;
    border:        1px solid $color-neutral-200;
    overflow:      hidden;
    transition:    border-color 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      border-color: rgba($color-accent, 0.3);
    }

    &--open {
      border-color: $color-accent;
      box-shadow:   0 0 0 3px rgba($color-accent, 0.08);
    }
  }

  // ─── Question ─────────────────────────────────────────
  &__question {
    width:      100%;
    @include flex-between;
    gap:        $spacing-3;
    padding:    $spacing-4;
    text-align: left;
    cursor:     pointer;
    background: none;
    border:     none;
    transition: $transition-base;

    &:hover {
      background: rgba($color-accent, 0.02);
    }

    @include respond-to(md) {
      padding: $spacing-5 $spacing-6;
    }
  }

  &__question-text {
    font-family: $font-heading;
    font-size:   $font-size-xs;
    font-weight: $font-weight-semibold;
    color:       $color-text-dark;
    line-height: $line-height-tight;
    flex:        1;

    @include respond-to(md) {
      font-size: $font-size-base;
    }

    @include respond-to(lg) {
      font-size: $font-size-lg;
    }
  }

  // ─── Ícone +/- ────────────────────────────────────────
  &__icon {
    width:          24px;
    height:         24px;
    border-radius:  $radius-full;
    background:     $color-neutral-100;
    border:         1px solid $color-neutral-200;
    @include flex-center;
    font-size:      $font-size-base;
    font-weight:    $font-weight-bold;
    color:          $color-text-muted;
    flex-shrink:    0;
    transition:     $transition-spring;
    line-height:    1;

    &--open {
      background:   $color-accent;
      border-color: $color-accent;
      color:        $color-white;
      transform:    rotate(45deg);
    }

    @include respond-to(md) {
      width:  28px;
      height: 28px;
    }
  }

  // ─── Answer ───────────────────────────────────────────
  &__answer {
    padding:    0 $spacing-4 $spacing-4;
    border-top: 1px solid $color-neutral-200;

    @include respond-to(md) {
      padding: 0 $spacing-6 $spacing-5;
    }
  }

  &__answer-text {
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       $color-text-muted;
    line-height: $line-height-loose;
    padding-top: $spacing-3;

    @include respond-to(md) {
      font-size:   $font-size-sm;
      padding-top: $spacing-4;
    }

    @include respond-to(lg) {
      font-size: $font-size-base;
    }
  }
}

// ─── Accordion transition ─────────────────────────────────
.accordion-enter-active,
.accordion-leave-active {
  transition:      opacity 0.28s ease, transform 0.28s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity:   0;
  transform: translateY(-8px);
}
</style>