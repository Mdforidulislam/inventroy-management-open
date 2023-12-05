/** @type {import('tailwindcss').Config} */
import keepPreset from "keep-react/src/keep-preset.js";
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [keepPreset],
});

