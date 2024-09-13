
import setPicture from "../../services/userService/setPicture.mjs";
const userSetPicture = async (req, res) => {

  const userId = req?.userId;

  if (!userId) {
    return res.status(403).json({ message: "Forbidden: Invalid username" });
  }
  const result = await setPicture(userId, req.file, req.body.type);
  res.json(result);
};

export { userSetPicture };
