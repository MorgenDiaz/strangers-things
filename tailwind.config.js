/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        overlay: "#EEEEEE",
        background: "#CCCCCC",
        300: "#999999",
        400: "#666666",
        500: "#333333",
        600: "#000000",
      },
    },
  },
  plugins: [],
};
