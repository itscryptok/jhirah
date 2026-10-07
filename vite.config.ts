import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@workspace/api-client-react': path.resolve(__dirname, './src/api-client-stub.ts'),
      '@clerk/react/internal': path.resolve(__dirname, './src/clerk-internal-shim.ts'),
      '@clerk/react': path.resolve(__dirname, './src/clerk-shim.tsx'),
    },
  },
})
