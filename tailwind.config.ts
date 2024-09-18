import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {},
      boxShadow: {
        buttonBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)'
      },
      fontFamily: {
        releway: ['Raleway', 'sans-serif']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: 'rgb(84 194 99)'
      },
    },
  },
  plugins: [],
};
export default config;
