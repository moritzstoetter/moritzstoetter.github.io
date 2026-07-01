// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static",
  // Live domain (see public/CNAME). Drives canonical URLs and the sitemap;
  // must NOT be the github.io origin or every canonical points off-domain.
  site: "https://modernembedded.tech",
  // Old /blog URLs were renamed to /insights. Redirect to preserve inbound
  // links and SEO (static build emits meta-refresh redirect pages).
  redirects: {
    "/[lang]/blog": "/[lang]/insights",
    "/[lang]/blog/[...slug]": "/[lang]/insights/[...slug]",
    "/[lang]/services/[...slug]": "/[lang]/expertise/[...slug]",
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "de",
        locales: { de: "de", en: "en" },
      },
    }),
  ],
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