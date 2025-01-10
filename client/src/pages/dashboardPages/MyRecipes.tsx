import { useState } from "react";
import BadgeComponent from "../../components/BadgeComponent";

import { badges } from "../../utils/BadgesArray";

import { Card } from "flowbite-react";
import { TextInput } from "flowbite-react";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { customCard } from "../../utils/themes/customThemes";
import { customInput } from "../../utils/themes/customThemes";

import { QueryEventChange } from "../../types/InputProps";
import { SearchQuery } from "../../types/InputProps";

import { IoMdTime } from "react-icons/io";
import { MdOutlineDescription } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData, Form, useSubmit } from "react-router-dom";

import { RecipeArray } from "../../types/InputProps";

/** loader function to obtain all recipes */
import { LoaderFunctionArgs } from "react-router-dom";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  /** @params created new url from the request sent by the form search input. @searchParams gives access to the url in the request and @entries returns a key value pair containing the queries which is then converted to a useable object by Object.fromEntries. */
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const response = await axios.get("/api/recipe/getRecipes", { params });
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

  const submit = useSubmit();

  const [selectedCategory, setSelectedCategory] = useState({ category: "" });
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({ search: "" });

  const handleQueryChange = (e: QueryEventChange): void => {
    setSearchQuery((prev: SearchQuery) => {
      return { ...prev, search: e.target.value };
    });
    submit(e.currentTarget.form);
  };

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
    <section className='flex flex-col flex-wrap'>
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
      <h1 className='my-2 px-6 font-rubik font-semi-bold text-base m-auto md:mx-0 md:text-xl'>
        My Custom Recipes
      </h1>
      <section className='w-12/12 px-6 md:w-5/12 xl:w-3/12'>
        <Form action='/dashboard/myRecipes'>
          <TextInput
            id='email4'
            type='search'
            name='search'
            icon={FaMagnifyingGlass}
            placeholder='Search'
            theme={customInput}
            color='customInputColor'
            onChange={handleQueryChange}
            value={searchQuery.search}
          />
        </Form>
      </section>
      {/* @Vertical Card component that displays the recipe card */}
      <section className='mt-1 p-2 gap-2 grid grid-cols-2 justify-items-center xl:grid-cols-3 xl:p-5 2xl:grid-cols-4'>
        {recipeData.map((allrecipes: RecipeArray) => {
          return (
            <section className='w-fit' key={allrecipes._id}>
              <Card
                className='min-w-11/12 h-[17rem] border-[2px] border-customLoginBtnColor md:hidden '
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
                className='md:w-full md:h-[17rem] border-[2px] border-customLoginBtnColor hidden md:flex'
                imgAlt='Meaningful alt text for an image that is not purely decorative'
                imgSrc='../../src/assets/CooktionaryLogo.png'
                theme={customCard}
                horizontal
              >
                <p className='text-sm font-bold tracking-tight text-gray-900 dark:text-white mt-2 md:text-xl capitalize'>
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
            </section>
          );
        })}
      </section>
    </section>
  );
}
export default MyRecipes;
