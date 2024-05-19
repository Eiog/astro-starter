import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,
  unocss: true,
  astro: true,
  formatters: true,
  ignores: ['src/assets', 'public'],
})
