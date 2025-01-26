import axios from "axios";
import { toast } from "react-toastify";
import CardComponent from "./CardComponent";
import { customCardSize } from "../utils/customComponentsizes/customCardSize";

import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const recipe = await axios.get(`/api/recipe/getSingleRecipe/${params.id}`);
    return recipe;
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

function RecipeCardComponent() {
  const recipeData = useLoaderData();
  const foundRecipe = recipeData.data.foundRecipe;

  /** @isButtonVisible boolean that allows to display dynamically buttons and other recipe contents at the single recipe page. */

  return (
    <section className='flex justify-center items-center p-10'>
      <CardComponent
        allrecipes={foundRecipe}
        custSizeWidth={customCardSize.cusCardWidth}
        custSizeHeight={customCardSize.cusCardHeight}
        isButtonVisible={true}
      />
    </section>
  );
}
export default RecipeCardComponent;
