<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

function update() {
  const scrollTop  = window.scrollY
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight
  progress.value   = docHeight > 0
    ? Math.min(100, (scrollTop / docHeight) * 100)
    : 0
}

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true })
  update()
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
})
</script>

<template>
  <div
    class="progress-bar"
    role="progressbar"
    :aria-valuenow="Math.round(progress)"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="`Progresso de leitura: ${Math.round(progress)}%`"
  >
    <div
      class="progress-bar__fill"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>

<style scoped lang="scss">
.progress-bar {
  position:   fixed;
  top:        0;
  left:       0;
  right:      0;
  height:     3px;
  background: rgba($color-white, 0.06);
  z-index:    calc(#{$z-header} + 1);
  pointer-events: none;

  &__fill {
    height:     100%;
    background: $gradient-cta;
    transition: width 0.1s linear;
    box-shadow: 0 0 8px rgba($color-accent, 0.6);
    border-radius: 0 $radius-full $radius-full 0;
  }
}
</style>