/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray-750': '#3d495d',
      },
      width: {
        '95': '95%',
      },
    },
  },
  plugins: [],
};
