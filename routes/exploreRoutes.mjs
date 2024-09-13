import express from "express";
import { exploreController } from "../controllers/exploreController/exploreController.mjs";
const router = express.Router();

router.get("/", exploreController);
router.post("/", exploreController);
router.get("/:id", exploreController);
router.patch("/:id", exploreController);
router.put("/:id", exploreController);
router.delete("/:id", exploreController);

export default router;