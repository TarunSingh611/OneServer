import PortfolioModel from "../../models/portfolioModel.mjs";

export const portfolioController = async(req, res) => {
  const message = "This is portfolio Page";
  const userId = req?.userId
  if(!userId){ return res.status(200).json({message : "Forbidden: Invalid userId", statusCode : 403}); }
  const portfolioData = await PortfolioModel.findOne({ userId });
  res.status(200).json({ message, portfolioData: portfolioData });
};

export const postPortfolioController = async(req, res) => {
  let data ;
  const userId = req?.userId
  if(!userId){ return res.status(200).json({message : "Forbidden: Invalid userId", statusCode : 403}); }
  const result = await PortfolioModel.insert({ userId, ...req.body });
  if(result===true){ data = {message : "Portfolio created successfully" , statusCode: 200}; }
  else{ data = {message : "Portfolio not created" , statusCode: 400}; }
  res.status(200).json(data);

};

export const getPortfolioController = async(req, res) => {
  const message = "This is get portfolio Page";
  const userId = req?.userId;
  if(!userId){ return res.status(200).json({message : "Forbidden: Invalid userId", statusCode : 403}); }
  const portfolioData = await PortfolioModel.findOne({ userId });
  res.status(200).json({ message, portfolioData: portfolioData });
};

export const putPortfolioController = async(req, res) => {
  const message = "This is put portfolio Page";
  const userId = req?.userId
  if(!userId){ return res.status(200).json({message : "Forbidden: Invalid userId", statusCode : 403}); }
  const result = await PortfolioModel.update({ userId, ...req.body });
  if(result===true){ message = "Portfolio updated successfully"; }
  else{ message = "Portfolio not updated"; }
  res.status(200).json({ message });
};

export const deletePortfolioController = async(req, res) => {
  const message = "This is delete portfolio Page";
  const userId = req?.userId
  if(!userId){ return res.status(200).json({message : "Forbidden: Invalid userId", statusCode : 403}); }
  const result = await PortfolioModel.delete({ userId });
  if(result===true){ message = "Portfolio deleted successfully"; }
  else{ message = "Portfolio not deleted"; }
  res.status(200).json({ message });
};

