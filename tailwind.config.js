/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primarySaturated: "#648789",
        primaryLight: "#41B4BA",
        primary: "#408589",
        primaryDark: "#07545A",
        contrastText: "#fff",
        white: "#fff",
        pink: "#D66F75",
        purple: "#7F84C2",
        link: "#503ADA",
        "light-gray": "#F5F6F8",
        "dark-gray": "#646464",
        "line-gray": "#DBDBDB",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Bungee: ["Bungee", "sans-serif"],
        Dhurjati: ["Dhurjati", "sans-serif"],
      },
    },
  },
  plugins: [],
};
