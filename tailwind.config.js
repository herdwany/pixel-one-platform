module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './assets/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#ff0000', dark: '#cc0000', light: '#ff3333' },
        surface: { DEFAULT: '#0d0d0d', card: '#141414', border: '#1f1f1f' },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
