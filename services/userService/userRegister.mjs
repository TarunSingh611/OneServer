import User from "../../models/userModel.mjs";
import { generateVerificationToken } from "../misc/generateVerificationToken.mjs";
import  sendEmail  from "../../utils/sendNodeMail.mjs";
const registerUser = async ({
  firstName,
  lastName,
  username,
  email,
  phone,
  password,
}) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { phone }],
    });
    if (existingUser) {
      return { message: "User with the provided username, email, or phone already exists.", statusCode: 400 };
    }

    const newUser = new User({
      firstName : `${(firstName || '').trim()}`,
      lastName : `${(lastName || '').trim()}`,
      username,
      email : email.toLowerCase(),
      phone,
      password,
    });

    await newUser.save();

    const verificationToken = await generateVerificationToken(newUser._id, email);
    
    sendEmail(email, 'verificationCode', verificationToken).then((success) => {
      console.log('Email sent:', success);
    }).
    catch((error) => {
      console.error('Error sending email:', error);
    })

    return { message: "User registered successfully, Please verify" , statusCode: 303 };
  } catch (error) {
    console.error("Error registering user:", error);
    return { message: "Internal Server Error", statusCode: 500 };
  }
};

export { registerUser };


