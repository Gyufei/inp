/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        haasText: ["var(--font-haas-text)"],
        haasDisp: ["var(--font-haas-disp)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
