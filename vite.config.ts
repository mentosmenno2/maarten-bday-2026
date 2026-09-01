import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: './',
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
