import express from "express";
import { addRecipe } from "../controllers/recipeControllers";
const router = express.Router();

router.post("/addRecipe", addRecipe);

export default router;
