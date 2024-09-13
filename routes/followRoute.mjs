import express from "express";
import { sendFollowRequest,acceptFollowRequest,rejectFollowRequest,retractFollowRequest,unfollowUser } from "../controllers/followController/followController.mjs";
const router = express.Router();

router.post("/send-request",sendFollowRequest);
router.post("/accept-request",acceptFollowRequest);
router.post("/reject-request",rejectFollowRequest);
router.post("/retract-request",retractFollowRequest);
router.post("/unfollow-request",unfollowUser);
export default router;
