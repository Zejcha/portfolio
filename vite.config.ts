import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfiguracja bazy jest kluczowa dla GitHub Pages.
// Jeśli repozytorium nazywa się "portfolio", base musi wynosić '/portfolio/'
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173
  }
})