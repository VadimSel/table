/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        titles: '#e5e7eb',
        filterTitles: "#9ca3af",
        allow: '#16a34a',
        danger: 'red-600',
        modal: "#ffffff"
      },
    },
  },
  plugins: [],
}