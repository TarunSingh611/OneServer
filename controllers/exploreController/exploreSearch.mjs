import getExploreSearch from "../../services/exploreService/exploreSearch.mjs";


async function exploreSearch(req,res) {

    const userId = req?.userId;
    if (!userId) {
      throw new Error('User not found');
    }
    const type = req.query.t;
    const data = req.query.q;
    const result = await getExploreSearch(data,type,userId);
    res.statusCode(result.statusCode).json(result);
}
export { exploreSearch}