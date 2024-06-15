import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
// vite.config.js
// export default {
//   server: {
//     host: '0.0.0.0'
//   }
// }
