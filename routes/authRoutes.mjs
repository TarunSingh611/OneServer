import express from "express";
import {
    loginController,
    signUpController, 
    verificationController,
    logoutController,
    verificationCodeController
} from "../controllers/authController/authController.mjs";
const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.post("/verificationCode", verificationCodeController)
router.post("/verification", verificationController)

export default router;
