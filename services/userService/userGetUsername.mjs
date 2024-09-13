import User from "../../models/userModel.mjs";
import Portfolio from "../../models/portfolioModel.mjs";

/**
 * Get basic user information including social data.
 * @param {String} userId
 * @returns {Object} Response with statusCode and user or error
 */
export async function getUserName(userId, includePortfolio = false) {
  try {
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return { error: "User not found", statusCode: 404 };
    }

    // Basic social profile structure
    const user = {
      _id: targetUser._id,
      username: targetUser.username,
      fullName: targetUser.fullName,
      userVerified: targetUser.userVerified,
      profilePicture: targetUser.profilePicture,
      gender: targetUser.gender,
      birthday: targetUser.birthday,
      pendingFollowers: targetUser.pendingFollowers,
      followers: targetUser.followers,
      following: targetUser.following,
      friends: targetUser.friends,
      accountType: targetUser.accountType,
    };

    // If portfolio data is requested, add the portfolio details
    if (includePortfolio) {
      user.portfolio = targetUser.portfolio || null;
    }

    return { statusCode: 200, user };
  } catch (error) {
    console.error("Error getting user name:", error);
    return { error: "Internal Server Error", statusCode: 500 };
  }
}

/**
 * Get full user profile, including additional info from portfolio.
 * @param {String} userId
 * @returns {Object} Response with statusCode and user profile or error
 */
export async function getUserProfile(userId, includePortfolio = false) {
  try {
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return { error: "User not found", statusCode: 404 };
    }

    // Social profile structure
    const user = {
      _id: targetUser._id,
      username: targetUser.username,
      fullName: targetUser.fullName,
      userVerified: targetUser.userVerified,
      profilePicture: targetUser.profilePicture,
      coverPhoto: targetUser.coverPhoto,
      bio: targetUser.bio,
      gender: targetUser.gender,
      birthday: targetUser.birthday,
      website: targetUser.website,
      pendingFollowers: targetUser.pendingFollowers,
      followers: targetUser.followers,
      following: targetUser.following,
      friends: targetUser.friends,
      accountType: targetUser.accountType,
      followersCount: targetUser.followersCount,
      followingCount: targetUser.followingCount,
      friendsCount: targetUser.friendsCount,
      postsCount: targetUser.postsCount,
      pendingFollowersCount: targetUser.pendingFollowersCount,
    };

    // Conditionally include portfolio data
    if (includePortfolio) {
      user.portfolio = targetUser.portfolio || null;
    }

    return { statusCode: 200, user };
  } catch (error) {
    console.error("Error getting user profile:", error);
    return { error: "Internal Server Error", statusCode: 500 };
  }
}

/**
 * Get user’s portfolio information (used specifically for portfolio views).
 * @param {String} userId
 * @returns {Object} Portfolio data or error
 */
export async function getUserPortfolio(userId) {
  try {
    const portfolioData = await Portfolio.findOne({ userId }).populate("personalInfo sections");

    if (!portfolioData) {
      return { error: "Portfolio not found", statusCode: 404 };
    }

    return { statusCode: 200, portfolioData };
  } catch (error) {
    console.error("Error getting user portfolio:", error);
    return { error: "Internal Server Error", statusCode: 500 };
  }
}

