const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.tsx"],
  darkMode: ["class", '[data-theme="dark"]'],

  theme: {
    extend: {
      keyframes: {
        "chaotic-move": {
          "0%": {
            transform: "translate(0, 0)",
          },
          "25%": {
            transform:
              "translate(calc(var(--chaos-amplitude) * 1px)), calc(var(--chaos-amplitude) * 2px)))",
          },
          "50%": {
            transform:
              "translate(calc(var(--chaos-amplitude) * -2px)), calc(var(--chaos-amplitude) * 1px)))",
          },
          "75%": {
            transform:
              "translate(calc(var(--chaos-amplitude) * 1.5px)), calc(var(--chaos-amplitude) * -2.5px)))",
          },
          "100%": {
            transform: "translate(0, 0)",
          },
        },
        "pseudo-random-move": {
          "0%": {
            transform: "translate(0, 0)",
            opacity: "calc(10% + var(--random-opacity) * 40%)",
          },
          "25%": {
            transform:
              "translate(calc(var(--random-x) * 3%), calc(var(--random-y) * 1%))",
            opacity: "calc(10% + var(--random-opacity) * 40%)",
          },
          "50%": {
            transform:
              "translate(calc(var(--random-x) * -2%), calc(var(--random-y) * -3%))",
            opacity: "calc(10% + var(--random-opacity) * 40%)",
          },
          "75%": {
            transform:
              "translate(calc(var(--random-x) * -1%), calc(var(--random-y) * 1%))",
            opacity: "calc(10% + var(--random-opacity) * 40%)",
          },
          "100%": {
            transform: "translate(0, 0)",
            opacity: "calc(10% + var(--random-opacity) * 40%)",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        serif: ["var(--font-cormorant)", ...fontFamily.serif],
        cal: ["var(--font-cal-sans)", ...fontFamily.sans],
      },
      animation: {
        "pseudo-random-move": "pseudo-random-move 25s infinite",
        "chaotic-move": "chaotic-move 42s infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-hero-patterns"),
    require("@tailwindcss/line-clamp"),
  ],
};
