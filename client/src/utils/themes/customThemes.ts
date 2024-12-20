import type { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme["button"] = {
  color: {
    customLoginBtn:
      "bg-customLoginBtnColor hover:bg-customLoginBtnColorDark focus:ring-4 enabled:hover:bg-customLoginBtnColorDark",
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
    },
  },
};
