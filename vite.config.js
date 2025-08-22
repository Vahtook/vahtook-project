import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // For a custom domain, base must be '/' (not full URL or repo path)
  base: '/',
  build: {
    outDir: 'dist'
  }
})

