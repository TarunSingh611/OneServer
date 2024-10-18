import getFeedService from "../../services/feedService/getFeed.mjs";

export const getFeed = async(req, res) => {
    const userId = req?.userId;
    if (!userId) {
      throw new Error('User not found');
    }
    const result = await getFeedService(userId);
    res.status(result.statusCode).json(result);
  };
  