import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Vite configuration for the Vue frontend. The `root` directory points to the
// frontend source, and build outputs into the dist directory. Cloudflare
// Worker will serve files from `dist` via the `ASSETS` binding configured in
// wrangler.toml.
export default defineConfig({
  root: 'frontend',
  plugins: [vue()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
