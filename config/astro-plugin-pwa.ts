import process from 'node:process'
import type { ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import type { AstroIntegration } from 'astro'
import AstroPWA from '@vite-pwa/astro'

export function AstroPluginPWA({ mode }: ConfigEnv): AstroIntegration[] {
  const { VITE_APP_NAME, VITE_APP_DESCRIPTION } = loadEnv(mode, process.cwd(), '')

  return [
    AstroPWA({
      base: '/',
      scope: '/',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: VITE_APP_NAME,
        short_name: VITE_APP_NAME,
        description: VITE_APP_DESCRIPTION,
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      devOptions: {
        enabled: process.env.SW_DEV === 'true',
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
        navigateFallback: 'index.html',
      },
    }), // https://vite-pwa-org.netlify.app/frameworks/astro.html
  ]
}
