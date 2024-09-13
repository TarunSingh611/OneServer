import express from "express";
import { homeController , postHomeController, patchHomeController, putHomeController, deleteHomeController } from "../controllers/homeController/homeController.mjs";
const router = express.Router();

router.get("/", homeController);


export default router;