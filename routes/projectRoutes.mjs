import express from "express";
import { projectController , postProjectController, getProjectController, putProjectController, deleteProjectController } from "../controllers/projectController/projectController.mjs";
const router = express.Router();

router.get("/", projectController);
router.post("/", postProjectController);
router.get("/:id", getProjectController);
router.put("/:id", putProjectController);
router.delete("/:id", deleteProjectController);

export default router;