import updateUser from "../../services/userService/userUpdate.mjs";
export const userUpdateController = async (req, res) => {
    const userId = req?.userId 
    const data = req.body;
    try {
        if (!userId) {
            return res
                .status(200)
                .json({ message: "Forbidden: Invalid userId", statusCode : 403 });
        }

        const result = await updateUser(userId, data);
        res.status(200).json({statusCode : 200, result });
 

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            message: error.message,
        });
    }
}