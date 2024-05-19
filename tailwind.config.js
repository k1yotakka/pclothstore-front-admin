/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         fontFamily: {
            circular: ['Circular Regular', 'sans-serif'],
            circularBold: ['Circular Bold', 'sans-serif'],
            circularBlack: ['Circular Black', 'sans-serif'],
            inter: ['Inter', 'sans-serif'],
         },
      },
   },
   plugins: [],
};
