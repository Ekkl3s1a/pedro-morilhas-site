<script setup lang="ts">
import { ref, computed } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useWhatsApp }     from '@/composables/useWhatsApp'
import BaseButton          from '@/components/ui/BaseButton.vue'

interface Props {
  formUrl: string
}

defineProps<Props>()

const { isVisible }  = useScrollReveal({ threshold: 0.1 })
const { buildUrl }       = useWhatsApp()

// ── Steps ────────────────────────────────────────────────
type Step = 'goal' | 'level' | 'availability' | 'result'

const currentStep = ref<Step>('goal')
const answers     = ref({
  goal:         '' as string,
  level:        '' as string,
  availability: '' as string,
})

// ── Opções ───────────────────────────────────────────────
const goals = [
  { id: 'loss',    icon: '🔥', label: 'Perder Peso',      desc: 'Reduzir gordura e definir'         },
  { id: 'muscle',  icon: '💪', label: 'Ganhar Massa',      desc: 'Aumentar músculo e força'          },
  { id: 'fitness', icon: '🏃', label: 'Melhorar Condição', desc: 'Resistência e saúde geral'         },
  { id: 'rehab',   icon: '🧘', label: 'Reabilitação',      desc: 'Recuperar de lesão ou dor crónica' },
]

const levels = [
  { id: 'beginner',      icon: '🌱', label: 'Iniciante',   desc: 'Nunca treinei ou parei há muito tempo' },
  { id: 'intermediate',  icon: '⚡', label: 'Intermédio',  desc: 'Treino ocasionalmente'                 },
  { id: 'advanced',      icon: '🏆', label: 'Avançado',    desc: 'Treino regularmente há mais de 1 ano'  },
]

const availabilities = [
  { id: '2x', icon: '📅', label: '2x por semana',  desc: 'Agenda ocupada, treinos curtos'  },
  { id: '3x', icon: '📆', label: '3x por semana',  desc: 'Equilíbrio ideal para resultados' },
  { id: '5x', icon: '🗓️', label: '5x por semana',  desc: 'Máxima dedicação e progresso'    },
]

// ── Resultado personalizado ───────────────────────────────
interface Result {
  title:       string
  description: string
  service:     string
  timeline:    string
  tip:         string
  msgWa:       string
}

const result = computed<Result>(() => {
  const { goal, level, availability } = answers.value

  // Serviço recomendado
  let service = 'Treino Presencial'
  if (level === 'advanced')                service = 'Treino Online'
  if (goal === 'rehab')                    service = 'Treino Funcional'
  if (availability === '2x' && level !== 'beginner') service = 'Treino Online'

  // Timeline estimada
  let timeline = '8-12 semanas'
  if (goal === 'loss'   && availability === '5x') timeline = '6-8 semanas'
  if (goal === 'muscle' && availability === '5x') timeline = '10-16 semanas'
  if (goal === 'rehab')                           timeline = '4-8 semanas'
  if (availability === '2x')                      timeline = '12-16 semanas'

  // Título e descrição
  const goalLabel = goals.find(g => g.id === goal)?.label  ?? ''
  const lvlLabel  = levels.find(l => l.id === level)?.label ?? ''

  const title = `${service} — ${goalLabel}`

  const descriptions: Record<string, string> = {
    loss:    `Para ${lvlLabel.toLowerCase()}, o melhor caminho para perder gordura é combinar treino de força com cardio estratégico. Sem passar fome, sem dietas restritivas.`,
    muscle:  `Para ${lvlLabel.toLowerCase()}, o crescimento muscular exige progressão de carga e nutrição adequada. Vou criar um plano periodizado para maximizares cada sessão.`,
    fitness: `Para ${lvlLabel.toLowerCase()}, vamos melhorar a tua capacidade aeróbica, mobilidade e resistência de forma progressiva e sustentável.`,
    rehab:   `A reabilitação exige uma abordagem cuidadosa e individualizada. Trabalho em conjunto com fisioterapeutas para garantir uma recuperação segura e eficaz.`,
  }

  const tips: Record<string, string> = {
    loss:    '💡 Dica: 80% dos resultados vêm da nutrição. O treino acelera e molda.',
    muscle:  '💡 Dica: O descanso é tão importante quanto o treino. O músculo cresce a recuperar.',
    fitness: '💡 Dica: Consistência bate intensidade. 3x/semana durante 6 meses > 7x/semana durante 1 mês.',
    rehab:   '💡 Dica: A dor não é fraqueza. É informação. Vamos ouvi-la juntos.',
  }

  const msgWa =
    `Olá Pedro! Fiz a calculadora e o meu perfil é:\n` +
    `• Objetivo: ${goalLabel}\n` +
    `• Nível: ${lvlLabel}\n` +
    `• Disponibilidade: ${availability}/semana\n` +
    `Gostava de saber mais sobre o ${service}.`

  return {
    title,
    description: descriptions[goal] ?? '',
    service,
    timeline,
    tip:   tips[goal] ?? '',
    msgWa,
  }
})

// ── Navegação ────────────────────────────────────────────
function selectGoal(id: string) {
  answers.value.goal = id
  currentStep.value  = 'level'
}

function selectLevel(id: string) {
  answers.value.level = id
  currentStep.value   = 'availability'
}

function selectAvailability(id: string) {
  answers.value.availability = id
  currentStep.value          = 'result'
}

function reset() {
  answers.value = { goal: '', level: '', availability: '' }
  currentStep.value = 'goal'
}

// Progresso visual
const stepIndex = computed(() => {
  const map: Record<Step, number> = {
    goal: 1, level: 2, availability: 3, result: 4,
  }
  return map[currentStep.value]
})
</script>

<template>
  <section
    id="calculator"
    class="calculator section"
    aria-label="Calculadora de objetivo"
  >
    <div class="container">

      <!-- Header ────────────────────────────────────── -->
      <div
        ref="el"
        class="section__header reveal"
        :class="{ 'is-visible': isVisible }"
      >
        <span class="section__badge">Calculadora</span>
        <h2 class="section__title">
          Descobre o plano <span>ideal para ti</span>
        </h2>
        <p class="section__subtitle">
          3 perguntas. 30 segundos. Uma recomendação personalizada.
        </p>
      </div>

      <!-- Card da calculadora ─────────────────────── -->
      <div
        class="calculator__card reveal"
        :class="{ 'is-visible': isVisible }"
      >

        <!-- Progress bar interna ──────────────────── -->
        <div
          class="calculator__progress"
          role="progressbar"
          :aria-valuenow="stepIndex"
          aria-valuemin="1"
          aria-valuemax="4"
        >
          <div
            v-for="i in 3"
            :key="i"
            class="calculator__progress-step"
            :class="{
              'calculator__progress-step--done':   i < stepIndex,
              'calculator__progress-step--active': i === stepIndex,
            }"
          />
        </div>

        <!-- ── Step 1: Objetivo ──────────────────── -->
        <Transition name="step" mode="out-in">
          <div v-if="currentStep === 'goal'" key="goal" class="calculator__step">
            <h3 class="calculator__question">
              Qual é o teu <span>principal objetivo</span>?
            </h3>

            <ul class="calculator__options" role="list">
              <li
                v-for="goal in goals"
                :key="goal.id"
              >
                <button
                  class="calculator__option"
                  @click="selectGoal(goal.id)"
                >
                  <span class="calculator__option-icon" aria-hidden="true">
                    {{ goal.icon }}
                  </span>
                  <div class="calculator__option-text">
                    <span class="calculator__option-label">{{ goal.label }}</span>
                    <span class="calculator__option-desc">{{ goal.desc }}</span>
                  </div>
                  <span class="calculator__option-arrow" aria-hidden="true">→</span>
                </button>
              </li>
            </ul>
          </div>
        </Transition>

        <!-- ── Step 2: Nível ─────────────────────── -->
        <Transition name="step" mode="out-in">
          <div v-if="currentStep === 'level'" key="level" class="calculator__step">
            <h3 class="calculator__question">
              Qual é o teu <span>nível de experiência</span>?
            </h3>

            <ul class="calculator__options" role="list">
              <li
                v-for="level in levels"
                :key="level.id"
              >
                <button
                  class="calculator__option"
                  @click="selectLevel(level.id)"
                >
                  <span class="calculator__option-icon" aria-hidden="true">
                    {{ level.icon }}
                  </span>
                  <div class="calculator__option-text">
                    <span class="calculator__option-label">{{ level.label }}</span>
                    <span class="calculator__option-desc">{{ level.desc }}</span>
                  </div>
                  <span class="calculator__option-arrow" aria-hidden="true">→</span>
                </button>
              </li>
            </ul>

            <button class="calculator__back" @click="currentStep = 'goal'">
              ← Voltar
            </button>
          </div>
        </Transition>

        <!-- ── Step 3: Disponibilidade ───────────── -->
        <Transition name="step" mode="out-in">
          <div v-if="currentStep === 'availability'" key="availability" class="calculator__step">
            <h3 class="calculator__question">
              Quantas vezes por semana<br>
              <span>podes treinar</span>?
            </h3>

            <ul class="calculator__options" role="list">
              <li
                v-for="a in availabilities"
                :key="a.id"
              >
                <button
                  class="calculator__option"
                  @click="selectAvailability(a.id)"
                >
                  <span class="calculator__option-icon" aria-hidden="true">
                    {{ a.icon }}
                  </span>
                  <div class="calculator__option-text">
                    <span class="calculator__option-label">{{ a.label }}</span>
                    <span class="calculator__option-desc">{{ a.desc }}</span>
                  </div>
                  <span class="calculator__option-arrow" aria-hidden="true">→</span>
                </button>
              </li>
            </ul>

            <button class="calculator__back" @click="currentStep = 'level'">
              ← Voltar
            </button>
          </div>
        </Transition>

        <!-- ── Step 4: Resultado ──────────────────── -->
        <Transition name="step" mode="out-in">
          <div v-if="currentStep === 'result'" key="result" class="calculator__step">

            <div class="calculator__result">

              <!-- Badge ───────────────────────── -->
              <span class="calculator__result-badge">
                ✅ Plano Recomendado
              </span>

              <!-- Título ──────────────────────── -->
              <h3 class="calculator__result-title">
                {{ result.title }}
              </h3>

              <!-- Descrição ───────────────────── -->
              <p class="calculator__result-desc">
                {{ result.description }}
              </p>

              <!-- Timeline ────────────────────── -->
              <div class="calculator__result-meta">
                <div class="calculator__result-stat">
                  <span class="calculator__result-stat-icon">⏱️</span>
                  <div>
                    <span class="calculator__result-stat-label">Resultados visíveis</span>
                    <span class="calculator__result-stat-value">{{ result.timeline }}</span>
                  </div>
                </div>
                <div class="calculator__result-stat">
                  <span class="calculator__result-stat-icon">🎯</span>
                  <div>
                    <span class="calculator__result-stat-label">Serviço ideal</span>
                    <span class="calculator__result-stat-value">{{ result.service }}</span>
                  </div>
                </div>
              </div>

              <!-- Tip ─────────────────────────── -->
              <p class="calculator__result-tip">
                {{ result.tip }}
              </p>

              <!-- CTAs ────────────────────────── -->
              <div class="calculator__result-actions">
                <BaseButton
                  label="Falar com o Pedro"
                  variant="primary"
                  size="lg"
                  :href="buildUrl(result.msgWa)"
                  :external="true"
                  :full-width="true"
                />
                <BaseButton
                  label="Avaliação Física Inicial"
                  variant="white"
                  size="lg"
                  :href="formUrl"
                  :external="true"
                  :full-width="true"
                />
              </div>

              <!-- Recomeçar ───────────────────── -->
              <button class="calculator__restart" @click="reset">
                ↺ Recomeçar
              </button>

            </div>
          </div>
        </Transition>

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.calculator {
  background: $color-neutral-100;

  // ─── Card ─────────────────────────────────────────────
  &__card {
    max-width:     640px;
    margin-inline: auto;
    background:    $color-white;
    border-radius: $radius-xl;
    box-shadow:    $shadow-lg;
    overflow:      hidden;
  }

  // ─── Progress ─────────────────────────────────────────
  &__progress {
    display:          grid;
    grid-template-columns: repeat(3, 1fr);
    gap:              3px;
    padding:          3px;
    background:       $color-neutral-200;

    &-step {
      height:     4px;
      background: $color-neutral-200;
      border-radius: $radius-full;
      transition: background 0.4s ease;

      &--done,
      &--active {
        background: $color-accent;
      }

      &--done {
        background: $color-teal;
      }
    }
  }

  // ─── Step ─────────────────────────────────────────────
  &__step {
    padding: $spacing-6;

    @include respond-to(md) {
      padding: $spacing-8;
    }
  }

  // ─── Question ─────────────────────────────────────────
  &__question {
    @include heading-3;
    color:         $color-text-dark;
    margin-bottom: $spacing-5;

    span { color: $color-accent; }
  }

  // ─── Options ──────────────────────────────────────────
  &__options {
    @include flex-col;
    gap: $spacing-2;
  }

  &__option {
    width:         100%;
    display:       flex;
    align-items:   center;
    gap:           $spacing-3;
    padding:       $spacing-3 $spacing-4;
    background:    $color-neutral-100;
    border:        1.5px solid $color-neutral-200;
    border-radius: $radius-lg;
    cursor:        pointer;
    transition:    $transition-spring;
    text-align:    left;

    &:hover {
      border-color:   $color-accent;
      background:     rgba($color-accent, 0.04);
      transform:      translateX(4px);
      box-shadow:     $shadow-sm;

      .calculator__option-arrow {
        transform:  translateX(4px);
        color:      $color-accent;
      }
    }

    &:active {
      transform: scale(0.98);
    }
  }

  &__option-icon {
    font-size:   1.6rem;
    line-height: 1;
    flex-shrink: 0;
    width:       40px;
    height:      40px;
    background:  $color-white;
    border-radius: $radius-md;
    @include flex-center;
    box-shadow:  $shadow-sm;
  }

  &__option-text {
    @include flex-col;
    gap:  2px;
    flex: 1;
  }

  &__option-label {
    font-family: $font-heading;
    font-size:   $font-size-sm;
    font-weight: $font-weight-bold;
    color:       $color-text-dark;

    @include respond-to(md) {
      font-size: $font-size-base;
    }
  }

  &__option-desc {
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       $color-text-muted;
  }

  &__option-arrow {
    color:      $color-neutral-200;
    font-size:  $font-size-lg;
    transition: transform 0.2s ease, color 0.2s ease;
    flex-shrink: 0;
  }

  // ─── Back ─────────────────────────────────────────────
  &__back {
    display:     flex;
    align-items: center;
    gap:         $spacing-2;
    margin-top:  $spacing-4;
    font-family: $font-body;
    font-size:   $font-size-sm;
    color:       $color-text-muted;
    background:  none;
    border:      none;
    cursor:      pointer;
    transition:  $transition-base;
    padding:     $spacing-2 0;

    &:hover {
      color: $color-accent;
    }
  }

  // ─── Result ───────────────────────────────────────────
  &__result {
    @include flex-col;
    gap: $spacing-5;
  }

  &__result-badge {
    display:        inline-flex;
    width:          fit-content;
    font-family:    $font-heading;
    font-size:      $font-size-xs;
    font-weight:    $font-weight-bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color:          $color-teal;
    background:     rgba($color-teal, 0.1);
    padding:        $spacing-1 $spacing-3;
    border-radius:  $radius-full;
  }

  &__result-title {
    @include heading-3;
    color: $color-primary;
  }

  &__result-desc {
    @include body-text;
    color: $color-text-muted;
  }

  &__result-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:     $spacing-3;
  }

  &__result-stat {
    display:       flex;
    align-items:   center;
    gap:           $spacing-3;
    padding:       $spacing-3;
    background:    $color-neutral-100;
    border-radius: $radius-md;
    border:        1px solid $color-neutral-200;

    &-icon {
      font-size:   1.4rem;
      flex-shrink: 0;
    }

    &-label {
      display:     block;
      font-family: $font-body;
      font-size:   9px;
      color:       $color-text-muted;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 2px;
    }

    &-value {
      display:     block;
      font-family: $font-heading;
      font-size:   $font-size-xs;
      font-weight: $font-weight-bold;
      color:       $color-text-dark;

      @include respond-to(md) {
        font-size: $font-size-sm;
      }
    }
  }

  &__result-tip {
    font-family:   $font-body;
    font-size:     $font-size-sm;
    color:         $color-text-muted;
    background:    rgba($color-accent, 0.05);
    border-left:   3px solid $color-accent;
    border-radius: 0 $radius-md $radius-md 0;
    padding:       $spacing-3 $spacing-4;
    line-height:   $line-height-loose;
  }

  &__result-actions {
    @include flex-col;
    gap: $spacing-2;
  }

  &__restart {
    align-self:  center;
    font-family: $font-body;
    font-size:   $font-size-sm;
    color:       $color-text-muted;
    background:  none;
    border:      none;
    cursor:      pointer;
    transition:  $transition-base;
    padding:     $spacing-2;

    &:hover {
      color: $color-accent;
    }
  }
}

// ─── Step transition ──────────────────────────────────────
.step-enter-active,
.step-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.step-enter-from {
  opacity:   0;
  transform: translateX(24px);
}

.step-leave-to {
  opacity:   0;
  transform: translateX(-24px);
}
</style>