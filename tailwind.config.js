const { hairlineWidth } = require("nativewind/theme");

const color = (name) => `hsl(var(--${name}))`;
const pair = (name) => ({ DEFAULT: color(name), foreground: color(`${name}-foreground`) });

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./App.tsx", "./registry/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        border: color("border"),
        input: color("input"),
        ring: color("ring"),
        background: color("background"),
        foreground: color("foreground"),
        primary: pair("primary"),
        secondary: pair("secondary"),
        destructive: pair("destructive"),
        muted: pair("muted"),
        accent: pair("accent"),
        popover: pair("popover"),
        card: pair("card"),
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: { hairline: hairlineWidth() },
    },
  },
  plugins: [],
};
