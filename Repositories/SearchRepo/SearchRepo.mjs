import User from "../../models/userModel.mjs";
import HashTag from "../../models/hashTagModel.mjs";
import LikeModel from "../../models/likeModels.mjs";
import SocialUser from "../../models/socialModel.mjs";

/////////////////////////////////////////////////////////////////////////////////////
async function getUserName(text) {
  try {
    const isEmail = text.includes("@");
    const regex = new RegExp(text, "i");

    // Query users by email or username based on the input type
    const users = await User.find({
      [isEmail ? "email" : "username"]: regex
    }).exec();

    if (!users || users.length === 0) {
      return [];
    }

    // Fetch social media data for each user
    const userIds = users.map(user => user._id);
    const socialData = await SocialUser.find({ userId: { $in: userIds } }).exec();

    // Merge the social data with the user data
    const usersWithSocialData = users.map(user => {
      const socialInfo = socialData.find(social => social.userId.equals(user._id));
      return {
        ...user.toObject(),
        socialMediaData: socialInfo || null // Attach social data or set to null if not found
      };
    });

    return usersWithSocialData;
  } catch (error) {
    throw new Error(`Error in getUserName: ${error.message}`);
  }
}

/////////////////////////////////////////////////////////////////////////////////////
async function getFullName(text) {
  try {
    // Split the search text into individual words and create filters
    const searchTerms = text.map((term) => ({
      $or: [
        { firstName: { $regex: new RegExp(term, "i") } },
        { lastName: { $regex: new RegExp(term, "i") } }
      ]
    }));

    // Use $and to ensure all terms match across firstName and lastName
    const users = await User.find({ $and: searchTerms }).exec();
    // Fetch social media data for each user
    const userIds = users.map(user => user._id);
    const socialData = await SocialUser.find({ userId: { $in: userIds } }).exec();

    // Merge the social data with the user data
    const usersWithSocialData = users.map(user => {
      const socialInfo = socialData.find(social => social.userId.equals(user._id));
      return {
        ...user.toObject(),
        socialMediaData: socialInfo || null // Attach social data or set to null if not found
      };
    });

    return usersWithSocialData;
  } catch (error) {
    throw new Error(`Error in getFullName: ${error.message}`);
  }
}

/////////////////////////////////////////////////////////////////////////////////////
async function getPostsByHashtags(words) {
  try {
    if (!words || words.length === 0) {
      throw new Error("No words found in the input text");
    }

    // Query hashtags with matching words and retrieve public posts with the user's account type filter
    const hashtags = await HashTag.find({
      name: { $in: words.map((word) => new RegExp(`^${word}$`, "i")) }
    })
      .populate({
        path: "posts",
        match: { isPublic: true },
        populate: {
          path: "user",
          match: { accountType: { $in: ["public", "business"] } }
        }
      })
      .exec();

    if (!hashtags || hashtags.length === 0) {
      return [];
    }

    // Extract and filter posts from the populated hashtags
    const posts = hashtags.flatMap((hashtag) => hashtag.posts).filter(
      (post) => post.user && post.hashTags.length > 0
    );

    // Sort posts by hashtag count and creation date
    posts.sort(
      (a, b) =>
        b.hashTags.length - a.hashTags.length || b.createdDate - a.createdDate
    );

    // Batch query to check if posts are liked
    const postIds = posts.map((post) => post._id);
    const likes = await LikeModel.find({ contentId: { $in: postIds } }).exec();
    const likedPostIds = new Set(likes.map((like) => like.contentId.toString()));

    // Mark posts as liked if they appear in the likedPostIds set
    posts.forEach((post) => {
      post.liked = likedPostIds.has(post._id.toString());
    });

    return posts;
  } catch (error) {
    throw new Error(`Error in getPostsByHashtags: ${error.message}`);
  }
}

/////////////////////////////////////////////////////////////////////////////////////
export { getUserName, getFullName, getPostsByHashtags };
