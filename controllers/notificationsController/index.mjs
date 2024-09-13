import notificationService from "../../services/notificationService/notificationService.mjs";

  export const createNotification= async (req, res) => {
    const { type, content, toUserId, fromUserId } = req.body;
    const result = await notificationService.createNotification(type, content, toUserId, fromUserId);
    res.status(result.statusCode).json(result);
  }

  export const deleteNotification= async (req, res) => {
    const { type, receiverId } = req.body;
    const userId = req?.userId
    const result = await notificationService.deleteNotification(type, userId, receiverId);
    res.status(result.statusCode).json(result);
  }

  export const deleteNotificationById= async (req, res) => {
    const { notificationId } = req.body;
    const result = await notificationService.deleteNotificationById(notificationId);
    res.status(result.statusCode).json(result);
  }

  export const deleteAllNotifications= async (req, res) => {
    const userId = req?.userId
    const result = await notificationService.deleteAllNotifications(userId);
    res.status(result.statusCode).json(result);
  }

  export const markNotificationAsRead= async (req, res) => {
    const { notificationId } = req.param;
    const result = await notificationService.markNotificationAsRead(notificationId);
    res.status(result.statusCode).json(result);
  }

  export const getUnreadNotifications= async (req, res) => {
    const { pno } = req.param;
    const userId = req?.userId
    const result = await notificationService.getUnreadNotifications(userId, pno);
    res.status(result.statusCode).json(result);
  }

  export const getAllNotifications= async (req, res) => {
    const { pno } = req.param;
    const userId = req?.userId
    const result = await notificationService.getAllNotifications(userId, pno);
    res.status(result.statusCode).json(result);
  }

