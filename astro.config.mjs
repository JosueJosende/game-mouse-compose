// @ts-check
import { defineConfig } from 'astro/config'
// import node from '@astrojs/node'
import netlify from '@astrojs/netlify'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
// import clerk from '@clerk/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue() /* , clerk() */],
  adapter: netlify(),
  output: 'server',
  devToolbar: {
    enabled: false
  }
})
