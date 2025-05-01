import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { crx } from '@crxjs/vite-plugin'
import manifest from './public/manifest.json'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    modulePreload: false,
    rollupOptions: {
      input: {
        content: 'src/content-scripts/content.ts',
        background: 'src/background/background.js'
      },
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'content.css') {
            return '[name][extname]'
          }
          return 'assets/[name].[hash][extname]'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
}) 