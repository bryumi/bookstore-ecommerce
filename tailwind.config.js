/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Crimson Pro', 'serif'],
        body: ['Lora', 'serif'],
        sans: ['Work Sans', 'sans-serif'],
      },
      colors: {
        cream: '#FAF7F0',
        charcoal: '#2C2C2C',
        burgundy: '#6B2D3E',
        gold: '#D4AF37',
        sage: '#8B9D83',
      },
    },
  },
  plugins: [],
}
