import express from "express";
import { settingController } from "../controllers/settingController/settingController.mjs";
const router = express.Router();

router.get("/", settingController);
router.post("/", settingController);
router.get("/:id", settingController);
router.patch("/:id", settingController);
router.put("/:id", settingController);
router.delete("/:id", settingController);

export default router;