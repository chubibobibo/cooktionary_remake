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

export interface RecipeArray {
  _id: string;
  recipeName: string;
  recipeDescription: string;
  recipeIngredients: string;
  recipeInstructions: string;
  createdAt: string;
  updatedAt: string;
  cookingTime: number;
}

export interface HandleQueryEventChange
  extends React.ChangeEvent<HTMLInputElement> {}

export interface SearchQuery {
  search: string;
}
