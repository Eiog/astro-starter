import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import solidJs from '@astrojs/solid-js'
import UnoCSS from 'unocss/astro'
import AutoImport from 'unplugin-auto-import/astro'
import node from '@astrojs/node'
import vercel from '@astrojs/vercel/edge'
import netlify from '@astrojs/netlify/edge-functions'
import image from '@astrojs/image'

function envAdapter() {
  if (process.env.OUTPUT === 'vercel') {
    return vercel()
  }
  else if (process.env.OUTPUT === 'netlify') {
    return netlify()
  }
  else {
    return node({
      mode: 'standalone',
    })
  }
}
// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(),
    solidJs(),
    UnoCSS({ /* options */ }),
    image(),
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
  output: 'server',
  adapter: envAdapter(),
})
