import express from "express";
import {
    getDiscussions,
    getDiscussion,
    createDiscussion,
    updateDiscussion,
    deleteDiscussion
} from "../controllers/discussionController/queryController.mjs";
import {
    addReply,
    deleteReply
} from "../controllers/discussionController/discussRController.mjs";

const router = express.Router();

router.get("/", getDiscussions);
router.post("/", createDiscussion);
router.get("/:id", getDiscussion);
router.patch("/:id", updateDiscussion);
router.put("/:id", updateDiscussion);
router.delete("/:id", deleteDiscussion);

router.post("/:id/replies", addReply);
router.delete("/:discussionId/replies/:replyId", deleteReply);

export default router;
