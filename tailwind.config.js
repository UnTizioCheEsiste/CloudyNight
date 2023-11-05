/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    width: {
      "border10%" : "calc(100% - 10%)",
      "1/2": "50%",
    },
    height: {
      "height10%": "54vh",
      "screen": "100vh"
    },
    extend: {
    },
    colors: {
      "pennblue": "#141443",
      "oxfordblue": "#0E0E2F",
      "spacecadet": "#332E46",
      "ultraviolet": "#4a4b74",
      "periwinkle": "#bec1e8",
      "gold": "#e3b950",
      "white": "#ffffff",
      "transparent": "transparent",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
  },
  darkMode: "class",
  plugins: [],
};