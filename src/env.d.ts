/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/client" />
declare namespace App {
  interface Locals {

  }
}
declare const __DATE__: string
interface ImportMetaEnv {
  readonly ASTRO_APP_NAME: string
  readonly ASTRO_APP_DESCRIPTION: string
  readonly ASTRO_DEV_PORT: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
