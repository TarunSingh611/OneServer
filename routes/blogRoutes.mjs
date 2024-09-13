import express from "express";
import {
    blogController,
    postBlogController,
    getBlogController,
    patchBlogController,
    putBlogController,
    deleteBlogController,
} from "../controllers/blogController/blogController.mjs";
const router = express.Router();

router.get("/", blogController);
router.post("/", postBlogController);
router.get("/:id", getBlogController);
router.patch("/:id", patchBlogController);
router.put("/:id", putBlogController);
router.delete("/:id", deleteBlogController);

export default router;
