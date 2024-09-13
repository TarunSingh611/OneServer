// controllers/solutionController.js
import Solution from "../../models/solutionModel.mjs";

// Get all solutions for a specific problem
export const getAllSolutionsByProblemIdController = async (req, res) => {
  try {
    const { problemId } = req.params;
    const solutions = await Solution.find({ problem: problemId });
    res.status(200).json(solutions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", message: error.message });
  }
};

// Create a new solution for a specific problem
export const createSolutionController = async (req, res) => {
  try {
    const { problemId } = req.params;
    const { description, code, link, optimality } = req.body;
    const newSolution = new Solution({
      problem: problemId,
      description,
      code,
      link,
      optimality,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await newSolution.save();
    res.status(201).json(newSolution);
  } catch (error) {
    res.status(500).json({ message: "Server Error", message: error.message });
  }
};

// Get a specific solution by ID
export const getSolutionByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const solution = await Solution.findById(id).populate('problem');
    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }
    res.status(200).json(solution);
  } catch (error) {
    res.status(500).json({ message: "Server Error", message: error.message });
  }
};

// Update a specific solution by ID
export const updateSolutionController = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, code, link, upvotes, downvotes, optimality } = req.body;
    const updatedSolution = await Solution.findByIdAndUpdate(
      id,
      { description, code, link, upvotes, downvotes, optimality, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedSolution) {
      return res.status(404).json({ message: "Solution not found" });
    }
    res.status(200).json(updatedSolution);
  } catch (error) {
    res.status(500).json({ message: "Server Error", message: error.message });
  }
};

// Delete a specific solution by ID
export const deleteSolutionController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSolution = await Solution.findByIdAndDelete(id);
    if (!deletedSolution) {
      return res.status(404).json({ message: "Solution not found" });
    }
    res.status(200).json({ message: "Solution deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", message: error.message });
  }
};

// Upvote a solution
export const upvoteSolutionController = async (req, res) => {
  try {
    const { id } = req.params;
    const solution = await Solution.findByIdAndUpdate(id, { $inc: { upvotes: 1 } }, { new: true });
    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }
    res.status(200).json(solution);
  } catch (error) {
    res.status(500).json({ message: "Server Error", message: error.message });
  }
};

// Downvote a solution
export const downvoteSolutionController = async (req, res) => {
  try {
    const { id } = req.params;
    const solution = await Solution.findByIdAndUpdate(id, { $inc: { downvotes: 1 } }, { new: true });
    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }
    res.status(200).json(solution);
  } catch (error) {
    res.status(500).json({ message: "Server Error", message: error.message });
  }
};

// Add a discussion comment to a solution
export const addDiscussionController = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, comment } = req.body;
    const solution = await Solution.findByIdAndUpdate(
      id,
      { $push: { discussion: { user, comment, createdAt: new Date() } } },
      { new: true }
    );
    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }
    res.status(200).json(solution);
  } catch (error) {
    res.status(500).json({ message: "Server Error", message: error.message });
  }
};
