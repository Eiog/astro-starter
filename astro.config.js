import process from 'node:process'
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import solidJs from '@astrojs/solid-js'
import UnoCSS from 'unocss/astro'
import node from '@astrojs/node'
import vercel from '@astrojs/vercel/serverless'
import netlify from '@astrojs/netlify/functions'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import astroI18next from 'astro-i18next'
import { loadEnv } from 'vite'
import icon from 'astro-icon'
import Info from 'unplugin-info/astro'
import TurboConsole from 'unplugin-turbo-console/astro'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import { vitePluginVersionMark } from 'vite-plugin-version-mark'
import ServerUrlCopy from 'vite-plugin-url-copy'
import { AstroPluginAutoImport, AstroPluginPWA, VitePluginComponents } from './config'

const { ASTRO_DEV_PORT } = loadEnv(process.env.NODE_ENV, process.cwd(), '')
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
    vue({
      devtools: true,
    }),
    solidJs(),
    UnoCSS({ injectReset: true }),
    // https://docs.astro.build/en/guides/integrations-guide/sitemap/
    sitemap(),
    // https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme
    robotsTxt(),
    // https://github.com/yassinedoghri/astro-i18next
    astroI18next(),
    icon({
      iconDir: 'src/assets/icons',
    }), // https://github.com/natemoo-re/astro-icon
    Info(), // https://github.com/yjl9903/unplugin-info
    TurboConsole(), // https://github.com/unplugin/unplugin-turbo-console

    ...AstroPluginAutoImport(),
    ...AstroPluginPWA({ mode: process.env.NODE_ENV }),
  ],
  output: 'server',
  adapter: envAdapter(),
  server: {
    host: true,
    port: Number(ASTRO_DEV_PORT),
  },
  devToolbar: {
    enabled: true,
  },
  vite: {
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
    plugins: [
      ServerUrlCopy({
        qrcode: {
          disabled: false,
          color: 'white',
        },
      }), // https://github.com/XioDone/vite-plugin-url-copy

      webUpdateNotice({
        logVersion: true,
      }), // https://github.com/GreatAuk/plugin-web-update-notification
      vitePluginVersionMark({
        // name: 'test-app',
        // version: '0.0.1',
        // command: 'git describe --tags',
        ifGitSHA: true,
        ifShortSHA: true,
        ifMeta: true,
        ifLog: true,
        ifGlobal: true,
      }), // https://github.com/ZhongxuYang/vite-plugin-version-mark
      ...VitePluginComponents(),
    ],
  },
})
