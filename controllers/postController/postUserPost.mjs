
import getUserPostsByUserId from "../../services/postService/getUserPostByUserId.mjs";

const userPost = async (req, res) => {
  const userId = req?.userId;
  const pno = req.query.pno;

  if (!userId) {
    return res.status(403).json({ message: "Forbidden: Invalid username" });
  }

  if (req.method === "GET") {

        const result = await getUserPostsByUserId(userId, userId, pno);
        return res.json(result);
  }
};

export { userPost };
