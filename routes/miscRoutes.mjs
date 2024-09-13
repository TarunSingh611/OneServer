import express from "express";
import { getNavController } from "../controllers/miscController/miscController.mjs";
const router = express.Router();

router.get("/navs", getNavController);


export default router;