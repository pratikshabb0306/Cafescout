/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brew: {
          50: "#faf6f1",
          100: "#f0e6da",
          400: "#b98457",
          600: "#8a5a34",
          800: "#4a3222",
        },
      },
    },
  },
  plugins: [],
};
