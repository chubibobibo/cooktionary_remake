import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins", //default text used in App.css
        rubik: "Rubik", //for headings
      },

      screens: {
        " 2xs": "360px",
        xs: "500px",
        "3xl": "2169px",
      },

      colors: {
        customLoginBtnColor: "#d5bfd9",
        customLoginBtnColorDark: "#c593cf",
        customLightGreen: "#C3D9BF",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
