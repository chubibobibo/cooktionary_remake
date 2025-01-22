import axios from "axios";
import { toast } from "react-toastify";

import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log({ params });
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
  console.log(recipeData);

  return (
    <div>
      RecipeCardComponent: {recipeData.data.foundRecipe._id}:{" "}
      {recipeData.data.foundRecipe.recipeName}
    </div>
  );
}
export default RecipeCardComponent;
