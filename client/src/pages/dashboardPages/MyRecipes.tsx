import { useState } from "react";
import BadgeComponent from "../../components/BadgeComponent";

import { badges } from "../../utils/BadgesArray";

import { Card } from "flowbite-react";
import { customCard } from "../../utils/themes/customThemes";

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
    <>
      <section className='flex justify-center gap-4 mt-2 flex-wrap pb-2 border-b-[1px]'>
        {badges.map((allBadges, idx) => {
          return (
            <section key={idx}>
              <BadgeComponent
                key={idx}
                category={allBadges.category}
                handleActiveBadge={handleActiveBadge}
                selectedCategoryProp={selectedCategory}
                badgeIcon={allBadges.bdgIcon}
              />
            </section>
          );
        })}
      </section>
      <h2 className='mt-2'>My Custom Recipes</h2>
      <section className='mt-1 p-2 flex gap-2'>
        <Card
          className='w-6/12 h-[17rem] border-[2px] border-customLoginBtnColor'
          imgAlt='Meaningful alt text for an image that is not purely decorative'
          imgSrc='../../src/assets/CooktionaryLogo.png'
          theme={customCard}
        >
          <p className='text-xs font-bold tracking-tight text-gray-900 dark:text-white'>
            Sinigang
          </p>
          <section>
            <span className='font-rubik font-bold text-xs text-gray-700 dark:text-gray-400'>
              Cook time:{" "}
            </span>
            <span className='font-rubik text-xs text-gray-700 dark:text-gray-400'>
              2mins
            </span>
          </section>
          <section className='flex py-2 px-1'>
            <p className='font-rubik text-xs text-gray-700 dark:text-gray-400'>
              {/* Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order. */}
              This is a description for the recipe. the
            </p>
          </section>
        </Card>
        <Card
          className='w-6/12 h-[17rem] border-[2px] border-customLoginBtnColor'
          imgAlt='Meaningful alt text for an image that is not purely decorative'
          imgSrc='../../src/assets/CooktionaryLogo.png'
          theme={customCard}
        >
          {/* <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            Noteworthy technology acquisitions 2021
          </h5>
          <p className='font-normal text-gray-700 dark:text-gray-400'>
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p> */}
        </Card>
      </section>
    </>
  );
}
export default MyRecipes;
