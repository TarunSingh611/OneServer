import express from "express";
import multer from "multer";
export {postImage} from "../controllers/postController/postImage.mjs";
export {userPost} from "../controllers/postController/postUserPost.mjs";
export {getLikes, deleteLikes, modifyLikes} from "../controllers/postController/postLikes.mjs";
export {getComments, postComment, changeComment, deleteComment} from "../controllers/postController/postComments.mjs";


const router = express.Router();
const upload = multer({dest:'public/'})

/**
 * @swagger
 * /imagePost:
 *   post:
 *     summary: Upload an image
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: The image to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post("/imagePost", upload.single("file"), postImage);

router.post("/imagePost", upload.single("file"), postImage);
router.get("/userPost", userPost);

router.get("/likes", getLikes);
router.delete("/likes",deleteLikes);
router.put("/likes", modifyLikes);

router.get("/comments", getComments);
router.post("/comments", postComment);
router.put("/comments", changeComment);
router.delete("/comments", deleteComment);

export default router;
