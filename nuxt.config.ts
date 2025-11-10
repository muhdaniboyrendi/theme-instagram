// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: [
    "./app/assets/css/main.css",
    "bootstrap-icons/font/bootstrap-icons.css",
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["v-gsap-nuxt", "@pinia/nuxt", "@nuxtjs/color-mode", "@nuxt/image"],
});
