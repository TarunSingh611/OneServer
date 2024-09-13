import getExploreService from "../../services/exploreService/getExplore.mjs";

async function exploreGet(req,res) {
const userId = req?.userId;
    if (!self) {
      throw new Error('User not found');
    }
    const result = await getExploreService(userId);
    res.statusCode(result.statusCode).json(result);
}
export { exploreGet}