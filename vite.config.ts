import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the build works at a domain root and under a GitHub Pages project path alike.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
