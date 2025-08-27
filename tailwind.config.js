/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#004ab0',
        'primary-light': '#edf5ff',
        'primary-dark': '#002558',
        secondary: '#002558',
        active: '#5b616e',
        placeholder: '#6b7280',
        placeholder: '#b6bac3',
        heading: '#212226',
        background: '#ffffff',

        // utils colors
        error: '#ed0006',
        'error-light': '#fff6f5',
        success: '#0694a2',
        'success-light': '#eafbff',
        warning: '#eea23e',
        'warning-light': '#fff8eb',
        info: '#1b5ebd',
        'info-light': '#edf5ff',
        backdrop: '#00000040',

        // grey colors
        gray: {
          100: '#edeef1',
          200: '#d8dbdf',
          300: '#b6bac3',
          400: '#6b7280',
          600: '#5b616e',
          800: '#40444c',
          900: '#383a42',
          950: '#25272c',
        },

        // neutral colors
        neutral: {
          300: '#484649',
        },

        // blue colors
        blue: {
          100: '#b8ceed',
        },
      },
      gap: {
        '2/5': '0.625rem',
      },
      borderRadius: {
        xs: '0.125rem',
        s: '0.25rem',
        m: '0.5rem',
      },
      borderWidth: {
        1: '1px',
      },
    },
    fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
    },
    boxShadow: {
      xs: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
      s: '0px 1px 3px 0px rgba(16, 24, 40, 0.10)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      m: '0px 4px 6px -1px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.10)',
      l: '0px 10px 15px -3px rgba(16, 24, 40, 0.10), 0px 4px 6px -4px rgba(16, 24, 40, 0.10)',
      xl: '0px 20px 25px -5px rgba(16, 24, 40, 0.10), 0px 8px 10px -6px rgba(16, 24, 40, 0.10)',
      '2xl': '0px 25px 50px -12px rgba(16, 24, 40, 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      tb: '959px',
    },
  },
  plugins: [],
};
