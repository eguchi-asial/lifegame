import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8000,
  },
  define: {
    global: 'window',
  },
})
