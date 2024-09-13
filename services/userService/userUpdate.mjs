// import necessary modules
import User from "../../models/userModel.mjs";
import { comparePassword } from "../../utils/passwordUtils.mjs";
// Function to update user information
const updateUser = async (userId, updates) => {

  try {
    const validUpdates = Object.keys(updates).reduce((acc, key) => {
      if (User.schema.obj[key] !== undefined) {
        acc[key] = updates[key];
      }
      return acc;
    }, {});

    if (validUpdates.contains("password", "recoveryEmail", "phone", "email")) {
      const result = await updateUserSecurity(userId, validUpdates);
      return result;
    }

    if (Object.keys(validUpdates).length > 0) {
      const user = await User.findByIdAndUpdate(userId, validUpdates, { new: true });

      if (!user) {
        return { message: "User not found.", statusCode: 404 };
      }

      return { message: "User updated successfully.", statusCode: 200 };
    } else {
      return { message: "No valid updates provided.", statusCode: 400 };
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return { message: "Internal Server Error", statusCode: 500 };
  }
};

const updateUserSecurity = async (userId, updates) => {
    try {
      const { currentPassword, ...securityUpdates } = updates;
      const user = await User.findById(userId);
      if (!user) {
        return { message: "User not found.", statusCode: 404 };
      }
  
      const isPasswordValid = await comparePassword(currentPassword, user.password);
      if (!isPasswordValid) {
        return { message: "Current password is incorrect.", statusCode: 401 };
      }

        Object.assign(user, securityUpdates);

        await user.save();
  
        return { message: "User security information updated successfully.", statusCode: 200 };
 
    } catch (error) {
      console.error("Error updating user security:", error);
      return { message: "Internal Server Error", statusCode: 500 };
    }
  };
  
  
export default updateUser;
export {updateUserSecurity};