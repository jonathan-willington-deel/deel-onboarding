import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/node_modules/@heroui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          licorice: 'var(--color-licorice)',
          deelberry: 'var(--color-deelberry)',
          acai: 'var(--color-acai)',
          'acai-2': 'var(--color-acai-2)',
          smoothie: 'var(--color-smoothie)',
          'smoothie-2': 'var(--color-smoothie-2)',
          'smoothie-3': 'var(--color-smoothie-3)',
          latte: 'var(--color-latte)',
          'burnt-tangelo': 'var(--color-burnt-tangelo)',
          tangelo: 'var(--color-tangelo)',
          'tangelo-2': 'var(--color-tangelo-2)',
          cornbread: 'var(--color-cornbread)',
          'cornbread-2': 'var(--color-cornbread-2)',
          'cornbread-3': 'var(--color-cornbread-3)',
          white: 'var(--color-white)',
          blueberry: 'var(--color-blueberry)',
          'blueberry-2': 'var(--color-blueberry-2)',
          seltzer: 'var(--color-seltzer)',
          'seltzer-2': 'var(--color-seltzer-2)',
          'seltzer-3': 'var(--color-seltzer-3)',
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
