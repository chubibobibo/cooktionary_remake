import express from "express";
import { addRecipe, getRecipes } from "../controllers/recipeControllers";
const router = express.Router();

router.get("/getRecipes", getRecipes);
router.post("/addRecipe", addRecipe);

export default router;
