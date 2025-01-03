import PostModel from "../../models/postModel.mjs";
import LikeModel from "../../models/likeModels.mjs";
import UserModel from "../../models/userModel.mjs";

async function getFeed(userId, tokenId, page = 1, pageSize = 9) {
  try {
    const skipCount = (page - 1) * pageSize;
    const user = (await UserModel.find({_id : userId}))?.[0]
    const posts = await PostModel.find({
      $or: [
        { user: user._id },
        { user: { $in:user.following } },
        { user: { $in:user.friends } }
      ]
    })
      .sort({ createdDate: -1 })
      .skip(skipCount)
      .limit(pageSize)
      .populate('user', 'fullName username profilePicture accountType following followers friends pendingFollowers');

      
      for (const post of posts) {
        try {
          const like = await LikeModel.findOne({ contentId: post._id, userId: tokenId });
          post.liked = Boolean(like);

        } catch (error) {
          console.log("Error in like:getFeed", error);
        }
      }
    return { success: true, data: posts, statusCode: 200 };
  } catch (error) {
    console.error("Error getting feed:", error);
    return { success: false, message: "Internal Server Error", statusCode: 500 };
  }
}

export default getFeed;
