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
    },
  },
  plugins: [flowbite.plugin()],
};