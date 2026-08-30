import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'terser',
  },
  server: {
    port: 5173,
    open: true,
  },
  esbuild: {
    target: 'esnext',
  },
});
