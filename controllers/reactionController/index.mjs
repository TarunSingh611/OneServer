
import likeService from "../../services/reactionService/Like.mjs";

const reactionCreate = async (req, res) => {
  res.send("reactionCreate");
};  

const reactionDelete = async (req, res) => {
  res.send("reactionDelete");
};

const reactionGet = async (req, res) => {
  res.send("reactionGet");
};

const reactionUpdate = async (req, res) => {
  res.send("reactionUpdate");
};

const reactionGetAll = async (req, res) => {
  res.send("reactionGetAll");
}

const like = async (req, res) => {
  const userId = req?.userId;
  const {contentType , contentId} = req.body

  if (!userId) {
    return res.status(403).json({ message: "Forbidden: Invalid username" });
  }

  const result = await likeService.like(contentType, contentId, userId);
 
   res.send(result);

}

  export {
    reactionCreate,
    reactionDelete,
    reactionGet,
    reactionUpdate,
    reactionGetAll,
    like
  };