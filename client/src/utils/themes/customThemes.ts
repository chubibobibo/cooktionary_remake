import type { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme["button"] = {
  color: {
    // customLoginBtn: "customLoginBtnColor",
    customLoginBtn:
      "bg-customLoginBtnColor hover:bg-customLoginBtnColorDark focus:ring-4 enabled:hover:bg-customLoginBtnColorDark",
    // customLoginBtn: "bg-red-100 hover:bg-red-800",
  },
};