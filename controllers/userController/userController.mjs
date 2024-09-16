
import { getUserProfile, getUserName } from "../../services/userService/userGetUsername.mjs";
import {getUserSocialProfile} from "../../services/userService/getUserSocial.mjs"
export const userProfileController = async (req, res) => {
    const userId = req?.userId
    try {
        if (!userId) {
            return res
                .status(200)
                .json({ message: "Forbidden: Invalid userId", statusCode: 403 });
        }

        const user = await getUserSocialProfile(userId);
        res.status(200).json({ statusCode: 200, user });


    } catch (error) {
        res.status(500).json({ message: "Server Error", message: error.message, });
    }
}


export const userGetProfileById = async (req, res) => {

    const userId = req.params.userId
    if (!userId) { return res.status(403).json({ message: 'Forbidden: Invalid username' }); }
    const result = await getUserProfile(userId);
    res.json(result);

};

export const userGetUserName = async (req, res) => {
    const userId = req.query.userId
    if (!userId) {
        return res.status(403).json({ message: "Forbidden: Invalid username" });
    }
    const result = await getUserName(userId);
    res.json(result);
}