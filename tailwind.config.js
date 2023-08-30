module.exports = {
  content: [
    "./index.html",
    "./display/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': '"Noto Sans Display",ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
    },
    extend: {
      width: {
        'fhd': '1920px',
      },
      cursor: {
        'grab': 'grab',
      }
    },
  },
  plugins: [],
}