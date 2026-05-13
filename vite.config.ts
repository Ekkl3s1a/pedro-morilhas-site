import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import compression from 'vite-plugin-compression'
import webfontDownload from 'vite-plugin-webfont-dl'
import { resolve } from 'path'

export default defineConfig({
  base: '/pedro-morilhas-site/',

  plugins: [
    vue(),

    // Faz download das Google Fonts e serve localmente (melhor performance)
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap'
    ]),

    // Gera ficheiros .gz e .br no build (Gzip + Brotli)
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        // Injeta _variables e _mixins em todos os componentes automaticamente
        additionalData: `
          @use "@/styles/_variables.scss" as *;
          @use "@/styles/_mixins.scss" as *;
        `,
      },
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
  },
})