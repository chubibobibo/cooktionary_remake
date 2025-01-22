/** Badge icons */
import { PiCowFill } from "react-icons/pi";
import { GiPig } from "react-icons/gi";
import { IoFish } from "react-icons/io5";
import { FaLeaf } from "react-icons/fa6";
import { MdCake } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { GiChickenOven } from "react-icons/gi";

export const badges = [
  {
    category: "beef",
    bdgIcon: PiCowFill,
    name: "beef",
  },
  {
    category: "pork",
    bdgIcon: GiPig,
    name: "pork",
  },
  {
    category: "fish",
    bdgIcon: IoFish,
    name: "fish",
  },
  {
    category: "vegetarian",
    bdgIcon: FaLeaf,
    name: "vegetarian",
  },
  {
    category: "dessert",
    bdgIcon: MdCake,
    name: "dessert",
  },
  {
    category: "chicken",
    bdgIcon: GiChickenOven,
    name: "chicken",
  },

  {
    category: ".",
    bdgIcon: BiFoodMenu,
    name: "all",
  },
];
