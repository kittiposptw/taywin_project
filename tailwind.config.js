/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'surface': '#f9f9f9',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f3f3f3',
        'surface-container': '#eeeeee',
        'surface-container-high': '#e8e8e8',
        'surface-container-highest': '#e2e2e2',
        'on-surface': '#1a1c1c',
        'on-surface-variant': '#4c4546',
        'inverse-surface': '#2f3131',
        'inverse-on-surface': '#f1f1f1',
        'outline': '#7e7576',
        'outline-variant': '#e2e2e2',
        'primary': '#000000',
        'on-primary': '#ffffff',
        'background': '#f9f9f9',
        'on-background': '#1a1c1c',
      },
      borderRadius: {
        DEFAULT: '0',
        lg: '0',
        xl: '0',
        full: '9999px',
      },
      spacing: {
        'section-gap': '96px',
        'gutter': '24px',
        'margin-edge': '48px',
        'unit': '4px',
      },
      fontFamily: {
        'display': ['"Bodoni Moda"', 'serif'],
        'body': ['"Hanken Grotesk"', 'sans-serif'],
      },
      maxWidth: {
        'container-max': '1440px',
      },
    },
  },
  plugins: [],
}
