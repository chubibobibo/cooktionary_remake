import express from "express";
import { addRecipe, getRecipes } from "../controllers/recipeControllers";
import { addRecipeValidation } from "../middleware/InputValidation";
const router = express.Router();

router.get("/getRecipes", getRecipes);
router.post("/addRecipe", addRecipeValidation, addRecipe);

export default router;
