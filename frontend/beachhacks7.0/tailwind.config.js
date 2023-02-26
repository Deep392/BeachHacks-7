// Here is the Tailwinds setup Here we have a theme, plugins and what contents to apply these settings on
// Later we can add more themes such as a dark theme, but that is an alternative
/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: true,
    darkTheme: "light",
    themes: [
      {
        light: {
          "primary": "#9efff8",
          "secondary": "rgba(246,170,170,0.36)",
          "accent": "#0369a1",
          "neutral": "#191F24",
          "base-100": "#000000",
          "info": "#a16207",
          "success": "#84cc16",
          "warning": "#F8B21B",
          "error": "#F82028",
        },
      },
    ],
  },
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}