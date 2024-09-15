import express from "express";
import multer from "multer";
export {postImage} from "../controllers/postController/postImage.mjs";
export {userPost} from "../controllers/postController/postUserPost.mjs";
// export {getLikes, deleteLikes, modifyLikes} from "../controllers/postController/postLikes.mjs";
// export {getComments, postComment, changeComment, deleteComment} from "../controllers/postController/postComments.mjs";


const router = express.Router();
const upload = multer({dest:'public/'})


router.post("/imagePost", upload.single("file"), postImage);

router.get("/userPost", userPost);

// router.get("/likes", getLikes);
// router.delete("/likes",deleteLikes);
// router.put("/likes", modifyLikes);

// router.get("/comments", getComments);
// router.post("/comments", postComment);
// router.put("/comments", changeComment);
// router.delete("/comments", deleteComment);

export default router;
