/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./registry/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: { extend: {} },
  plugins: [],
};
