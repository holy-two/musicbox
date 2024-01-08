import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import uno from "unocss/vite";

export default defineConfig({
  plugins: [uno(), solid()],
});
