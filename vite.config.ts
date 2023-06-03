import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import Uno from "unocss/vite"

export default defineConfig({
  plugins: [Uno(), solidPlugin()],
  base: "/musicbox/",
  server: {
    port: 3003,
    proxy: {
      '/holy-two': 'https://ungh.cc/repos/holy-two'
    },
  },
  build: {
    target: 'esnext',
  },
  
});
