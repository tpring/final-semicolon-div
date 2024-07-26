import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['Pretendard', 'sans-serif']
      },
      colors: {
        main: {
          50: '#EEEDFC',
          100: '#C3C2F5',
          400: '#423edf',
          500: '#2521C9'
        },
        sub: {
          50: '#F2F7FD',
          100: '#C7DCF5',
          200: '#9BC0ED'
        },
        neutral: {
          50: '#f5f5f5',
          100: '#dbdbdb',
          200: '#c2c2c2',
          300: '#a8a8a8',
          400: '#8f8f8f',
          500: '#757575',
          600: '#5c5c5c',
          700: '#424242',
          800: '#292929',
          900: '#0f0f0f'
        },
        red: '#F66161',
        black: '#000000',
        white: '#ffffff'
      },
      fontSize: {
        h1: ['60px', { lineHeight: '135%', letterSpacing: '-1%' }],
        h2: ['48px', { lineHeight: '135%', letterSpacing: '-1%' }],
        h3: ['28px', { lineHeight: '135%', letterSpacing: '-1%' }],
        h4: ['24px', { lineHeight: '135%', letterSpacing: '-1%' }],
        h5: ['20px', { lineHeight: '135%', letterSpacing: '-1%' }],
        subtitle1: ['18px', { lineHeight: '135%', letterSpacing: '-1%' }],
        subtitle2: ['16px', { lineHeight: '135%', letterSpacing: '-1%' }],
        subtitle3: ['14px', { lineHeight: '135%', letterSpacing: '-1%' }],
        body1: ['18px', { lineHeight: '150%', letterSpacing: '-1%' }],
        body2: ['16px', { lineHeight: '150%', letterSpacing: '-1%' }],
        body3: ['14px', { lineHeight: '150%', letterSpacing: '-1%' }],
        body4: ['13px', { lineHeight: '150%', letterSpacing: '-1%' }],
        overline1: ['14px', { lineHeight: '150%', letterSpacing: '-1%' }],
        overline2: ['12px', { lineHeight: '150%', letterSpacing: '-1%' }],
        caption1: ['14px', { lineHeight: '150%', letterSpacing: '-1%' }],
        caption2: ['12px', { lineHeight: '150%', letterSpacing: '-1%' }]
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700'
      }
    }
  },
  plugins: []
};

export default config;
