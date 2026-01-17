/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm, contemplative palette
        stone: {
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#e8e4de',
          300: '#d4cdc3',
          400: '#b8ada0',
          500: '#9c8f80',
          600: '#847668',
          700: '#6b5f54',
          800: '#574e46',
          900: '#48413b',
          950: '#27231f',
        },
        sage: {
          50: '#f6f7f4',
          100: '#e3e7dc',
          200: '#c8d1bc',
          300: '#a6b494',
          400: '#859872',
          500: '#687b57',
          600: '#516244',
          700: '#404d37',
          800: '#353f2f',
          900: '#2d3629',
          950: '#161c13',
        },
        wheat: {
          50: '#fdfbf7',
          100: '#faf5eb',
          200: '#f4e9d4',
          300: '#ebd6b3',
          400: '#dfbc89',
          500: '#d4a167',
          600: '#c68a4e',
          700: '#a57042',
          800: '#855a3b',
          900: '#6c4a33',
          950: '#3a251a',
        },
        clay: {
          50: '#fdf8f6',
          100: '#f9ede8',
          200: '#f4dcd4',
          300: '#ebc4b5',
          400: '#dea28c',
          500: '#cf8268',
          600: '#ba6a4f',
          700: '#9b5641',
          800: '#804939',
          900: '#6a3f33',
          950: '#381f18',
        },
      },
      fontFamily: {
        serif: ['Crimson Pro', 'Georgia', 'serif'],
        sans: ['Source Sans 3', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'subheading': ['1.5rem', { lineHeight: '1.3' }],
        'body': ['1.125rem', { lineHeight: '1.7' }],
        'small': ['0.9375rem', { lineHeight: '1.6' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'soft': '0.625rem',
        'gentle': '1rem',
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(39, 35, 31, 0.08), 0 4px 16px -4px rgba(39, 35, 31, 0.12)',
        'lifted': '0 4px 12px -2px rgba(39, 35, 31, 0.1), 0 8px 24px -4px rgba(39, 35, 31, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'gentle-pulse': 'gentlePulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gentlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
