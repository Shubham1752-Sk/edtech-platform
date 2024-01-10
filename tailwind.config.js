/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'bg-black':'#040D12',
        'heading-orange':'#FF6000',
        'subheading-orange':'FFA559',
        'text-beige':'FFE6C7'
      },
      colors:{
        'heading-orange':'#FF6000',
        'subheading-orange':'#FFA559',
        'light-beige':'#FFE6C7'
      }
    },
  },
  plugins: [],
}