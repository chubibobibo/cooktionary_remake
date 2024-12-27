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
