import axios from "axios";
import { toast } from "react-toastify";
import CardComponent from "./CardComponent";

import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  //   console.log({ params });
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
  console.log(recipeData);

  return (
    <section className='flex justify-center items-center p-10'>
      <CardComponent allrecipes={foundRecipe} />
    </section>
  );
}
export default RecipeCardComponent;
