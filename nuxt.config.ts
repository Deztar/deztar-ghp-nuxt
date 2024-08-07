// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    '@css': '/assets/css',
  },
  devServer: {
    port: 8080,
  },
  app: {
    head: {
      title: 'Deztar Tools',
      meta: [
        { name: 'description', content: 'Deztar Tools' },
      ],
    },
  },
})
