// jwtMiddleware.mjs
import { verifyToken } from '../utils/jwtUtils.mjs';

const jwtMiddleware = async (req, res, next) => {
  const token = req.headers['jwttoken'];
  if (token) {
    try {
      const decodedToken = verifyToken(token);
      if(decodedToken) {
        req.userId = decodedToken.userId; 
      }
    } catch (error) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
  }

  next();
}
export default jwtMiddleware;
