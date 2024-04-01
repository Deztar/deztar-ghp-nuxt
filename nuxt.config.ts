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
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' },
      ]
    },
  },
})
