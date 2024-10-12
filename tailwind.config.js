/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#273142",
        bgColor: "#1B2431",
        dash: "#4880FF",
        tHead: "#323D4E",
      },
      fontFamily: {
        nunito: ['"Nunito Sans"', "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
