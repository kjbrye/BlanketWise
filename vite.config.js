import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React - cached across all pages
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Supabase client - only needed after auth
          'supabase': ['@supabase/supabase-js'],
          // Icons - large library, separate chunk
          'icons': ['lucide-react'],
        },
      },
    },
  },
})
