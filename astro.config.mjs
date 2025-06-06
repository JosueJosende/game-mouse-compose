// @ts-check
import { defineConfig } from 'astro/config'
// import node from '@astrojs/node'
import vercel from '@astrojs/vercel'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
// import clerk from '@clerk/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue() /* , clerk() */],
  adapter: vercel(),
  output: 'server',
  devToolbar: {
    enabled: false
  }
})
