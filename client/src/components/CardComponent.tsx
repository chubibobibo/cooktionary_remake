import { Card } from "flowbite-react";

import { IoMdTime } from "react-icons/io";
import { MdOutlineDescription } from "react-icons/md";
import { customCard } from "../utils/themes/customThemes";

import { RecipeArray } from "../types/InputProps";

import { useNavigate } from "react-router-dom";

/** @RecipeArray types for all the contents of the recipe data. */

interface CardComponentProps {
  allrecipes: RecipeArray;
  // recipeId: string | null;
}

function CardComponent({ allrecipes }: CardComponentProps) {
  const navigate = useNavigate();
  const handleClickNavigate = () => {
    navigate(`/dashboard/recipe/${allrecipes._id}`);
  };

  // console.log(allrecipes);
  return (
    <>
      {/* @Vertical Card component that displays the recipe card */}
      <Card
        className='min-w-12/12 h-[17rem] border-[2px] border-customLoginBtnColor md:hidden'
        imgAlt='Recipe image'
        imgSrc='../../src/assets/CooktionaryLogo.png'
        theme={customCard}
        onClick={handleClickNavigate}
      >
        <p className='text-sm font-bold tracking-tight text-gray-900 dark:text-white mt-2'>
          {allrecipes?.recipeName}
        </p>
        {/*card content section */}
        <section className='p-2'>
          <section className='flex mt-2 gap-1'>
            <span>
              <MdOutlineDescription size='18px' />
            </span>
            <span className='font-rubik text-xs text-gray-700 dark:text-gray-400 capitalize'>
              {allrecipes?.category}
            </span>
          </section>
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
              {allrecipes?.recipeDescription}
            </span>
          </section>
        </section>
      </Card>
      {/** horizontal card*/}
      <Card
        className='md:w-full md:h-[17rem] border-[2px] border-customLoginBtnColor hidden md:flex'
        imgAlt='Meaningful alt text for an image that is not purely decorative'
        imgSrc='../../src/assets/CooktionaryLogo.png'
        theme={customCard}
        horizontal
        onClick={handleClickNavigate}
      >
        <p className='text-sm font-bold tracking-tight text-gray-900 dark:text-white mt-2 md:text-xl capitalize'>
          {allrecipes.recipeName}
        </p>
        <section className='p-2'>
          <section className='flex mt-2 gap-1'>
            <span>
              <MdOutlineDescription size='24px' />
            </span>
            <span className='font-rubik text-xs text-gray-700 dark:text-gray-400 md:text-base md:mb-2 capitalize'>
              {allrecipes?.category}
            </span>
          </section>
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
}
export default CardComponent;
