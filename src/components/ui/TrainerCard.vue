<script setup lang="ts">
import type { Trainer } from '@/types'
import BaseButton from './BaseButton.vue'

interface Props {
  trainer: Trainer
  formUrl: string
}

defineProps<Props>()

// Gera iniciais do nome para o avatar placeholder
function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}
</script>

<template>
  <article class="trainer-card">

    <!-- Avatar / Foto ─────────────────────────────── -->
    <div class="trainer-card__avatar-wrap">
      <div class="trainer-card__avatar">
        <img
          v-if="trainer.image"
          :src="trainer.image"
          :alt="`Foto de ${trainer.name}`"
          class="trainer-card__photo"
          loading="lazy"
        />
        <span v-else class="trainer-card__initials">
          {{ getInitials(trainer.name) }}
        </span>
      </div>

      <!-- Badge de certificação ─────────────────── -->
      <span class="trainer-card__badge">✓ Certificado</span>
    </div>

    <!-- Info ──────────────────────────────────────── -->
    <div class="trainer-card__body">
      <h3 class="trainer-card__name">{{ trainer.name }}</h3>
      <p  class="trainer-card__role">{{ trainer.role }}</p>
      <p  class="trainer-card__bio">{{ trainer.bio }}</p>

      <!-- Certificações ─────────────────────────── -->
      <ul class="trainer-card__certs" aria-label="Certificações">
        <li
          v-for="cert in trainer.certifications"
          :key="cert"
          class="trainer-card__cert"
        >
          <span aria-hidden="true">🏅</span>
          {{ cert }}
        </li>
      </ul>

      <!-- Redes sociais ─────────────────────────── -->
      <div
        v-if="trainer.socials"
        class="trainer-card__socials"
        aria-label="Redes sociais"
      >
        <a
          v-if="trainer.socials.instagram"
          :href="trainer.socials.instagram"
          target="_blank"
          rel="noopener noreferrer"
          class="trainer-card__social"
          aria-label="Instagram"
        >
          📸
        </a>
        
        <a
          v-if="trainer.socials.youtube"
          :href="trainer.socials.youtube"
          target="_blank"
          rel="noopener noreferrer"
          class="trainer-card__social"
          aria-label="YouTube"
        >
          ▶️
        </a>
        
        <a
          v-if="trainer.socials.linkedin"
          :href="trainer.socials.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="trainer-card__social"
          aria-label="LinkedIn"
        >
          💼
        </a>
      </div>

      <!-- CTA ───────────────────────────────────── -->
      <BaseButton
        label="Quero Começar"
        variant="primary"
        size="lg"
        :href="formUrl"
        :external="true"
        :full-width="true"
      />
    </div>
  </article>
</template>

<style scoped lang="scss">
.trainer-card {
  background:    $color-white;
  border-radius: $radius-xl;
  overflow:      hidden;
  box-shadow:    $shadow-lg;
  max-width:     400px;
  margin-inline: auto;
  transition:    $transition-base;

  @include respond-to(md) {
    display:     grid;
    grid-template-columns: 220px 1fr;
    max-width:   100%;
  }

  // ─── Avatar ─────────────────────────────────────────
  &__avatar-wrap {
    position:   relative;
    background: $gradient-hero;
    padding:    $spacing-8 $spacing-6;
    @include flex-center;
    flex-direction: column;
    gap: $spacing-4;
  }

  &__avatar {
    width:         120px;
    height:        120px;
    border-radius: $radius-full;
    border:        3px solid $color-accent;
    overflow:      hidden;
    @include flex-center;
    background:    rgba($color-accent, 0.15);
    box-shadow:    $shadow-accent;

    @include respond-to(md) {
      width:  160px;
      height: 160px;
    }
  }

  &__photo {
    width:      100%;
    height:     100%;
    object-fit: cover;
  }

  &__initials {
    font-family: $font-heading;
    font-size:   $font-size-3xl;
    font-weight: $font-weight-black;
    color:       $color-accent;
  }

  &__badge {
    display:       inline-flex;
    align-items:   center;
    gap:           $spacing-1;
    font-family:   $font-heading;
    font-size:     $font-size-xs;
    font-weight:   $font-weight-bold;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color:         $color-teal;
    background:    rgba($color-teal, 0.15);
    padding:       $spacing-1 $spacing-3;
    border-radius: $radius-full;
    border:        1px solid rgba($color-teal, 0.3);
  }

  // ─── Body ───────────────────────────────────────────
  &__body {
    padding:        $spacing-6;
    @include flex-col;
    gap:            $spacing-4;
  }

  &__name {
    @include heading-3;
    color: $color-primary;
  }

  &__role {
    font-family:    $font-heading;
    font-size:      $font-size-sm;
    font-weight:    $font-weight-semibold;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color:          $color-accent;
  }

  &__bio {
    @include body-text;
    color:     $color-text-muted;
    font-size: $font-size-sm;
    @include truncate(4);
  }

  // ─── Certificações ──────────────────────────────────
  &__certs {
    @include flex-col;
    gap: $spacing-2;
  }

  &__cert {
    display:     flex;
    align-items: center;
    gap:         $spacing-2;
    font-size:   $font-size-sm;
    font-weight: $font-weight-medium;
    color:       $color-text-dark;
  }

  // ─── Socials ────────────────────────────────────────
  &__socials {
    display: flex;
    gap:     $spacing-3;
  }

  &__social {
    width:         40px;
    height:        40px;
    border-radius: $radius-md;
    background:    $color-neutral-100;
    border:        1px solid $color-neutral-200;
    @include flex-center;
    font-size:     1.2rem;
    transition:    $transition-base;
    text-decoration: none;

    &:hover {
      background:  $color-primary;
      border-color: $color-primary;
      transform:   translateY(-2px);
    }
  }
}
</style>