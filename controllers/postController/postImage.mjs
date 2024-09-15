
import setImagePost from "../../services/postService/setImagePost.mjs";
export const postImage = async (req, res) => {
  try {
    const userId = req?.userId;

    if (!userId) {
      return res.status(403).json({ statusCode: 403, message: "Forbidden: Invalid username" });
    }

    const file = req.file;
    const hashTags = req.body.hashtags;
    const caption = req.body.caption;

    if (!file) {
      return res.status(400).json({ statusCode: 400, message: "File not found" });
    }

    const result = await setImagePost(userId, file, hashTags, caption);
    res.json(result);
  } catch (error) {
    console.error("Error in postImage controller:", error);
    res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
  }
};

