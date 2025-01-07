import { Badge } from "flowbite-react";
import { PiCowFill } from "react-icons/pi";
import { GiPig } from "react-icons/gi";
import { IoFish } from "react-icons/io5";
import { FaLeaf } from "react-icons/fa6";
import { MdCake } from "react-icons/md";

import { badgeColors } from "../utils/dynamicBadgeColors/customBadgeColors";

type propTypes = {
  category?: string;
  handleActiveBadge?: React.MouseEventHandler<HTMLOrSVGElement>;
  selectedCategory?: string;
};

function BadgeComponent({
  category,
  handleActiveBadge,
  selectedCategoryProp,
}: propTypes) {
  console.log(selectedCategoryProp);
  console.log(category);
  return (
    <>
      <Badge
        className={`w-36 h-10 ${
          category === selectedCategoryProp.category
            ? "bg-blue-900"
            : "bg-white"
        }  flex justify-center active:bg-blue-200 cursor-pointer`}
        icon={PiCowFill}
        onClick={() => handleActiveBadge && handleActiveBadge(category)}
      >
        {category}
      </Badge>
    </>
  );
}
export default BadgeComponent;
