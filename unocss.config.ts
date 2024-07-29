import { defineConfig, presetMini, transformerAttributifyJsx } from "unocss"

export default defineConfig({
  presets: [presetMini()],
  transformers: [transformerAttributifyJsx()],
})
