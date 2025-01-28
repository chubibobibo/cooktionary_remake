import { Card } from "flowbite-react";
import { Button } from "flowbite-react";

import { IoMdTime } from "react-icons/io";
import { MdOutlineDescription } from "react-icons/md";
import { customCard } from "../utils/themes/customThemes";
import { customTheme } from "../utils/themes/customThemes";

import { RecipeArray } from "../types/InputProps";

import { useNavigate } from "react-router-dom";
import RecipeTableComponent from "./RecipeTableComponent";

/** @RecipeArray types for all the contents of the recipe data. */

interface CardComponentProps {
  allrecipes: RecipeArray;
  custSizeWidth: string;
  custSizeHeight: string;
  isButtonVisible: boolean;
  // recipeId: string | null;
}

function CardComponent({
  allrecipes,
  custSizeWidth,
  custSizeHeight,
  isButtonVisible,
}: CardComponentProps) {
  const navigate = useNavigate();
  const handleClickNavigate = () => {
    navigate(`/dashboard/recipe/${allrecipes._id}`);
  };

  // console.log(allrecipes);
  // console.log(isButtonVisible);
  return (
    <section className='flex justify-center sm:p-2 gap-3 flex-col'>
      {/* @Vertical Card component that displays the recipe card */}
      <Card
        className={`w-${custSizeWidth} h-${custSizeHeight} border-[2px] border-customLoginBtnColor md:hidden cursor-pointer ${
          isButtonVisible && "sm:w-[30rem]"
        }`}
        imgAlt='recipe image'
        imgSrc={allrecipes.photoUrl}
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
          {isButtonVisible && (
            <section>{allrecipes?.recipeInstructions}</section>
          )}
        </section>
        {/* Dynamically rendered buttons and tables for all the recipe data}*/}
        {isButtonVisible && (
          <>
            <section className='w-full place-items-center'>
              <RecipeTableComponent
                ingredients={allrecipes?.recipeIngredients}
              />
            </section>
            <section className='flex gap-5 mt-5 mb-3'>
              <Button theme={customTheme} color='customLoginBtn'>
                Update
              </Button>
              <Button theme={customTheme} color='customLoginBtn'>
                Delete
              </Button>
            </section>
          </>
        )}
      </Card>
      {/** horizontal card*/}
      <Card
        className={`md:w-full md:h-[20rem] md:w[50rem] border-[2px] border-customLoginBtnColor hidden md:flex cursor-pointer ${
          isButtonVisible && "md:h-[35rem] "
        }`}
        imgAlt='recipe image'
        imgSrc={allrecipes.photoUrl}
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
              {`${allrecipes?.cookingTime} minutes`}
            </span>
          </section>
          <section className='flex py-2'>
            <span>
              <MdOutlineDescription size='24px' />
            </span>
            <span className='font-rubik text-xs text-gray-700 dark:text-gray-400 md:text-base'>
              {allrecipes?.recipeDescription}
            </span>
          </section>
        </section>
        {/* Dynamically rendered buttons and tables for all the recipe data}*/}
        {isButtonVisible && (
          <>
            <section className='w-full'>
              <RecipeTableComponent
                ingredients={allrecipes?.recipeIngredients}
              />
            </section>

            <section className='flex gap-5 mt-5'>
              <Button theme={customTheme} color='customLoginBtn'>
                Update
              </Button>
              <Button theme={customTheme} color='customLoginBtn'>
                Delete
              </Button>
            </section>
          </>
        )}
      </Card>
    </section>
  );
}
export default CardComponent;
