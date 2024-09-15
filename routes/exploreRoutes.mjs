import express from "express";
import { exploreController, getExploreController } from "../controllers/exploreController/exploreController.mjs";
const router = express.Router();

router.get("/", exploreController);
router.get("/search", getExploreController);


export default router;