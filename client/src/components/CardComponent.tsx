/** @NOTE CARD COMPONENT REUSED IN THE MAPPED CARDS IN MYRECIPES COMPONENT AND IN THE RECIPECARDCOMPONENT */

/** @NOTE CREATED 2 CUSTOM THEMES FOR THE CARDS DEPENDING WHERE IT WAS USED, USING A BOOLEAN (isButtonVisible) VALUE TO DIFFERENTIATE */

import { Card } from "flowbite-react";
import { Button } from "flowbite-react";

import { IoMdTime } from "react-icons/io";
import { MdOutlineDescription } from "react-icons/md";
import { customCard, customSingleCard } from "../utils/themes/customThemes";
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
  isButtonVisible,
}: CardComponentProps) {
  const navigate = useNavigate();
  const handleClickNavigate = () => {
    navigate(`/dashboard/recipe/${allrecipes._id}`);
  };

  // console.log(allrecipes);
  // console.log(isButtonVisible);
  return (
    <section className='flex justify-center sm:p-3 gap-4 flex-col'>
      {/* @Vertical Card component that displays the recipe card */}
      <Card
        className={`w-${custSizeWidth} border-[2px] border-customLoginBtnColor md:hidden cursor-pointer ${
          isButtonVisible && "sm:w-[30rem]"
        }`}
        imgAlt='recipe image'
        imgSrc={allrecipes.photoUrl}
        theme={isButtonVisible ? customSingleCard : customCard}
        onClick={handleClickNavigate}
      >
        <p className='text-sm font-bold tracking-tight text-gray-900 dark:text-white mt-2 mx-auto'>
          {allrecipes?.recipeName}
        </p>
        {/*card content section */}
        <section className='p-2 flex-col'>
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
            <>
              <section className='text-base font-semibold mt-2 '>
                How to cook:
              </section>
              <section className='font-rubik text-xs text-gray-700 dark:text-gray-400 md:text-base'>
                {allrecipes?.recipeInstructions}
              </section>
            </>
          )}
        </section>
        {/* Dynamically rendered buttons and tables for all the recipe data}*/}
        {isButtonVisible && (
          <section className='flex flex-col items-center'>
            <section className='w-full place-items-center'>
              <RecipeTableComponent
                ingredients={allrecipes?.recipeIngredients}
              />
            </section>
            <section className='flex gap-5 mt-5 mb-3 '>
              <Button theme={customTheme} color='customLoginBtn'>
                Update
              </Button>
              <Button theme={customTheme} color='customLoginBtn'>
                Delete
              </Button>
            </section>
          </section>
        )}
      </Card>
      {/** horizontal card*/}
      <Card
        className={`${
          isButtonVisible
            ? "md:h-full p-3 hidden md:flex"
            : "md:h-[20rem] border-[2px] border-customLoginBtnColor hidden md:flex cursor-pointer"
        } `}
        imgAlt='recipe image'
        imgSrc={allrecipes.photoUrl}
        theme={isButtonVisible ? customSingleCard : customCard}
        horizontal
        onClick={handleClickNavigate}
      >
        <p className='text-sm font-bold tracking-tight text-gray-900 dark:text-white mt-2 md:text-xl capitalize mx-auto'>
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
          {isButtonVisible && (
            <>
              <section className='text-base font-semibold mt-2 '>
                {" "}
                How to cook:
              </section>
              <section className='font-rubik text-xs text-gray-700 dark:text-gray-400 md:text-base'>
                {allrecipes?.recipeInstructions}
              </section>
            </>
          )}
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
