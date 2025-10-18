import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  build: {
    target: 'es2015', // ES2015 é compatível com Tizen TV
    outDir: 'dist',
    rollupOptions: {
      output: {
        format: 'iife', // IIFE em vez de ES modules para compatibilidade
        manualChunks: undefined,
      }
    },
    minify: false // Desabilitar minificação para debug
  }
});
