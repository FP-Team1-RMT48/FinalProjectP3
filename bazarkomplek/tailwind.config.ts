import type { Config } from "tailwindcss";
import daisyui from "daisyui"
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#FEF8E6",
          "secondary": "#AFD3E2",
          "accent": "#19A7CE",
          "neutral": "#146C94",
          "base-100": "#002F6A",
          "info": "#000000",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      }
    ]
  },
};
export default config;
