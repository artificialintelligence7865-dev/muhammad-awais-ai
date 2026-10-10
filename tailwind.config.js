/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#05060d", 900: "#0a0c18", 800: "#10132a" },
        neon: { violet: "#8b5cf6", cyan: "#22d3ee", pink: "#ec4899" },
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg,#8b5cf6 0%,#22d3ee 100%)",
      },
      boxShadow: { glow: "0 0 40px rgba(139,92,246,.35)" },
    },
  },
  plugins: [],
};
