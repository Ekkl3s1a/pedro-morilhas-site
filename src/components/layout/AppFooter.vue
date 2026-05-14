<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  formUrl: string
}

defineProps<Props>()

const currentYear = new Date().getFullYear()

const navLinks = [
  { label: 'Início',      href: '#hero'         },
  { label: 'Sobre',       href: '#about'        },
  { label: 'Serviços',    href: '#services'     },
  { label: 'Resultados',  href: '#stats'        },
  { label: 'Testemunhos', href: '#testimonials' },
  { label: 'FAQ',         href: '#faq'          },
]

const socials = [
  { label: 'Instagram', icon: '📸', href: 'https://www.instagram.com/pt.pedromorilhas?igsh=MXFxdzh3YXB5YzNsaA==' },
  { label: 'YouTube',   icon: '▶️', href: 'https://youtube.com/'   },
  { label: 'LinkedIn',  icon: '💼', href: 'https://linkedin.com/'  },
]

function scrollTo(href: string) {
  const target = document.querySelector(href)
  if (!target) return

  const offset = 80
  const top    = target.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer" role="contentinfo">

    <!-- CTA Banner ─────────────────────────────────────── -->
    <div class="footer__cta-band">
      <div class="footer__cta-inner container">
        <div class="footer__cta-text">
          <h2 class="footer__cta-title">
            Pronto para <span>transformar</span> o teu corpo?
          </h2>
          <p class="footer__cta-subtitle">
            Dá o primeiro passo hoje. Sem compromisso.
          </p>
        </div>

        <BaseButton
          label="Quero Começar"
          variant="primary"
          size="lg"
          :href="formUrl"
          :external="true"
        />
      </div>
    </div>

    <!-- Footer main ────────────────────────────────────── -->
    <div class="footer__main">
      <div class="footer__grid container">

        <!-- Coluna 1 — Brand ───────────────────────────── -->
        <div class="footer__brand">
          <a
            href="#hero"
            class="footer__logo"
            aria-label="Pedro Morilhas — ir para o início"
            @click.prevent="scrollTo('#hero')"
          >
            <span class="footer__logo-icon" aria-hidden="true">⚡</span>
            <div>
              <span class="footer__logo-name">Pedro Morilhas</span>
              <span class="footer__logo-role">Personal Trainer</span>
            </div>
          </a>

          <p class="footer__brand-bio">
            Transformo vidas através do treino personalizado,
            nutrição e mentalidade. Baseado em Barreiro.
          </p>

          <!-- Socials ────────────────────────────────── -->
          <div class="footer__socials" aria-label="Redes sociais">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social"
            >
              {{ social.icon }}
            </a>
          </div>
        </div>

        <!-- Coluna 2 — Links ───────────────────────────── -->
        <nav class="footer__nav" aria-label="Navegação do rodapé">
          <h3 class="footer__nav-title">Navegação</h3>
          <ul class="footer__nav-list" role="list">
            <li v-for="link in navLinks" :key="link.href">
              <a
                :href="link.href"
                class="footer__nav-link"
                @click.prevent="scrollTo(link.href)"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Coluna 3 — Contacto ────────────────────────── -->
        <div class="footer__contact">
          <h3 class="footer__nav-title">Contacto</h3>
          <ul class="footer__contact-list" role="list">
            <li class="footer__contact-item">
              <span aria-hidden="true">📍</span>
              <span>Barreiro, Portugal</span>
            </li>
            <li class="footer__contact-item">
              <span aria-hidden="true">📧</span>
              <a
                href="mailto:pedroMorilhas--PersonalTrainer@hotmail.com"
                class="footer__contact-link"
              >
                 pedroMorilhas--PersonalTrainer@hotmail.com
              </a>
            </li>
            <li class="footer__contact-item">
              <span aria-hidden="true">📱</span>
              <a
                href="tel:+351966810082"
                class="footer__contact-link"
              >
                +351 966 810 082
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Footer bottom ──────────────────────────────────── -->
    <div class="footer__bottom">
      <div class="footer__bottom-inner container">
        <p class="footer__copyright">
          © {{ currentYear }} Pedro Morilhas. Todos os direitos reservados.
        </p>
        <p class="footer__made">
          Feito com <span aria-label="amor">❤️</span> em Lisboa
        </p>
      </div>
    </div>

  </footer>
</template>

<style scoped lang="scss">


.footer {
  // ─── CTA Band ───────────────────────────────────────────
  &__cta-band {
    background: $gradient-hero;
    padding-block: $spacing-16;
    border-top: 1px solid rgba($color-white, 0.06);

    @include respond-to(md) {
      padding-block: $spacing-20;
    }
  }

  &__cta-inner {
    @include flex-col;
    align-items: center;
    text-align:  center;
    gap:         $spacing-8;

    @include respond-to(md) {
      flex-direction:  row;
      justify-content: space-between;
      text-align:      left;
    }
  }

  &__cta-text {
    @include flex-col;
    gap: $spacing-3;
  }

  &__cta-title {
    @include heading-2;
    color: $color-white;

    span {
      color: $color-accent;
    }
  }

  &__cta-subtitle {
    @include body-text;
    color: rgba($color-white, 0.65);
  }

  // ─── Main ───────────────────────────────────────────────
  &__main {
    background:    $color-primary;
    padding-block: $spacing-16;
  }

  &__grid {
    display:   grid;
    gap:       $spacing-10;
    grid-template-columns: 1fr;

    @include respond-to(md) {
      grid-template-columns: 1fr 1fr;
    }

    @include respond-to(lg) {
      grid-template-columns: 2fr 1fr 1fr;
      gap: $spacing-16;
    }
  }

  // ─── Brand ──────────────────────────────────────────────
  &__brand {
    @include flex-col;
    gap: $spacing-5;
  }

  &__logo {
    display:         flex;
    align-items:     center;
    gap:             $spacing-3;
    text-decoration: none;
    width:           fit-content;
    transition:      $transition-base;

    &:hover { opacity: 0.8; }
  }

  &__logo-icon {
    font-size: 1.8rem;
    filter: drop-shadow(0 0 8px rgba($color-accent, 0.5));
  }

  &__logo-name {
    display:        block;
    font-family:    $font-heading;
    font-size:      $font-size-lg;
    font-weight:    $font-weight-extrabold;
    color:          $color-white;
    letter-spacing: -0.01em;
  }

  &__logo-role {
    display:        block;
    font-family:    $font-body;
    font-size:      $font-size-xs;
    font-weight:    $font-weight-medium;
    color:          $color-accent;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  &__brand-bio {
    font-family: $font-body;
    font-size:   $font-size-sm;
    color:       rgba($color-white, 0.55);
    line-height: $line-height-loose;
    max-width:   300px;
  }

  &__socials {
    display: flex;
    gap:     $spacing-2;
  }

  &__social {
    width:         40px;
    height:        40px;
    border-radius: $radius-md;
    background:    rgba($color-white, 0.06);
    border:        1px solid rgba($color-white, 0.08);
    @include flex-center;
    font-size:     1.2rem;
    transition:    $transition-base;
    text-decoration: none;
    cursor:        pointer;

    &:hover {
      background:   $color-accent;
      border-color: $color-accent;
      transform:    translateY(-3px);
      box-shadow:   $shadow-accent;
    }
  }

  // ─── Nav ────────────────────────────────────────────────
  &__nav-title {
    font-family:    $font-heading;
    font-size:      $font-size-xs;
    font-weight:    $font-weight-bold;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color:          $color-accent;
    margin-bottom:  $spacing-4;
  }

  &__nav-list {
    @include flex-col;
    gap: $spacing-2;
  }

  &__nav-link {
    font-family:     $font-body;
    font-size:       $font-size-sm;
    color:           rgba($color-white, 0.55);
    text-decoration: none;
    transition:      $transition-base;
    display:         flex;
    align-items:     center;
    gap:             $spacing-2;

    &::before {
      content:    '→';
      opacity:    0;
      transform:  translateX(-6px);
      transition: $transition-base;
      color:      $color-accent;
      font-size:  $font-size-xs;
    }

    &:hover {
      color:       $color-white;
      padding-left: $spacing-1;

      &::before {
        opacity:   1;
        transform: translateX(0);
      }
    }
  }

  // ─── Contacto ───────────────────────────────────────────
  &__contact-list {
    @include flex-col;
    gap: $spacing-3;
  }

  &__contact-item {
    display:     flex;
    align-items: center;
    gap:         $spacing-3;
    font-family: $font-body;
    font-size:   $font-size-sm;
    color:       rgba($color-white, 0.55);
  }

  &__contact-link {
    color:           rgba($color-white, 0.55);
    text-decoration: none;
    transition:      $transition-base;

    &:hover {
      color: $color-white;
    }
  }

  // ─── Bottom ─────────────────────────────────────────────
  &__bottom {
    background:  color.adjust($color-primary, $lightness: -3%);
    padding-block: $spacing-5;
    border-top:  1px solid rgba($color-white, 0.05);
  }

  &__bottom-inner {
    @include flex-between;
    flex-wrap: wrap;
    gap:       $spacing-3;
  }

  &__copyright,
  &__made {
    font-family: $font-body;
    font-size:   $font-size-xs;
    color:       rgba($color-white, 0.35);
  }

  &__made span {
    display: inline-block;
    animation: pulse 2s ease infinite;
  }
}
</style>