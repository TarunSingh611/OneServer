import express from "express";
import { healthCheck } from "../controllers/guestController/healthController.mjs";
const router = express.Router();

router.get("/health", healthCheck);

export default router;