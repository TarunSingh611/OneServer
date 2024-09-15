import express from "express";
import { getFeed } from "../controllers/feedController/feedController.mjs";
const router = express.Router();

router.get("/", getFeed);

export default router;