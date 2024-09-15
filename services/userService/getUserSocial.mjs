import User from '../../models/userModel.mjs';
import SocialUser from '../../models/socialModel.mjs';

export const getUserSocialProfile = async (userId) => {
  try {
    // Fetch user data
    const user = await User.findById(userId).exec();
    
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Fetch social data
    const socialData = await SocialUser.findOne({ userId }).exec();
    
    return { success: true, user, socialData };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { success: false, message: "Internal Server Error" };
  }
};
