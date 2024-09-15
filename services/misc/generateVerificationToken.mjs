import VerificationToken from "../../models/verificationModel.mjs"; // Adjust the import path accordingly
import generateRandomCode from '../../utils/generateRandomCode.mjs';

export const generateVerificationToken = async (userId, email) => {
  try {
    // Generate a new verification code
    const verificationCode = generateRandomCode();

    // Find or create a verification token entry for the user
    const tokenEntry = await VerificationToken.findOneAndUpdate(
      { userId, email }, // Query condition
      { token: verificationCode }, // Update fields
      { upsert: true, new: true } // Options: create if not exists, return the updated document
    );

    return tokenEntry.token; // Return the generated or updated token

  } catch (error) {
    throw new Error('Error generating verification token: ' + error.message);
  }
};

export const clearVerificationToken = async ({userId, email}) => {
  try {
    // Build the query object based on provided parameters
    const query = {};
    if (userId) query.userId = userId;
    if (email) query.email = email;

    // Ensure that at least one parameter is provided
    if (Object.keys(query).length === 0) {
      throw new Error('Either userId or email must be provided to clear the verification token.');
    }

    // Remove the verification token entry based on the query
    const result = await VerificationToken.findOneAndDelete(query);

    // Check if any document was deleted
    if (!result) {
      throw new Error('No verification token found to clear.');
    }

  } catch (error) {
    throw new Error('Error clearing verification token: ' + error.message);
  }
};
