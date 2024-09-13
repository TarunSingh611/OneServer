import NotificationModel from "../../models/notificationModel.mjs";

const notificationService = {
  createNotification: async (type, content ,toUserId,fromUserId=null) => {
    try {
      const notification = new NotificationModel({
        type,
        contentDetails: { content },
        to: toUserId,
        from: fromUserId
      });

      await notification.save();

      return { statusCode : 200 };
    } catch (error) {
      return { statusCode : 500, message: "Error creating notification" };
    }
  },

  deleteNotification: async (type, to, from) => {
    try {
      console.log("Deleting notifications:", type, to, from);
  
      const notifications = await NotificationModel.deleteMany({ type, to, from });
      
      console.log("Delete result:", notifications);
  
      if (notifications.deletedCount > 0) {
        console.log("Notifications deleted successfully.");
        return { statusCode : 200 };
      } else {
        console.log("No matching notifications found for deletion.");
        return { statusCode : 500, message: "No matching notifications found." };
      }
    } catch (error) {
      return { statusCode : 500, message: "Error deleting notifications" };
    }
  },
  
  deleteNotificationById: async (notificationId) => {
    try {
      const notification = await NotificationModel.findByIdAndDelete(
        notificationId
      );
      if (!notification) {      
        // throw new Error("Notification not found");
        return { statusCode : 500, message: "Notification not found" };
      }
      return { statusCode : 200 };
  }
  catch (error) {
    return { statusCode : 500, message: "Error deleting notification" };
  }
  },

  deleteAllNotifications: async (userId) => {
    try {
      const notifications = await NotificationModel.deleteMany({ to: userId, type: { $ne: 'FOLLOW_REQ' } });
      return { statusCode : 200 };
    } catch (error) {
      return { statusCode : 500, message: "Error deleting notifications" };
    }
  },

  deleteAllFollowRequests: async (userId) => {
    try {
      const notifications = await NotificationModel.deleteMany({ to: userId, type: 'FOLLOW_REQ' });
      return { statusCode : 200 };
    } catch (error) {
      return { statusCode : 500, message: "Error deleting notifications" };
    }
  },
  
  
  markNotificationAsRead: async (notificationId) => {
    try {
      const notification = await NotificationModel.findById(notificationId);

      if (!notification) {
        // throw new Error("Notification not found");
        return { statusCode : 500, message: "Notification not found" };
      }

      notification.read = true;
      await notification.save();

      return { statusCode : 200 };
    } catch (error) {
      return { statusCode : 500, message: "Error marking notification as read" };
    }
  },

  getFollowRequests: async (userId, pno) => {
    try {
      const followRequests = await NotificationModel.find({
        to: userId,
        type: 'FOLLOW_REQ',
      })
        .sort({ createdAt: -1 }) 
        .skip(pno)
        .limit(10)
        .populate('from', 'fullName username profilePicture accountType following followers friends pendingFollowers');
  
      return { statusCode : 200 , followRequests };
    } catch (error) {
      return { statusCode : 500, message: "Error getting follow requests" };
    }
  },

  getUnreadNotifications: async (userId, pno) => {
    try {
      const Notifications = await NotificationModel.find({
        to: userId,
        read: false,
        type: { $ne: 'FOLLOW_REQ' },
      })
        .sort({ createdAt: -1 })
        .skip(pno)
        .limit(10);

        
        const followReq =await notificationService.getFollowRequests(userId, pno);
        const data={
          followReq,
          alerts:Notifications 
        }
  
      return { statusCode : 200 , data };
    } catch (error) {
      return { statusCode : 500, message: "Error getting unread notifications" };
    }
  },
  
  getAllNotifications: async (userId, pno) => {
    try {

      const Notifications = await NotificationModel.find({
        to: userId,type: { $ne: 'FOLLOW_REQ' }
      })
        .sort({ createdAt: -1 }) 
        .skip(pno)
        .limit(10);

        const followReq =await notificationService.getFollowRequests(userId, pno);
        const data={
          followRequests : followReq.followRequests,
          alerts:Notifications
        }
      return { statusCode : 200 , data };
    } catch (error) {
      return { statusCode : 500, message: "Error getting all notifications" };
    }
  },
  
};

export default notificationService;
