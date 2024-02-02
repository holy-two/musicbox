import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import uno from "unocss/vite";
import alias from '@astropub/config-to-alias/vite';

export default defineConfig({
  plugins: [uno(), solid(), alias()],
});
