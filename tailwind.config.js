/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f2f8f1",
          100: "#dcefd9",
          700: "#2f6f4e",
          800: "#255a41",
          900: "#1c4634"
        },
        clay: {
          100: "#f4eee6",
          300: "#ddc7ad",
          700: "#806348"
        }
      },
      boxShadow: {
        soft: "0 20px 45px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};
