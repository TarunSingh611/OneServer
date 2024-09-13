import  User  from "../../models/userModel.mjs";
import { generateToken } from "../../utils/jwtUtils.mjs";
import { comparePassword } from "../../utils/passwordUtils.mjs";
import sendEmail from "../../utils/sendNodeMail.mjs";
import { generateVerificationToken } from "../misc/generateVerificationToken.mjs";

const loginUser = async (username, email, password) => {
  try {
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) {
      return { message: "Invalid username or email.", statusCode: 401 };
    }

    const isPasswordCorrect =  comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      return { message: "Invalid password.", statusCode: 401 };
    }

    if (!user.emailVerified) {
      const verificationToken = await generateVerificationToken(user);
      sendEmail(email, `verificationCode`, verificationToken).then((success) => {
        console.log('Email sent:', success);
      }).
      catch((error) => {
        console.error('Error sending email:', error);
      })
      return { message: "Email not verified.", statusCode: 303 };
    }
    
    const token = generateToken(user);

    return {
      message: "User logged in successfully.",
      statusCode: 200,
      user,
      token
    };
  } catch (error) {
    console.error("Login message:", error);
    return { message: "Internal server error.", statusCode: 500 };
  }
};

export default loginUser;
