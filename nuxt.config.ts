import { defineNuxtConfig } from "nuxt";
const { API_KEY } = process.env;

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  meta: {
    // !!Nuxt3からheadになったので注意！！！
    htmlAttrs: {
      lang: "ja",
      "data-theme": "mytheme", // テーマを選択
    },
    title: "Revium",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  publicRuntimeConfig: {
    apiKey: API_KEY,
  },
});
