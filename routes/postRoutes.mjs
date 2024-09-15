import express from "express";
import multer from "multer";
import { postImage } from "../controllers/postController/postImage.mjs";
import { userPost } from "../controllers/postController/postUserPost.mjs";
// Import other functions as needed
// import { getLikes, deleteLikes, modifyLikes } from "../controllers/postController/postLikes.mjs";
// import { getComments, postComment, changeComment, deleteComment } from "../controllers/postController/postComments.mjs";

const router = express.Router();
const upload = multer({ dest: 'public/' });

// Define routes
router.post("/imagePost", upload.single("file"), postImage);
router.get("/userPost", userPost);

// Define other routes as needed
// router.get("/likes", getLikes);
// router.delete("/likes", deleteLikes);
// router.put("/likes", modifyLikes);
// router.get("/comments", getComments);
// router.post("/comments", postComment);
// router.put("/comments", changeComment);
// router.delete("/comments", deleteComment);

export default router;
