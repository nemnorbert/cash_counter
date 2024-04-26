import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/counter/', // Add this line to set the base path
  plugins: [preact()],
})