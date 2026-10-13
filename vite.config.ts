import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Keep the MP3 and stickers as separate, cacheable files (never inlined).
    assetsInlineLimit: 0,
  },
})
