import followService from "../../services/folowRequests/followRequests.mjs";
import { getUserById } from "../../Repositories"


 export const sendFollowRequest = async (req, res) => {
    const { receiverId } = req.query;
    const userId = req?.userId;
    const result = await followService.sendFollowRequest(userId, receiverId);
    res.status(result.statusCode).json(result);
  }

  export const acceptFollowRequest = async (req, res) => {
    const {followerId } = req.query;
    const userId = req?.userId;
    const result = await followService.acceptFollowRequest(userId, followerId);
    res.status(result.statusCode).json(result);
  }

  export const rejectFollowRequest = async (req, res) => {
    const {followerId } = req.query;
    const userId = req?.userId;
    const result = await followService.rejectFollowRequest(userId, followerId);
    res.status(result.statusCode).json(result);
  }

  export const retractFollowRequest = async (req, res) => {
    const { receiverId } = req.query;
    const userId = req?.userId;
    const result = await followService.retractFollowRequest(userId, receiverId);
    res.status(result.statusCode).json(result);
  }

 export const unfollowUser = async (req, res) => {
    const { targetUserId } = req.query;
    const userId = req?.userId;
    const result = await followService.unfollowUser(userId, targetUserId);
    res.status(result.statusCode).json(result);
  }


