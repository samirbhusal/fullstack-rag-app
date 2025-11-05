/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: "#002A5C", // Navy Blue
        secondary: "#E5E5E5", // Light Gray
        accent: "#00B2A9", // Teal
        alert: "#FF7A00", // Orange
        textDark: "#1C1C1C",
        textLight: "#FFFFFF",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}