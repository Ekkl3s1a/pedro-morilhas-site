<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollReveal }             from '@/composables/useScrollReveal'
import { useSwipe }                    from '@/composables/useSwipe'
import { useWhatsApp }                 from '@/composables/useWhatsApp'
import BaseButton                      from '@/components/ui/BaseButton.vue'

interface Props {
  formUrl: string
}

defineProps<Props>()

const { isVisible: headerVisible } = useScrollReveal({ threshold: 0.1 })
const { buildUrl } = useWhatsApp()

const MSG = 'Olá Pedro! Vi as transformações no teu site e gostava de começar!'

// ── Dados ────────────────────────────────────────────────
interface Transformation {
  id:       number
  name:     string
  goal:     string
  duration: string
  result:   string
  color:    string
}

const transformations: Transformation[] = [
  { id: 1, name: 'Ana R.',    goal: 'Perda de Peso',   duration: '5 meses', result: '−18kg',     color: '#FF5A3C' },
  { id: 2, name: 'Miguel S.', goal: 'Ganho Muscular',  duration: '6 meses', result: '+8kg massa', color: '#00BFA6' },
  { id: 3, name: 'Sofia M.',  goal: 'Definição',       duration: '4 meses', result: '−12kg',      color: '#6366f1' },
]

// ── Desktop: drag slider ─────────────────────────────────
const sliderPositions = ref<number[]>(transformations.map(() => 50))
const isDragging      = ref<number | null>(null)
const sliderRefs      = ref<HTMLElement[]>([])

function startDrag(index: number, e: MouseEvent | TouchEvent) {
  isDragging.value = index
  e.preventDefault()
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (isDragging.value === null) return
  const el = sliderRefs.value[isDragging.value]
  if (!el)  return

  const rect    = el.getBoundingClientRect()
  const clientX = 'touches' in e
    ? e.touches[0].clientX
    : (e as MouseEvent).clientX

  const pos = ((clientX - rect.left) / rect.width) * 100
  sliderPositions.value[isDragging.value] = Math.min(95, Math.max(5, pos))
}

function stopDrag() {
  isDragging.value = null
}

// ── Mobile: tap-to-toggle ────────────────────────────────
// Guarda qual face está visível por card: false = antes, true = depois
const showAfter = ref<boolean[]>(transformations.map(() => false))

function toggleCard(index: number) {
  showAfter.value[index] = !showAfter.value[index]
}

// ── Carousel mobile (swipe entre cards) ─────────────────
const activeCard  = ref(0)
const carouselRef = ref<HTMLElement | null>(null)

const { attach } = useSwipe({
  threshold:    45,
  onSwipeLeft:  () => {
    if (activeCard.value < transformations.length - 1) activeCard.value++
  },
  onSwipeRight: () => {
    if (activeCard.value > 0) activeCard.value--
  },
})

onMounted(() => {
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup',   stopDrag)
  window.addEventListener('touchmove', onDrag,  { passive: false })
  window.addEventListener('touchend',  stopDrag)

  if (carouselRef.value) attach(carouselRef.value)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup',   stopDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend',  stopDrag)
})

function setSliderRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) sliderRefs.value[index] = el
}
</script>

<template>
  <section
    id="results"
    class="ba section"
    aria-label="Transformações antes e depois"
  >
    <div class="container">

      <!-- Header ─────────────────────────────────────── -->
      <div
        ref="headerEl"
        class="section__header reveal"
        :class="{ 'is-visible': headerVisible }"
      >
        <span class="section__badge">Transformações</span>
        <h2 class="section__title">
          Resultados que <span>falam por si</span>
        </h2>

        <!-- Instrução diferente por dispositivo -->
        <p class="section__subtitle ba__subtitle--desktop">
          Arrasta o slider para ver a diferença.
        </p>
        <p class="section__subtitle ba__subtitle--mobile">
          Toca no card para ver a transformação.
        </p>
      </div>

      <!-- ── DESKTOP: drag slider grid ──────────────── -->
      <div class="ba__desktop">
        <div class="ba__grid">
          <div
            v-for="(t, index) in transformations"
            :key="t.id"
            :ref="(el) => setSliderRef(el as Element | null, index)"
            class="ba__card reveal"
            :class="{ 'is-visible': headerVisible }"
            :style="{ transitionDelay: `${index * 0.12}s` }"
          >
            <div class="ba__slider-wrap">

              <!-- Depois (fundo) -->
              <div
                class="ba__image ba__image--after"
                :style="{ background: `linear-gradient(135deg, ${t.color}18 0%, ${t.color}35 100%)` }"
              >
                <div class="ba__placeholder">
                  <span class="ba__label ba__label--after">Depois</span>
                  <span class="ba__emoji" aria-hidden="true">💪</span>
                </div>
              </div>

              <!-- Antes (clipado) -->
              <div
                class="ba__image ba__image--before"
                :style="{ clipPath: `inset(0 ${100 - sliderPositions[index]}% 0 0)` }"
              >
                <div class="ba__placeholder ba__placeholder--dark">
                  <span class="ba__label ba__label--before">Antes</span>
                  <span class="ba__emoji" aria-hidden="true">🌱</span>
                </div>
              </div>

              <!-- Divisória -->
              <div
                class="ba__divider"
                :style="{ left: `${sliderPositions[index]}%` }"
                role="slider"
                :aria-valuenow="Math.round(sliderPositions[index])"
                aria-valuemin="5"
                aria-valuemax="95"
                tabindex="0"
                @mousedown="startDrag(index, $event)"
                @touchstart.prevent="startDrag(index, $event)"
              >
                <div class="ba__divider-line" />
                <div class="ba__divider-handle">◀▶</div>
              </div>

              <p class="ba__hint" aria-hidden="true">← arrasta →</p>
            </div>

            <!-- Info -->
            <div class="ba__info">
              <div>
                <span class="ba__name">{{ t.name }}</span>
                <span class="ba__goal">{{ t.goal }}</span>
              </div>
              <div class="ba__info-right">
                <span class="ba__result" :style="{ color: t.color }">
                  {{ t.result }}
                </span>
                <span class="ba__duration">em {{ t.duration }}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ── MOBILE: tap-to-toggle carousel ─────────── -->
      <div class="ba__mobile">

        <!-- Carousel com swipe -->
        <div ref="carouselRef" class="ba__carousel">
          <Transition name="card-slide" mode="out-in">
            <div
              :key="activeCard"
              class="ba__mobile-card"
              @click="toggleCard(activeCard)"
            >
              <!-- Face Antes -->
              <Transition name="flip" mode="out-in">
                <div
                  v-if="!showAfter[activeCard]"
                  key="before"
                  class="ba__face ba__face--before"
                >
                  <span class="ba__face-tag ba__face-tag--before">
                    Antes
                  </span>
                  <span class="ba__face-emoji" aria-hidden="true">🌱</span>
                  <p class="ba__face-hint">Toca para ver o resultado →</p>
                </div>

                <!-- Face Depois -->
                <div
                  v-else
                  key="after"
                  class="ba__face ba__face--after"
                  :style="{ background: `linear-gradient(135deg, ${transformations[activeCard].color}22, ${transformations[activeCard].color}44)` }"
                >
                  <span class="ba__face-tag ba__face-tag--after">
                    Depois
                  </span>
                  <span class="ba__face-emoji" aria-hidden="true">💪</span>
                  <span
                    class="ba__face-result"
                    :style="{ color: transformations[activeCard].color }"
                  >
                    {{ transformations[activeCard].result }}
                  </span>
                  <p class="ba__face-hint">← Toca para voltar</p>
                </div>
              </Transition>

              <!-- Info sempre visível -->
              <div class="ba__mobile-info">
                <div>
                  <span class="ba__name">
                    {{ transformations[activeCard].name }}
                  </span>
                  <span class="ba__goal">
                    {{ transformations[activeCard].goal }}
                  </span>
                </div>
                <span class="ba__duration">
                  em {{ transformations[activeCard].duration }}
                </span>
              </div>

            </div>
          </Transition>
        </div>

        <!-- Dots de navegação -->
        <div class="ba__dots" role="tablist">
          <button
            v-for="(_, i) in transformations"
            :key="i"
            class="ba__dot"
            :class="{ 'ba__dot--active': i === activeCard }"
            :aria-label="`Transformação ${i + 1}`"
            :aria-selected="i === activeCard"
            role="tab"
            @click="activeCard = i; showAfter[i] = false"
          />
        </div>

        <!-- Instrução swipe -->
        <p class="ba__swipe-hint" aria-hidden="true">
          ← desliza para ver mais →
        </p>

      </div>

      <!-- CTA ────────────────────────────────────────── -->
      <div
        class="ba__cta reveal"
        :class="{ 'is-visible': headerVisible }"
      >
        <BaseButton
          label="Quero a Minha Transformação"
          variant="primary"
          size="lg"
          :href="buildUrl(MSG)"
          :external="true"
        />
      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">
.ba {
  background: $color-white;

  // ─── Subtítulos device-specific ───────────────────────
  &__subtitle--mobile {
    display: block;
    @include respond-to(md) { display: none; }
  }

  &__subtitle--desktop {
    display: none;
    @include respond-to(md) { display: block; }
  }

  // ─── Desktop layout ───────────────────────────────────
  &__desktop {
    display: none;
    @include respond-to(md) { display: block; }
  }

  &__grid {
    display:               grid;
    grid-template-columns: repeat(3, 1fr);
    gap:                   $spacing-5;
  }

  &__card {
    border-radius: $radius-xl;
    overflow:      hidden;
    box-shadow:    $shadow-md;
    border:        1px solid $color-neutral-200;
    transition:    $transition-base;

    &:hover {
      box-shadow: $shadow-lg;
      transform:  translateY(-4px);
    }
  }

  &__slider-wrap {
    position:    relative;
    aspect-ratio: 3 / 4;
    overflow:    hidden;
    cursor:      ew-resize;
    user-select: none;
  }

  &__image {
    position: absolute;
    inset:    0;
    @include flex-center;

    &--after { z-index: 1; }
    &--before { z-index: 2; }
  }

  &__placeholder {
    @include flex-col;
    align-items: center;
    gap:         $spacing-3;
    width:       100%;
    height:      100%;
    @include flex-center;

    &--dark {
      background: rgba($color-primary, 0.06);
    }
  }

  &__label {
    font-family:    $font-heading;
    font-size:      $font-size-xs;
    font-weight:    $font-weight-bold;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding:        $spacing-1 $spacing-3;
    border-radius:  $radius-full;

    &--before {
      background: rgba($color-primary, 0.1);
      color:      $color-text-muted;
    }
    &--after {
      background: rgba($color-teal, 0.2);
      color:      $color-teal;
    }
  }

  &__emoji {
    font-size: 2.5rem;
    opacity:   0.4;
  }

  &__divider {
    position:  absolute;
    top:       0;
    bottom:    0;
    width:     40px;
    transform: translateX(-50%);
    z-index:   3;
    @include flex-center;

    &:focus-visible { outline: 3px solid $color-accent; }
  }

  &__divider-line {
    position:   absolute;
    top:        0;
    bottom:     0;
    left:       50%;
    width:      2px;
    background: $color-white;
    box-shadow: 0 0 6px rgba(0,0,0,0.25);
  }

  &__divider-handle {
    position:      relative;
    z-index:       1;
    width:         36px;
    height:        36px;
    border-radius: $radius-full;
    background:    $color-white;
    box-shadow:    $shadow-md;
    @include flex-center;
    font-size:     $font-size-xs;
    color:         $color-text-muted;
    border:        2px solid $color-neutral-200;
    transition:    $transition-base;

    &:hover {
      transform:    scale(1.1);
      border-color: $color-accent;
      color:        $color-accent;
    }
  }

  &__hint {
    position:      absolute;
    bottom:        $spacing-3;
    left:          50%;
    transform:     translateX(-50%);
    z-index:       4;
    font-family:   $font-body;
    font-size:     $font-size-xs;
    color:         $color-white;
    background:    rgba($color-primary, 0.55);
    padding:       $spacing-1 $spacing-3;
    border-radius: $radius-full;
    white-space:   nowrap;
    pointer-events: none;
  }

  &__info {
    @include flex-between;
    padding:    $spacing-4;
    border-top: 1px solid $color-neutral-200;
  }

  // ─── Mobile layout ────────────────────────────────────
  &__mobile {
    display: block;

    @include respond-to(md) {
      display: none;
    }
  }

  &__carousel {
    touch-action: pan-y pinch-zoom;
  }

  // Card mobile — mais compacto, não ocupa tela inteira
  &__mobile-card {
    border-radius: $radius-xl;
    overflow:      hidden;
    box-shadow:    $shadow-md;
    border:        1px solid $color-neutral-200;
    cursor:        pointer;
    -webkit-tap-highlight-color: transparent;
  }

  // Face do card — altura fixa e compacta
  &__face {
    height:        200px; // compacto — não ocupa tela inteira
    @include flex-col;
    align-items:   center;
    justify-content: center;
    gap:           $spacing-3;
    background:    rgba($color-primary, 0.04);
    position:      relative;
    transition:    $transition-base;

    &--after {
      // background vem via inline style (cor do card)
    }
  }

  &__face-tag {
    font-family:    $font-heading;
    font-size:      $font-size-xs;
    font-weight:    $font-weight-bold;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding:        $spacing-1 $spacing-3;
    border-radius:  $radius-full;

    &--before {
      background: rgba($color-primary, 0.1);
      color:      $color-text-muted;
    }
    &--after {
      background: rgba($color-teal, 0.2);
      color:      $color-teal;
    }
  }

  &__face-emoji {
    font-size: 2.8rem;
    opacity:   0.5;
  }

  &__face-result {
    font-family:  $font-heading;
    font-size:    $font-size-4xl;
    font-weight:  $font-weight-black;
    line-height:  1;
    letter-spacing: -0.02em;
  }

  &__face-hint {
    position:    absolute;
    bottom:      $spacing-3;
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       $color-text-muted;
    opacity:     0.6;
  }

  // Info mobile
  &__mobile-info {
    @include flex-between;
    align-items: center;
    padding:     $spacing-3 $spacing-4;
    border-top:  1px solid $color-neutral-200;
    background:  $color-white;
  }

  // ─── Partilhados desktop + mobile ─────────────────────
  &__name {
    display:     block;
    font-family: $font-heading;
    font-size:   $font-size-sm;
    font-weight: $font-weight-bold;
    color:       $color-text-dark;
  }

  &__goal {
    display:     block;
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       $color-text-muted;
  }

  &__info-right {
    @include flex-col;
    align-items: flex-end;
  }

  &__result {
    font-family: $font-heading;
    font-size:   $font-size-lg;
    font-weight: $font-weight-black;
    line-height: 1;
  }

  &__duration {
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       $color-text-muted;
  }

  // ─── Dots ─────────────────────────────────────────────
  &__dots {
    display:         flex;
    justify-content: center;
    gap:             $spacing-2;
    margin-top:      $spacing-4;
  }

  &__dot {
    width:         7px;
    height:        7px;
    border-radius: $radius-full;
    background:    $color-neutral-200;
    border:        none;
    cursor:        pointer;
    transition:    $transition-base;
    padding:       0;

    &--active {
      background: $color-accent;
      width:      20px;
    }
  }

  // ─── Swipe hint ───────────────────────────────────────
  &__swipe-hint {
    text-align:     center;
    font-family:    $font-body;
    font-size:      $font-size-xs;
    color:          $color-text-muted;
    margin-top:     $spacing-3;
    opacity:        0.5;
    letter-spacing: 0.05em;
  }

  // ─── CTA ──────────────────────────────────────────────
  &__cta {
    margin-top:  $spacing-10;
    @include flex-center;
  }
}

// ─── Transitions ──────────────────────────────────────────

// Slide entre cards no carousel
.card-slide-enter-active,
.card-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.card-slide-enter-from {
  opacity: 0; transform: translateX(20px);
}
.card-slide-leave-to {
  opacity: 0; transform: translateX(-20px);
}

// Flip antes/depois
.flip-enter-active,
.flip-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.flip-enter-from {
  opacity: 0; transform: scale(0.97);
}
.flip-leave-to {
  opacity: 0; transform: scale(1.02);
}
</style>