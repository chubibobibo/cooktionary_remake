import { useState } from "react";
import BadgeComponent from "../../components/BadgeComponent";

/** Badge icons */
import { PiCowFill } from "react-icons/pi";
import { GiPig } from "react-icons/gi";
import { IoFish } from "react-icons/io5";
import { FaLeaf } from "react-icons/fa6";
import { MdCake } from "react-icons/md";

function MyRecipes() {
  /** @selectedcategory state that contains data for the BadgeComponent:  */
  /** @handleActiveBadge event handler that sets @selectedCategory to the argument (str) that is passed on the event handler (handleActiveBadge) */

  const [selectedCategory, setSelectedCategory] = useState({ category: "" });

  //set the type of the event handler that accepts str as a string.
  const handleActiveBadge: (str: string) => void = (str) => {
    setSelectedCategory({
      ...selectedCategory,
      category: str,
    });
  };

  return (
    <section className='flex justify-center gap-4 mt-2 flex-wrap'>
      <BadgeComponent
        category={"beef"} //sets the identity of each badge
        handleActiveBadge={handleActiveBadge} //event handler to modify state
        selectedCategoryProp={selectedCategory} //current state to be compared to the identity of the badge
        badgeIcon={PiCowFill} //icon for each badge
      />
      <BadgeComponent
        category={"pork"}
        handleActiveBadge={handleActiveBadge}
        selectedCategoryProp={selectedCategory}
        badgeIcon={GiPig}
      />
      <BadgeComponent
        category={"fish"}
        handleActiveBadge={handleActiveBadge}
        selectedCategoryProp={selectedCategory}
        badgeIcon={IoFish}
      />
      <BadgeComponent
        category={"vegetarian"}
        handleActiveBadge={handleActiveBadge}
        selectedCategoryProp={selectedCategory}
        badgeIcon={FaLeaf}
      />
      <BadgeComponent
        category={"dessert"}
        handleActiveBadge={handleActiveBadge}
        selectedCategoryProp={selectedCategory}
        badgeIcon={MdCake}
      />
    </section>
  );
}
export default MyRecipes;
