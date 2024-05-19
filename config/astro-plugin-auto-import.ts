import AutoImport from 'unplugin-auto-import/astro'

import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'
import type { AstroIntegration } from 'astro'

export function AstroPluginAutoImport(): AstroIntegration[] {
  return [
    AutoImport({
      /* options */
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: [
        'vue',
        '@vueuse/core',
        '@vueuse/head',
      ],
      dirs: ['src/hooks', 'src/composables', 'src/stores', 'src/utils'],
      vueTemplate: true,
      resolvers: [VueHooksPlusResolver()],
    }), // https://github.com/antfu/unplugin-auto-import
  ]
}
