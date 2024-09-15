import PostModel from "../../models/postModel.mjs";
import LikeModel from "../../models/likeModels.mjs";
import {getUserSocialProfile} from "../../services/userService/getUserSocial.mjs"

async function getExplore(userId, page = 1, pageSize = 9) {
  try {
    const skipCount = (page - 1) * pageSize;

    // Fetch user data and determine the condition for posts
    const user = userId ? await getUserSocialProfile(userId) : null;
    const excludedUserIds = user ? [user?._id, ...user?.following] : [];
    const isUserExcluded = excludedUserIds?.length > 0;
    // Query posts with conditions applied
    const query = {
      isPublic: true,
      ...(isUserExcluded ? { user: { $nin: excludedUserIds } } : {}),
    };

    // Fetch posts with sorting, pagination, and populating user info
    const posts = await PostModel.find(query)
      .sort({ createdDate: -1 })
      .skip(skipCount)
      .limit(pageSize)
      .populate('user', 'fullName username profilePicture accountType following followers friends pendingFollowers')
      .exec();

    // Determine which posts are liked by the user
    let likedPosts = [];
    if (user) {
      likedPosts = await LikeModel.find({ contentId: { $in: posts.map(post => post._id) }, userId: user._id }).exec();
    }

    // Map liked statuses to posts
    const likedPostIds = new Set(likedPosts.map(like => like.contentId.toString()));
    posts.forEach(post => {
      post.liked = likedPostIds.has(post._id.toString());
    });

    // Filter posts based on accountType
    const filteredPosts = posts.filter(post => 
      post.user.accountType === 'public' || post.user.accountType === 'business'
    );

    return { success: true, posts: filteredPosts, statusCode: 200 };

  } catch (error) {
    console.error("Error getting Explore:", error);
    return { success: false, message: "Internal Server Error", statusCode: 500 };
  }
}

export default getExplore;
