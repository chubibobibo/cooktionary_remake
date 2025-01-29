import BadgeComponent from "../../components/BadgeComponent";
import ModalComponent from "../../components/ModalComponent";
import CardComponent from "../../components/CardComponent";

import { badges } from "../../utils/BadgesArray";
import { customInput, customTheme } from "../../utils/themes/customThemes";
import { customCardSize } from "../../utils/customComponentsizes/customCardSize";
import { LazyComponentLoad } from "../../utils/LazyComponentLoad";

import { TextInput, Button } from "flowbite-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

import {
  HandleQueryEventChange,
  SearchQuery,
  RecipeArray,
  IngredientStateProps,
  MappedRecipeType,
} from "../../types/InputProps";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useLoaderData,
  Form,
  useSubmit,
  LoaderFunctionArgs,
} from "react-router-dom";

/** loader function to obtain all recipes */
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
  /** @selectedCategory state that contains data for the BadgeComponent:  */
  /** @handleActiveBadge event handler that sets @selectedCategory to the argument (str) that is passed on the event handler (handleActiveBadge) */
  /** @searchQuery state that will handle the value of the search input */
  /** @data response containing data of recipes from loader function */
  /** @recipeData array of objects containing allRecipes */
  /** @openModal state to handle modal opening */
  /** @handleQueryChange state to handle query inputs changes */
  /** @isButtonVisible boolean that allows to display dynamically buttons and other recipe contents at the single recipe page. */

  const data = useLoaderData();
  const submit = useSubmit();
  const recipeData: [] = data?.data?.allRecipes;
  // console.log(data);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    category: string | undefined;
  }>({ category: "" });
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({ search: "" });

  const [ingredients, setIngredients] = useState<IngredientStateProps>({
    ingredientName: "",
    ingredientQty: 0,
    ingredientId: null,
    _id: null,
  });

  const [recipes, setRecipes] = useState<RecipeArray>({
    _id: null,
    photoUrl: "",
    photoId: "",
    recipeName: "",
    recipeInstructions: "",
    recipeDescription: "",
    cookingTime: 0,
    category: "beef",
    recipeIngredients: [], //initial so that we can update with new objects from ingredient state
  });

  const handleQueryChange = (e: HandleQueryEventChange): void => {
    setSearchQuery((prev: SearchQuery) => {
      return { ...prev, search: e.target.value };
    });
    submit(e.currentTarget.form);
  };

  return (
    <section className='flex flex-col flex-wrap w-full'>
      {/* @badges is an array of objects containing the category and badge icon
       */}
      <section className='flex justify-center gap-4 mt-2 flex-wrap pb-4 border-b-[1px] sm:py-5 xl:gap-20'>
        {badges.map((allBadges, idx) => {
          return (
            <section key={idx}>
              <BadgeComponent
                key={idx}
                category={allBadges.category}
                setSelectedCategory={setSelectedCategory}
                selectedCategoryProp={selectedCategory}
                badgeIcon={allBadges.bdgIcon}
                name={allBadges.name}
              />
            </section>
          );
        })}
      </section>
      <h1 className='my-2 px-6 font-rubik font-semi-bold text-base m-auto md:mx-0 md:text-xl'>
        My Custom Recipes
      </h1>

      {/** Button modals */}
      <section className='flex justify-center mb-5'>
        <Button
          onClick={() => setOpenModal(true)}
          theme={customTheme}
          color='customLoginBtn'
        >
          <FaPlus className='mr-2 h-5 w-4 text-gray-700' />
          Create your own recipe
        </Button>
        <ModalComponent
          setOpenModal={setOpenModal}
          openModal={openModal}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipes={recipes}
          setRecipes={setRecipes}
        />
      </section>
      {/** Query input for recipe name */}
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
      {/** mapped cards */}
      <section className='mt-1 p-2 gap-4 grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 justify-items-center md:grid-cols-1 lg:grid-cols-1 lg:items-center xl:p-5 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-4'>
        {!data?.data?.allRecipes ? (
          <section className='grid col-span-3 text-base xl:col-span-4 xl:text-2xl'>
            <h1>Wow it's empty here...</h1>
          </section>
        ) : (
          recipeData?.map((allrecipes: MappedRecipeType) => {
            return (
              <section key={allrecipes._id}>
                <LazyComponentLoad>
                  <CardComponent
                    allrecipes={allrecipes}
                    custSizeWidth={customCardSize.cusCardWidthIndex}
                    custSizeHeight={customCardSize.cusCardHeightIndex}
                    isButtonVisible={false}
                  />
                </LazyComponentLoad>
              </section>
            );
          })
        )}
      </section>
    </section>
  );
}
export default MyRecipes;
