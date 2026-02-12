import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/test-utils",
    "shadcn-nuxt",
    "@nuxtjs/supabase",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],

  pinia: {
    storesDirs: ["./stores/**"],
  },

  colorMode: {
    classSuffix: "",
  },
  supabase: {
    redirectOptions: {
      login: "/auth/login",
      callback: "/confirm",
      exclude: ["/", "/auth/registration", "/auth/login", "/settings"],
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
});
