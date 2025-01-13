import "express-async-errors";
import { query, Request, Response } from "express";
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

/** GET ALL RECIPES */
export const getRecipes = async (req: Request, res: Response) => {
  /** @search query from the search form */
  /** @queryobj object will be used as the default search parameter in the API */
  const { search, searchCategory } = req.query;
  const queryObj: any = {
    recipeAuthor: req.user?._id,
  };

  /** create a new entry in queryObj depending from the search query recieved using regex */
  if (search) {
    queryObj.$or = [{ recipeName: { $regex: search, $options: "i" } }];
  }

  //search query for category using searchCategory input
  if (searchCategory) {
    queryObj.$or = [{ category: { $regex: searchCategory, $options: "i" } }];
  }

  const allRecipes = await RecipeModel.find(queryObj).populate("recipeAuthor");
  if (allRecipes.length === 0) {
    res.status(StatusCodes.OK).json({ message: "Wow, It's empty here!" });
  } else {
    if (!allRecipes) {
      throw new ExpressError("No recipes found", StatusCodes.NOT_FOUND);
    }
    res
      .status(StatusCodes.OK)
      .json({ messages: "All recipes found", allRecipes });
  }
};
