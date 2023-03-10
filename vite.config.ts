import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import Uno from "unocss/vite"

export default defineConfig({
  plugins: [Uno(), solidPlugin()],
  server: {
    port: 3003,
  },
  build: {
    target: 'esnext',
  },
});
