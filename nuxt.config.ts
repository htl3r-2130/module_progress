export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: [
    "./app/css/global.css"
  ],
  app: {
    head: {
      title: 'Module Progress',
    }
  }
})