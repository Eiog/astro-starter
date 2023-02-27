import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import UnoCSS from 'unocss/astro'
import AutoImport from 'unplugin-auto-import/astro'
// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(),
    UnoCSS({ /* options */ }),
    AutoImport({
      /* options */
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: [
        'vue',
      ],
      dirs: ['src/hooks', 'src/composables', 'src/stores', 'src/utils'],
      dts: 'src/typings/auto-import.d.ts',
      vueTemplate: true,
    }),
  ],
})
