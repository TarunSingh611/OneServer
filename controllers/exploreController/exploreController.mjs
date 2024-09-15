import getExploreService from "../../services/exploreService/getExplore.mjs";
import getExploreSearch from "../../services/exploreService/exploreSearch.mjs";


export const exploreController = async (req, res) => {
  const userId = req?.userId;
  const result = await getExploreService(userId);
  res.status(result.statusCode).json(result);
}

export const postExploreController = (req, res) => {
  const message = "This is Post Explore Page";
  res.status(200).json({
    message,
  });
}

export const getExploreController = async(req, res) => {
  const type = req.query.t;
  const data = req.query.q;
  const result = await getExploreSearch(data,type);
  res.status(result.statusCode).json(result);
}

export const patchExploreController = (req, res) => {
  const message = "This is Patch Explore Page";
  res.status(200).json({
    message,
  });
}

export const putExploreController = (req, res) => {
  const message = "This is Put Explore Page";
  res.status(200).json({
    message,
  })

}

export const deleteExploreController = (req, res) => {
  const message = "This is Delete Explore Page";
}



