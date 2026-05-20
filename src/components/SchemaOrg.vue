<script setup lang="ts">
import { onMounted } from 'vue'

// Injeta o JSON-LD no <head> dinamicamente
onMounted(() => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      // ── LocalBusiness ────────────────────────────────
      {
        '@type':       'LocalBusiness',
        '@id':         'https://ekkl3s1a.github.io/pedro-morilhas-site/#business',
        name:          'Pedro Morilhas Personal Trainer',
        description:   'Treino personalizado, nutrição e acompanhamento contínuo em Lisboa.',
        url:           'https://ekkl3s1a.github.io/pedro-morilhas-site/',
        telephone:     '+351910000000',
        email:         'pedro@morilhas.pt',
        priceRange:    '€€',
        image:         'https://ekkl3s1a.github.io/pedro-morilhas-site/og-image.jpg',
        address: {
          '@type':           'PostalAddress',
          addressLocality:   'Barreiro',
          addressRegion:     'Lisboa',
          addressCountry:    'PT',
        },
        geo: {
          '@type':    'GeoCoordinates',
          latitude:   38.7169,
          longitude:  -9.1399,
        },
        openingHoursSpecification: [
          {
            '@type':    'OpeningHoursSpecification',
            dayOfWeek:  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens:      '07:00',
            closes:     '21:00',
          },
          {
            '@type':    'OpeningHoursSpecification',
            dayOfWeek:  'Saturday',
            opens:      '09:00',
            closes:     '13:00',
          },
        ],
        aggregateRating: {
          '@type':       'AggregateRating',
          ratingValue:   '5',
          bestRating:    '5',
          worstRating:   '1',
          reviewCount:   '150',
        },
        sameAs: [
          'https://instagram.com/',
          'https://linkedin.com/',
          'https://youtube.com/',
        ],
      },

      // ── Person ──────────────────────────────────────
      {
        '@type':       'Person',
        '@id':         'https://ekkl3s1a.github.io/pedro-morilhas-site/#person',
        name:          'Pedro Morilhas',
        jobTitle:      'Personal Trainer',
        worksFor:      { '@id': 'https://ekkl3s1a.github.io/pedro-morilhas-site/#business' },
        address: {
          '@type':         'PostalAddress',
          addressLocality: 'Barreiro',
          addressCountry:  'PT',
        },
      },

      // ── WebSite ─────────────────────────────────────
      {
        '@type': 'WebSite',
        '@id':   'https://ekkl3s1a.github.io/pedro-morilhas-site/#website',
        url:     'https://ekkl3s1a.github.io/pedro-morilhas-site/',
        name:    'Pedro Morilhas Personal Trainer',
        inLanguage: 'pt-PT',
      },

      // ── Services (ItemList) ──────────────────────────
      {
        '@type': 'ItemList',
        name:    'Serviços de Personal Training',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Treino Presencial' },
          { '@type': 'ListItem', position: 2, name: 'Treino Online'     },
          { '@type': 'ListItem', position: 3, name: 'Plano Nutricional' },
          { '@type': 'ListItem', position: 4, name: 'Avaliação Física'  },
          { '@type': 'ListItem', position: 5, name: 'Treino Funcional'  },
          { '@type': 'ListItem', position: 6, name: 'Programa de Grupo' },
        ],
      },
    ],
  }

  // Injeta o script no <head>
  const script = document.createElement('script')
  script.type  = 'application/ld+json'
  script.text  = JSON.stringify(schema, null, 2)
  document.head.appendChild(script)
})
</script>

<!-- Componente sem template — só injeta no <head> -->
<template></template>