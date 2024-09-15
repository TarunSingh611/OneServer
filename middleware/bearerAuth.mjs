import dotenv from "dotenv";
import { Router } from "express";

dotenv.config();

const { VALID_API_KEYS, EXCLUDED_ROUTES } = process.env;

const validRoutes = {
  meow: ["auth", "misc", "guest", "user", "settings" ,"portfolio" , "resume" , "blogs" , "projects" , "problems" , "solutions" , "discuss" , "codezone" , "profile"],
  profile: ["auth", "misc", "guest", "user", "settings"],
  portfolio: ["auth", "misc", "guest", "resume", "projects", "blogs", "settings", "portfolio"],
  resumemaker: ["auth", "misc", "guest", "resume", "settings"],
  codezone: ["auth", "misc", "guest", "profile", "problems", "solutions", "discuss", "settings", "blog"],
  socialSphere : ["auth", "misc", "guest", "user", "settings","feed" , "explore", "post"],
};



const excludedRoutes = JSON.parse(EXCLUDED_ROUTES) || [];
const validApiKeys = JSON.parse(VALID_API_KEYS) || [];

const bearerAuth = (req, res, next) => {
  if (excludedRoutes.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ message: "Invalid Bearer: Unauthorized Access" });
  }

  const token = authHeader.split(" ")[1];
  if (!validApiKeys.includes(token)) {
    return res.status(401).json({ message: "Invalid Bearer: Unauthorized Access" });
  }
  
  if (!validRoutes[token] || !validRoutes[token].includes(req?.path?.split?.("/")?.[1])) {
    return res.status(403).json({ message: "Invalid Route Accessed: Unauthorized Access" });
  }

  next();
};

const router = Router();
router.use(bearerAuth);

export default router;