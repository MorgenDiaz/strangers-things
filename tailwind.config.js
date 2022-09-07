/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        overlay: "#EEEEEE",
        background: "#CCCCCC",
        300: "#999999",
        navigation: "#666666",
        text_secondary: "#333333",
        text: "#000000",
      },
    },
  },
  plugins: [],
};
