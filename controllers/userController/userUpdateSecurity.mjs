import {updateUserSecurity} from "../../services/userService/userUpdate.mjs";
const userUpdateSecurity = async (req, res) => {

    const userId = req?.userId;

    if (!userId) {
        return res.status(403).json({ message: 'Forbidden: Invalid username' });
    }
    const result = await updateUserSecurity(userId, req.body);

    res.json(result);
};

export  {userUpdateSecurity}