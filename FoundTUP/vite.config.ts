import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Forward /api to the backend so the browser sees one origin:
    // no CORS in dev, and the session cookies are first-party.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
