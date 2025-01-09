import { useState } from "react";
import BadgeComponent from "../../components/BadgeComponent";

import { badges } from "../../utils/BadgesArray";

import { Card } from "flowbite-react";
import { customCard } from "../../utils/themes/customThemes";

import { IoMdTime } from "react-icons/io";
import { MdOutlineDescription } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

import { RecipeArray } from "../../types/InputProps";

/** loader function to obtain all recipes */
export const loader = async () => {
  try {
    const response = await axios.get("/api/recipe/getRecipes");
    return response;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      toast.error(err?.response?.data?.message);
    }
    toast.error("Something went wrong");
    return err;
  }
};

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

  /** @data response containing data of recipes from loader function */
  const data = useLoaderData();
  const recipeData = data?.data?.allRecipes;
  // console.log(recipeData);

  return (
    <>
      {/* @badges is an array of objects containing the category and badge icon
       */}
      <section className='flex justify-center gap-4 mt-2 flex-wrap pb-4 border-b-[1px] sm:py-5 xl:gap-20'>
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
      {/* @Vertical Card component that displays the recipe card */}
      <section className='mt-1 p-2 flex gap-2'>
        {recipeData.map((allrecipes: RecipeArray) => {
          return (
            <>
              <Card
                className='w-6/12 h-[17rem] border-[2px] border-customLoginBtnColor md:hidden'
                imgAlt='Recipe image'
                imgSrc='../../src/assets/CooktionaryLogo.png'
                theme={customCard}
              >
                <p className='text-sm font-bold tracking-tight text-gray-900 dark:text-white mt-2'>
                  {allrecipes?.recipeName}
                </p>
                <section className='p-2'>
                  <section className='flex mt-2 gap-1'>
                    <span className='font-rubik font-bold text-xs text-gray-700 dark:text-gray-400'>
                      <IoMdTime size='18px' />
                    </span>
                    <span className='font-rubik text-xs text-gray-700 dark:text-gray-400'>
                      {`${allrecipes?.cookingTime} minutes`}
                    </span>
                  </section>
                  <section className='flex py-2'>
                    <span>
                      <MdOutlineDescription size='18px' />
                    </span>
                    <span className='font-rubik text-xs text-gray-700 dark:text-gray-400'>
                      This is a description for the recipe. the
                    </span>
                  </section>
                </section>
              </Card>
              {/** horizontal card*/}
              <Card
                className='w-6/12 h-[17rem] border-[2px] border-customLoginBtnColor hidden md:flex'
                imgAlt='Meaningful alt text for an image that is not purely decorative'
                imgSrc='../../src/assets/CooktionaryLogo.png'
                theme={customCard}
                horizontal
              >
                <p className='text-sm font-bold tracking-tight text-gray-900 dark:text-white mt-2 md:text-xl'>
                  {allrecipes.recipeName}
                </p>
                <section className='p-2'>
                  <section className='flex mt-2 gap-1'>
                    <span className='font-rubik font-bold text-xs text-gray-700 dark:text-gray-400'>
                      <IoMdTime size='24px' />
                    </span>
                    <span className='font-rubik text-xs text-gray-700 dark:text-gray-400 md:text-base md:mb-2'>
                      {`${allrecipes.cookingTime} minutes`}
                    </span>
                  </section>
                  <section className='flex py-2'>
                    <span>
                      <MdOutlineDescription size='24px' />
                    </span>
                    <span className='font-rubik text-xs text-gray-700 dark:text-gray-400 md:text-base'>
                      This is a description for the recipe. Another description
                    </span>
                  </section>
                </section>
              </Card>
            </>
          );
        })}
      </section>
    </>
  );
}
export default MyRecipes;
