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
    let socialData = await SocialUser.findOne({ userId }).exec();
    
    if (!socialData) {
      // Create a new social document if none is found
      socialData = new SocialUser({ userId });
      await socialData.save();
    }
  
    const result = { ...user.toObject(), socialMediaData:socialData.toObject()}
    return result;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { success: false, message: "Internal Server Error" };
  }
};
