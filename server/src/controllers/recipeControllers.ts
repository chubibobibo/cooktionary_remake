import "express-async-errors";
import { query, Request, Response } from "express";
import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";
import RecipeModel from "../models/RecipeSchema";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const addRecipe = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new ExpressError("Something went wrong", StatusCodes.BAD_REQUEST);
  }
  if (!req.user) {
    throw new ExpressError("User is not authorized", StatusCodes.UNAUTHORIZED);
  }

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path); //delete photo in the public folder
    req.body.photoUrl = response.secure_url;
    req.body.photoId = response.public_id;
  }

  /** @mappedIngredients req.body.recipeIngredients is an array of stringified objects (from sending the formData). Mapped every item to parse each one then returns the parsed objects in a new array*/
  const mappedIngredients = req.body.recipeIngredients.map(
    (ingredient: any) => {
      const parsedIngredient = JSON.parse(ingredient);
      return parsedIngredient;
    }
  );

  req.body.recipeIngredients = mappedIngredients; //parsed obj in a new array as value for req.body.recipeIngredients
  req.body.recipeAuthor = req.user?._id;

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
