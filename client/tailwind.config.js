/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/Pages/Login.js',
    "./src/Pages/Register.js",
    "./src/Pages/Home.js",
    "./src/Components/Navbar.js",
    "./src/Pages/MedInfo.js",
    "./src/Pages/PhoneOTP.js",
    "./src/Pages/Dashboard.js",
    "./src/Pages/Feed.js",
    "./src/Pages/Dashboard.js",
    "./src/Pages/Admin.js",
    "./src/Components/NewDrive.js",
    "./src/Pages/Layout.js",
    "./src/Pages/Unauthorized.js",
    "./src/Components/FeedCard.js",
    "./src/Pages/LinkPage.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      }
    },
    fontFamily: {
      'body': [
    'Inter', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji'
  ],
  'sans': [
    'Inter', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji'
  ]
    }

  },
  plugins: [],
}
