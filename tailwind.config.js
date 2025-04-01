import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "selector",
  theme: {
    screens: {
      'sm': '450px',
      'md': '768px',
      'lg': '1024px',
    },
    extend: {
      colors: {
        primaryLight: "#9d0006",
        primaryDark: "#d79921",
        secondaryLight: "#cc241d  ",
        secondaryDark: "#fabd2f",
        backgroundLight: "#EFEDEA",
        backgroundDark: "#2F2F2F",
        backgroundDarker: "#282828",
        textLight: "#3c3836",
        textDark: "#F9F5D7",
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        mono: ['ui-monospace', ...defaultTheme.fontFamily.mono],
        body: ['OpenSans', defaultTheme.fontFamily.body],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.textLight"),
            a: {
              color: theme("colors.primaryLight"),
              "&:hover": {
                color: theme("colors.secondaryLight"),
              },
            },
            h1: { color: theme("colors.textLight") },
            h2: { color: theme("colors.textLight") },
            h3: { color: theme("colors.textLight") },
            strong: { color: theme("colors.textLight") },
          },
        },
        dark: {
          css: {
            color: theme("colors.textDark"),
            a: {
              color: theme("colors.primaryDark"),
              "&:hover": {
                color: theme("colors.secondaryDark"),
              },
            },
            h1: { color: theme("colors.textDark") },
            h2: { color: theme("colors.textDark") },
            h3: { color: theme("colors.textDark") },
            strong: { color: theme("colors.textDark") },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
