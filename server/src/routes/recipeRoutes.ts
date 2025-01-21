import express from "express";
import {
  addRecipe,
  getRecipes,
  getSingleRecipe,
} from "../controllers/recipeControllers";
import {
  addRecipeValidation,
  getSingleRecipeValidation,
} from "../middleware/InputValidation";
import upload from "../middleware/multerMiddleware";
const router = express.Router();

router.get("/getRecipes", getRecipes);
router.get("/getSingleRecipe/:id", getSingleRecipeValidation, getSingleRecipe);
router.post(
  "/addRecipe",
  upload.single("photoUrl"), //photoUrl the name of the file sent by the input file field
  addRecipeValidation,
  addRecipe
);

export default router;
