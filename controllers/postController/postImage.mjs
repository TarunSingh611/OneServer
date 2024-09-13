
import setImagePost from "../../services/postService/setImagePost.mjs";

/**
 * @swagger
 * /postImage:
 *   post:
 *     summary: Upload an image with hashtags and caption
 *     description: Uploads an image for the authenticated user and attaches hashtags and a caption.
 *     consumes:
 *       - multipart/form-data
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The image file to upload
 *         required: true
 *       - in: formData
 *         name: hashtags
 *         type: string
 *         description: Comma-separated list of hashtags
 *       - in: formData
 *         name: caption
 *         type: string
 *         description: The caption for the image
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: File not found or invalid request
 *       403:
 *         description: Forbidden: Invalid username
 *       500:
 *         description: Internal Server Error
 */

const postImage = async (req, res) => {
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

export { postImage };
