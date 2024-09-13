import express from "express";
import { userProfileController,userGetProfileById,userGetUserName } from "../controllers/userController/userController.mjs";
import { userUpdateController } from "../controllers/userController/userUpdateController.mjs";
import { userUpdateSecurity } from "../controllers/userController/userUpdateSecurity.mjs";
import { userSetPicture } from "../controllers/userController/userSetPicture.mjs";

import multer from "multer";
const router = express.Router();
const upload = multer({dest:'public/'})

router.get("/profile", userProfileController);
router.get("/getProfile/:userId", userGetProfileById);
router.put("/update", userUpdateController);
router.put("/updateSecurity", userUpdateSecurity);
router.put("/setPicture", upload.single('file'), userSetPicture);

export default router;


