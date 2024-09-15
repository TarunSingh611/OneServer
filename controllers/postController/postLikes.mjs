import {
  getLikes,
  deleteLikes,
  putLikes,
} from "../../services/postService/setPostLikes.mjs";

export async function postLikes(req, res) {
    const postId = req.query.postId;
    const likes = await getLikes(postId);
    res.json(likes);
  } 
  
  export async function removeLikes(req, res) {
    const postId = req.query.postId;
    const userId = req?.userId
    if (!userId) {
      res.status(403).json({ message: "Forbidden: Invalid username" });
    }
    const result = await deleteLikes(postId, userId);
    res.json(result);
  } 
  
  export async function modifyLikes(req, res) {
    const postId = req.query.postId;
    const userId = req?.userId
    if (!userId) {
      res.status(403).json({ message: "Forbidden: Invalid username" });
    }
    const result = await putLikes(postId, userId);
    res.json(result);
  }


