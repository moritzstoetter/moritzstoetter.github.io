// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://moritzstoetter.github.io/",
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'everforest-light',
        dark: 'everforest-dark',
      },
      wrap: true,
      transformers: [],
    },
  },
});