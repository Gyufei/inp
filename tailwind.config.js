/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        cal: ["var(--font-cal-sans)"],
        hel: ["var(--font-hel)"],
        din: ["var(--font-din)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
