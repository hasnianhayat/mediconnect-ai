/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0A1730',
          900: '#0E1F45',
          800: '#152B5C',
        },
        brand: {
          50: '#EEF3FF',
          100: '#DCE7FF',
          200: '#B7CBFF',
          300: '#8CA9FF',
          400: '#5C81F5',
          500: '#3660E6',
          600: '#2447C9',
          700: '#1B379E',
          800: '#182F7E',
          900: '#152A63',
        },
        teal: {
          400: '#3FCBD1',
          500: '#1FB3BA',
          600: '#149299',
        },
        mint: {
          400: '#4FCB8D',
          500: '#2FAE72',
        },
        amber: {
          400: '#F5A742',
          500: '#EE9420',
        },
        coral: {
          400: '#F0685F',
          500: '#E14C46',
        },
        sand: {
          50: '#F8F9FB',
          100: '#F1F3F8',
          200: '#E6E9F2',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(14, 31, 69, 0.06), 0 8px 24px -12px rgba(14, 31, 69, 0.12)',
        pop: '0 12px 32px -8px rgba(36, 71, 201, 0.28)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
