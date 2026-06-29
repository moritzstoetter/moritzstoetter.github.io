// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://moritzstoetter.github.io/",
  // Old /blog URLs were renamed to /insights. Redirect to preserve inbound
  // links and SEO (static build emits meta-refresh redirect pages).
  redirects: {
    "/[lang]/blog": "/[lang]/insights",
    "/[lang]/blog/[...slug]": "/[lang]/insights/[...slug]",
    "/[lang]/services/[...slug]": "/[lang]/expertise/[...slug]",
  },
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