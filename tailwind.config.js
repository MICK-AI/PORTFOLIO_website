/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        comic: ['"Comic Neue"', '"Comic Sans MS"', '"Comic Sans"', 'sans-serif'],
      },
      colors: {
        theme: {
          bg: 'var(--bg)',
          surface: 'var(--surface)',
          'surface-glass': 'var(--surface-glass)',
          accent: 'var(--accent)',
          emerald: 'var(--accent-emerald)',
          cyan: 'var(--accent-cyan)',
          text: 'var(--text)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          border: 'var(--border)',
        },
      },
      transitionDuration: {
        zen: '700ms',
      },
      transitionTimingFunction: {
        zen: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
