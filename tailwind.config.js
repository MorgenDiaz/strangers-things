/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        overlay: "#EEEEEE",
        background: "#CCCCCC",
        navigation: "#999999",
        nav: "#666666",
        text_secondary: "#333333",
        text: "#000000",
      },
    },
  },
  plugins: [],
};
