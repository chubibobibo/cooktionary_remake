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
