export type InputProps = {
  inputIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  required: boolean;
  type: string;
  name: string;
  title: string;
  isVisible?: boolean;
  isPassword?: boolean;
  handleClick?: React.MouseEventHandler<HTMLOrSVGElement>;
  size: string;
};

export type StateType = {
  icon1: boolean;
  icon2: boolean;
};

export type UserDataType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  id: string;
  role: string;
};

export interface IngredientStateProps {
  ingredientName: string | null;
  ingredientQty: number | null;
  _id: string | null;
  ingredientId: string | null;
}
export interface RecipeArray {
  _id: string | null;
  photoUrl: string;
  photoId: string;
  recipeName: string;
  recipeDescription: string;
  recipeIngredients: IngredientStateProps[];
  recipeInstructions: string;
  // createdAt: string;
  // updatedAt: string;
  cookingTime: number;
  category: string;
}

export interface MappedRecipeType {
  _id: string | null;
  photoUrl: string;
  photoId: string;
  ingredientId: string | null;
  recipeName: string;
  recipeDescription: string;
  recipeIngredients: IngredientStateProps[];
  recipeInstructions: string;
  // createdAt: string;
  // updatedAt: string;
  cookingTime: number;
  category: string;
}

export interface HandleQueryEventChange
  extends React.ChangeEvent<HTMLInputElement> {}

export interface SearchQuery {
  search: string;
}

export interface stateProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  ingredients: IngredientStateProps | null;
  setIngredients: React.Dispatch<React.SetStateAction<IngredientStateProps>>;
  recipes: RecipeArray;
  setRecipes: React.Dispatch<React.SetStateAction<RecipeArray>>;
}
