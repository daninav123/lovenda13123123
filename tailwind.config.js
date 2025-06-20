export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // Using class strategy for dark mode
  theme: { extend: { fontFamily: { sans: ['Inter', 'sans-serif'] }, colors: {
    'pastel-yellow': '#FFF9DB',
        'pastel-blue': '#DBF0FF',
        'pastel-pink': '#FFE4F2',
        'pastel-green': '#E0FFE0',
        'pastel-purple': '#F0E0FF',
        'pastel-orange': '#FFE0C0',
     } } },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};