import type { Config } from "tailwindcss";
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', ...fontFamily.sans],
        heading: ['var(--font-oswald)', 'sans-serif'],
      },
      colors: {
        'brand-black': '#000000',
        'brand-orange': {
          light: '#FF7700',
          DEFAULT: '#E63900',
          dark: '#B81C00',
        },
        'brand-green': '#AEFF3D',
        'brand-gray': '#6c6c6c',
        'brand-white': '#FFFFFF',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
