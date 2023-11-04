/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  screens: {
    sm: "640px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  },

  plugins: [require("daisyui")],
};
