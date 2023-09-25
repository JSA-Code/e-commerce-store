module.exports = {
  mode: 'jit',
  plugins: [require('@tailwindcss/aspect-ratio'), require('daisyui')],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'soft-purple': '#e3c7f2',
        'soft-pink': '#ffc8dd',
        'hard-peach': '#ffafcc',
        'soft-blue': '#bde0fe',
        'hard-blue': '#a2d2ff',
      },
      fontFamily: {
        primary: 'var(--font-josefin-sans)',
        secondary: 'var(--font-rubik)',
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  variant: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  darkMode: 'class', // or 'media' or 'class'
};
