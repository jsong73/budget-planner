/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {},
  },
  fontFamily: {
    "sans": [
      "ui-sans-serif",
      "system-ui", 
      "-apple-system", 
      "BlinkMacSystemFont", 
      "Segoe UI", 
      "Roboto", 
      '"Helvetica Neue"', 
      "Arial", 
      '"Noto Sans"', 
      "sans-serif", 
      '"Apple Color Emoji"', 
      '"Segoe UI Emoji"', 
      '"Segoe UI Symbol"', 
      '"Noto Color Emoji"',
    ],
  },
screens: {
  'sm': {'min': '576px', 'max': '767px'},
  'md': {'min': '768px', 'max': '991px'},
  'lg': {'min': '992px', 'max': '1199px'},
  'xl': {'min': '1200px'},
},
plugins: [],
}
;


