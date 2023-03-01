import { defineConfig, presetUno, presetAttributify, presetIcons, transformerAttributifyJsx, transformerVariantGroup, transformerDirectives } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify()
  ],
  transformers: [
    transformerAttributifyJsx()
  ]
})
