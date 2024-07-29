import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import uno from "unocss/vite"
import alias from "@holy-two/vite-plugin-alias"

export default defineConfig({
  plugins: [uno(), solid(), alias()],
})
