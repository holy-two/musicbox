import { defineConfig, presetUno, presetAttributify, presetIcons, transformerAttributifyJsx } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetUno({
      pxToRem: {
        rootValue: 16, // 设置根元素的字体大小（以 px 为单位）
        unitPrecision: 5, // 设置转换后的 rem 值的精度
        propList: ['*'], // 设置需要转换的属性列表
      }
    }),
  ],
  transformers: [
    transformerAttributifyJsx()
  ]
})
