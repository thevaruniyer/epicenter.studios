/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0d0d0d",
        paper: "#fdfdfd",
        muted: "#8a8a8a",
        faint: "#4a4a4a",
        accent: "#006b3c",
      },
      fontFamily: {
        sans: ["Satoshi", "Hanken Grotesk", "system-ui", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};
