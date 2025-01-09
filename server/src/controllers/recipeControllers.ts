import "express-async-errors";
import { Request, Response } from "express";
import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";
import RecipeModel from "../models/RecipeSchema";

export const addRecipe = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new ExpressError("Something went wrong", StatusCodes.BAD_REQUEST);
  }
  const newRecipe = await RecipeModel.create(req.body);
  if (!newRecipe) {
    throw new ExpressError(
      "Cannot create a new recipe",
      StatusCodes.BAD_REQUEST
    );
  }
  res.status(StatusCodes.OK).json({ message: "New recipe created", newRecipe });
};

export const getRecipes = async (req: Request, res: Response) => {
  const allRecipes = await RecipeModel.find({
    recipeAuthor: req.user?._id,
  }).populate("recipeAuthor");
  if (allRecipes.length === 0) {
    res.status(StatusCodes.OK).json({ message: "Wow, It's empty here!" });
  }
  if (!allRecipes) {
    throw new ExpressError("No recipes found", StatusCodes.NOT_FOUND);
  }
  res
    .status(StatusCodes.OK)
    .json({ messages: "All recipes found", allRecipes });
};
