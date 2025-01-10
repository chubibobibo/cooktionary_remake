import mongoose, { InferSchemaType, model, Types } from "mongoose";
const { Schema } = mongoose;

export interface RecipeInterface extends Document {
  recipeName: string;
  recipeIngredients: string[];
  ingredientName: string;
  ingredientQty: number;
  recipeInstructions: string;
  recipeDescription: string;
  recipeAuthor: Types.ObjectId;
  cookingTime: number;
  category: string;
}

const RecipeSchema = new Schema<RecipeInterface>(
  {
    recipeName: {
      type: String,
      required: true,
    },

    recipeIngredients: [
      {
        ingredientName: {
          type: String,
          required: true,
        },
        ingredientQty: {
          type: Number,
        },
      },
    ],

    recipeInstructions: {
      type: String,
      required: true,
    },

    recipeDescription: {
      type: String,
      required: true,
    },

    recipeAuthor: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },

    cookingTime: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["pork", "beef", "chicken", "fish", "vegetarian", "dessert"],
    },
  },
  { timestamps: true }
); // assert type of schema using RecipeInterface

type RecipeTypes = InferSchemaType<typeof RecipeSchema>;

export default model<RecipeTypes>("RecipeModel", RecipeSchema);
