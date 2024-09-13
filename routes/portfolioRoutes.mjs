import express from "express";
import { portfolioController , postPortfolioController, getPortfolioController, putPortfolioController, deletePortfolioController  } from "../controllers/portfolioController/portfolioController.mjs";
const router = express.Router();

router.get("/", portfolioController);
router.post("/", postPortfolioController);
router.get("/:id", getPortfolioController);
router.put("/", putPortfolioController);
router.delete("/", deletePortfolioController);

export default router;