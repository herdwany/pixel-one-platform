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
        // New, more sophisticated color palette
        accent: { DEFAULT: '#3b82f6', dark: '#2563eb', light: '#60a5fa' }, // A vibrant blue
        'deep-bg': '#030303',
        'glass-surface': 'rgba(255, 255, 255, 0.03)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'muted-text': '#a1a1aa', // zinc-400
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
