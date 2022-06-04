const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      lotion: '#FAFAFA',
      raisinblack: '#262626',
      gainsboro: '#DCDCDC',
      vividcerulean: '#0095F6',
      brightgray: '#EFEFEF',
      desire: '#ED4956',
      chinesecilver: '#C7C7C7',
      philippinegray: '8E8E8E',
      overlay: 'rgba(0,0,0,0.65)',
    },
    extend: {
      fontFamily: {
        sans: ['-apple-system', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
