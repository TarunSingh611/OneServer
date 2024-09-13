import express from "express";
import { getResumeController , postResumeController, getResumeByIdController, putResumeController, deleteResumeController  } from "../controllers/resumeController/resumeController.mjs";
const router = express.Router();

router.get("/", getResumeController);
router.post("/", postResumeController);
router.get("/:id", getResumeByIdController);
router.put("/", putResumeController);
router.delete("/", deleteResumeController);

export default router;