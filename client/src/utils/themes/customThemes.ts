import type { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme["button"] = {
  color: {
    customLoginBtn:
      "bg-customLoginBtnColor hover:bg-customLoginBtnColorDark focus:ring-4 enabled:hover:bg-customLoginBtnColorDark",
  },
  label: {
    customLabel:
      "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
  },
};

export const customInput: CustomFlowbiteTheme["textInput"] = {
  field: {
    rightIcon: {
      base: "cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3",
      svg: "h-5 w-5 text-gray-500 dark:text-gray-400",
    },
    input: {
      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
      colors: {
        customInputColor:
          "border-gray-500 bg-green-50 text-customLoginBtnColorDark placeholder-customLightGreen focus:border-gray-500 focus:ring-customLightGreen dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500",
      },
      sizes: {
        sm: "p-2 sm:text-[7px]",
        md: "p-2.5 text-sm",
        lg: "p-4 sm:text-base",
        custom: "p-2 text-[12px]",
        customSM: "p-2 sm:text-[12px]",
      },
    },
  },
};

export const customNavbar: CustomFlowbiteTheme["navbar"] = {
  root: {
    base: "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
    rounded: {
      on: "rounded",
      off: "",
    },
    bordered: {
      on: "border",
      off: "",
    },
    inner: {
      base: "flex flex-wrap items-center justify-between bg-purple-50 rounded-md w-full p-2",
      fluid: {
        on: "",
        off: "container",
      },
    },
  },
  brand: {
    base: "flex items-center",
  },
  collapse: {
    base: "w-full md:block md:w-auto",
    list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-20 md:text-base md:font-medium",
    hidden: {
      on: "hidden",
      off: "",
    },
  },
  link: {
    base: "block py-2 pl-3 pr-4 md:p-0 text-sm",
    active: {
      on: "bg-customLoginBtnColor text-white dark:text-white md:bg-transparent md:text-cyan-700",
      off: "border-b border-gray-100 text-gray-700 hover:bg-customLoginBtnColor md:focus:bg-red-100 md:rounded-xl md:w-[5rem] md:flex md:justify-center dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-customLoginBtnColor focus:bg-customLoginBtnColor w-[20rem] flex justify-start border-0 rounded-md active:customLoginBtnColor md:dark:hover:bg-transparent md:dark:hover:text-white",
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: "",
    },
  },
  toggle: {
    base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
    icon: "h-6 w-6 shrink-0",
  },
};
