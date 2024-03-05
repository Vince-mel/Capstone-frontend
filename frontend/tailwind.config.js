/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: "'#008080'",
        // Aggiungi altri colori personalizzati qui
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
