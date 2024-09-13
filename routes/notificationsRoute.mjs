import express from "express";
import notificationController from "../controllers/notificationsController/index.mjs";
const router = express.Router();


router.post("/delete-notification-by-id", notificationController.deleteNotificationById);
router.post("/delete-all-notifications", notificationController.deleteAllNotifications);
router.post("/mark-notification-as-read/:notificationId", notificationController.markNotificationAsRead);
router.get("/get-unread-notifications/:pno", notificationController.getUnreadNotifications);
router.get("/get-all-notifications/:pno", notificationController.getAllNotifications);


export default router;
