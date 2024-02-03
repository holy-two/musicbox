import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import uno from "unocss/vite";
import vitePluginAlias from "@holy-two/vite-plugin-alias";

export default defineConfig({
  plugins: [uno(), solid(), vitePluginAlias()],
});
