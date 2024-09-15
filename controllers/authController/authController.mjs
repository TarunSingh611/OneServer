import userModel from "../../models/userModel.mjs";
import { generateVerificationToken, clearVerificationToken } from "../../services/misc/generateVerificationToken.mjs";
import { generateToken, verifyToken } from "../../utils/jwtUtils.mjs";
import VerificationToken from "../../models/verificationModel.mjs";
import  loginUser from "../../services/userService/userLogin.mjs";
import { registerUser } from '../../services/userService/userRegister.mjs';
import  sendEmail  from "../../utils/sendNodeMail.mjs";

export const signUpController = async (req, res) => {
	try {
        const { firstName, lastName, username, email, phone, password} = req.body;

        const result = await registerUser({ firstName, lastName, username, email, phone, password });
        res.status(200).json(result);

	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			message: error.message,
		});
	}
};


export const loginController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await loginUser(username,email, password);

        if(result.statusCode === 200) {
            res.setHeader('jwtToken', result.token).status(200).json({message: "Login successful", user:result?.user, statusCode: 200});
        }else{
            res.status(200).json(result);
        }

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            message: error.message,
        });
    }
}


export const verificationCodeController = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if(!user) {
            return res.status(200).json({
                statusCode: 401,
                message: "Invalid email",
            });
        }
        const verificationToken = await generateVerificationToken(user?._id,email);
        sendEmail(email, `verificationCode`, verificationToken).then((success) => {
            console.log('Email sent:', success);
        })
        .catch((error) => {
            console.log(error);
        });
        res.status(200).json({
            statusCode: 200,
            message: "Verification code sent to your email",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            message: error.message,
        });
    }
}

export const verificationController = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        const user = await userModel.findOne({ email });
        const verificationToken = await VerificationToken.findOne({ email }).exec();
        if (!user) {
            return res.status(200).json({
                statusCode: 401,
                message: "Invalid email",
            });
        }
        if (verificationToken?.token !== verificationCode) {
            return res.status(200).json({
                statusCode: 401,
                message: "Invalid verification code",
            });
        }
        user.emailVerified = true;
        clearVerificationToken({email})
        await user.save();
        
        let token;
        if(verifyToken(req?.token)){ token = req?.token }
        else{ token = generateToken(user) }
        res.setHeader('jwtToken', result.token).status(200).json({
            statusCode: 200,
            user,
            message: "Email verified successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            message: error.message,
        });
    }
}

export const logoutController = async (req, res) => {
    try {
        removeToken();
        res.setHeader('jwtToken', "").status(200).json({
            statusCode: 200,
            user : null,
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", message: error.message });
    }
}

