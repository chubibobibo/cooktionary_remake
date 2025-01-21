import {
  body,
  param,
  validationResult,
  ValidationChain,
} from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ExpressError } from "../ExpressError/ExpressError";
import UserModel from "../models/UserSchema";
import { StatusCodes } from "http-status-codes";
import { UserInterface } from "../models/UserSchema";

import { recipeCategory } from "../utils/recipecategory";
import mongoose from "mongoose";
import RecipeModel from "../models/RecipeSchema";

//create a function that will handle the error
//This function will accept an array (validateValues) of valeus to be validated.
//then this function will return the array we passed as an argument and an error response
const withValidationErrors = (validateValues: ValidationChain[]) => {
  return [
    ...validateValues, // spread to treat validateValues as an array of function instead of a single middleware (typescript)
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req); //this returns all available errors based on the validation provided when checking the incoming request.
      //check if the errors array is not empty meaning there errors.
      if (!errors.isEmpty()) {
        const errorMessages: string[] = errors
          .array()
          .map((allErrors) => allErrors.msg); //turns the errors from the validationResult into array then mapped it to access the msg key for every item in the original array, then populate the created array with that.
        throw new ExpressError(errorMessages as any); //use the custom error that we created and pass the errorMessages that we mapped instead of a string.
      }
      next();
    },
  ];
};

// Input validations
// register input validation
export const registerInputValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 4, max: 20 })
    .withMessage(
      "Username must be at least 4 characters and less than 20 characters"
    )
    .custom(async (username: string) => {
      const foundUser = await UserModel.findOne({ username }); //findOne expects an object

      if (foundUser) {
        throw new ExpressError(
          "Username already used",
          StatusCodes.UNAUTHORIZED
        );
      }
    }),
  body("firstName")
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isLength({ min: 4, max: 20 })
    .withMessage(
      "First name must be at least 4 characters and less than 20 characters"
    ),
  body("lastName")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ min: 4, max: 20 })
    .withMessage(
      "Last name must be at least 4 characters and less than 20 characters"
    ),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email should be valid")
    .custom(async (email: string) => {
      const foundEmail = await UserModel.findOne({ email }); //findOne expects an object
      if (foundEmail) {
        throw new ExpressError(
          "Email already in use",
          StatusCodes.UNAUTHORIZED
        );
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
]);

//login input validation
export const loginInputValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 4, max: 20 })
    .withMessage(
      "Username must be at least 4 characters and less than 20 characters"
    ),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
]);

//Update user input validation
export const updateUserValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 4, max: 20 })
    .withMessage(
      "Username must be at least 4 characters and less than 20 characters"
    )
    .custom(async (username: string, { req }) => {
      const foundUser = await UserModel.findOne({ username }); //findOne expects an object

      if (foundUser && req.user.username !== username) {
        throw new ExpressError(
          "Username already used",
          StatusCodes.UNAUTHORIZED
        );
      }
    }),
  body("firstName")
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isLength({ min: 4, max: 20 })
    .withMessage(
      "First name must be at least 4 characters and less than 20 characters"
    ),
  body("lastName")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ min: 4, max: 20 })
    .withMessage(
      "Last name must be at least 4 characters and less than 20 characters"
    ),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email should be valid")
    .custom(async (email: string, { req }) => {
      const foundEmail = await UserModel.findOne({ email }); //findOne expects an object
      if (foundEmail && req.user.email !== email) {
        throw new ExpressError(
          "Email already in use",
          StatusCodes.UNAUTHORIZED
        );
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
]);

export const addRecipeValidation = withValidationErrors([
  body("recipeName")
    .notEmpty()
    .withMessage("Recipe name cannot be empty")
    .isLength({ max: 30 })
    .withMessage("Recipe name too long"),
  body("recipeInstructions")
    .notEmpty()
    .withMessage("Recipe instructions cannot be empty"),
  body("recipeDescription")
    .notEmpty()
    .withMessage("Recipe description cannot be empty"),
  body("cookingTime")
    .notEmpty()
    .withMessage("Cooking time cannot be empty")
    .isNumeric()
    .withMessage("Cooking time should be a number"),
  body("category")
    .notEmpty()
    .withMessage("Category cannot be empty")
    .isIn(Object.values(recipeCategory))
    .withMessage("Category should be a valid choice"),
  // body("recipeIngredients.*.ingredientName")
  //   .notEmpty()
  //   .withMessage("Ingredient name cannot be empty")
  //   .isLength({ max: 20 })
  //   .withMessage("Ingredient is too long"),
  // body("recipeIngredients.*.ingredientQty")
  //   .notEmpty()
  //   .withMessage("Ingredient quantity cannot be empty")
  //   .isNumeric()
  //   .withMessage("Ingredient quantity should a number"),
]);

export const getSingleRecipeValidation = withValidationErrors([
  param("id").custom(async (id) => {
    const validMongoId = mongoose.Types.ObjectId.isValid(id);
    if (!validMongoId) {
      throw new ExpressError(
        "Not a valid mongo id",
        StatusCodes.NOT_ACCEPTABLE
      );
    } else {
      const foundRecipe = await RecipeModel.findById(id);
    }
  }),
]);
