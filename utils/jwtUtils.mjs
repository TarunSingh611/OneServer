import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const secretKey = process.env.JWT_SECRET;
export const generateToken = (user) => {
	return jwt.sign(
		{
			userId: user._id,
		},
		secretKey,
		{ expiresIn: "24h" }
	);
};

export const verifyToken = (token) => {
  try {
	if (!token) { return null; }
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
export const verifyRefreshToken = (token) => {
	try {
	  if (!token) { return null; }
	  return jwt.verify(token, secretKey);
	} catch (error) {
	  return null;
	}
  };



